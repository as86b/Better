/*
    View - ProfileView
    
    Page to view a user's profile with their posts
*/

import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import axios from 'axios';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { endpoint, loadToken, loadUser } from '../App';

import Post from '../components/Post';
import PopupEdit from '../components/PopupEdit';
import FilterBar from '../components/FilterBar';

class ProfileView extends Component {
        
    constructor(props) {
        super(props);
        this.state = {
            owner: false,
            showPopup: false,
            redirect: false,
            user: null,
            page: 1,
            posts: [],
            username: loadUser(),
            user_id: null
        }   

        this.retrieveProfile();
        this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this);
        this.retrievePosts = this.retrievePosts.bind(this);
        this.handleScopeChange = this.handleScopeChange.bind(this);
    };

    retrieveProfile() {
        axios.get(`${endpoint}/api/users/getProfile/${this.props.match.params.username}`)
        .then((res) => {
            if (res.data.status == "error") {
                this.setState({ redirect: true });
            }
            else {
                this.setState({ user: res.data });
                // check if the logged in user is this profile 
                let query = { token: loadToken(), username: this.state.user.username };
                axios.post(`${endpoint}/api/users/checkProfile`, query)
                .then((res) => {
                    if (res.data.status === "success") {
                        this.setState({ owner: true });
                    }
                    this.retrievePosts(this.state.page);
                });
            }
        });
    }

    retrievePosts(page) {
        // get posts for the user's profile (only public ones)
        // TODO get anonymous posts for user's viewing their own profile  
        axios.get(`${endpoint}/api/users/getProfilePosts/${this.state.user.username}-${page}`)
        .then((res) => {
            if (res.data.status === "success" && res.data.posts.docs.length > 0) {
                let posts = this.state.posts;
                Array.prototype.push.apply(posts, res.data.posts.docs);
                this.setState({ posts: posts });
            }
        });
    }

    handleLoadMoreClick() {
        var page = this.state.page + 1;
        this.setState({ page: page });
        this.retrievePosts(page);
    }

    handleScopeChange() {
        // handle scope change
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    render() {
        if ( this.state.user && this.state.user.username !== this.props.match.params.username) {
            this.retrieveProfile();
        }
        if (this.state.redirect) 
            return(<Redirect to="/404"></Redirect>);
        let posts = [];
        if (this.state.posts.length > 0) {
            if (this.state.username && !this.state.user_id) {
                axios.get(`${endpoint}/api/users/getID/${this.state.username}`)
                .then((res) => {
                    if (res.data.status === "success") {
                        this.setState({ user_id: res.data._id });
                    }
                });
            }
            var supported = false; 
            for (var i = 0; i < this.state.posts.length; i++) {
                supported = false; 
                if (this.state.user_id) {
                    for (var j = 0; j < this.state.posts[i].supports.length; j++) {
                        if (this.state.posts[i].supports[j] === this.state.user_id) {
                            supported = true; 
                            break;
                        }
                    }
                }
                posts.push(
                    <Post key={(i+1)*this.state.page} post={this.state.posts[i]} supported={supported}></Post>
                );
            }
        }
        else {
            posts = null; 
        }
        return(
            <div className="row">
                <div className="col s12 m8 push-m2">
                    <div className="center" id="profile-picture">
                        <img className="circle z-depth-2 profile-picture-big" src={this.state.user ? `${endpoint}/api/users/getProfilePicture/${this.state.user.username}` : ''} alt="Profile" />
                    </div>

                    <div className="card center profileBioCard"> 
                        <div className="cardTop">
                            {/* TODO change icons based on if you're viewing your account or another */}
                            <a href="#" className="bio-button btn-floating waves-effect waves-light right" title="Followers"><i className="material-icons">group</i></a>
                            {this.state.owner ? 
                                <a className="bio-button btn-floating waves-effect waves-light right" onClick={this.togglePopup.bind(this)} title="Edit Bio"><i className="material-icons">edit</i></a>
                                : null
                            }
                            {this.state.showPopup ? 
                                <PopupEdit closePopup={this.togglePopup.bind(this)} /> : null
                            }
                            
                            <p className="card-title" id="profileUsername">{this.state.user ? this.state.user.username : 'Username'}</p>
                        </div>

                        <div className="card-content" id="bioContent">
                            <p>{this.state.user ? this.state.user.bio : 'User bio'}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className={this.state.owner ? "col s12 push-m1" : "col s12 push-m2"}>
                            <FilterBar handleScopeChange={this.handleScopeChange} personal={this.state.owner}></FilterBar>
                        </div>
                    </div>
                    { posts }
                    <div className="center">
                        <button className="btn" onClick={this.handleLoadMoreClick}>More posts</button>
                    </div>
                </div>
                <div className="fixed-action-btn">
                    <Link to="/createpost" className="btn-floating btn-large create-post-btn" title="Create Post"> 
                        <i className="large material-icons">mode_edit</i>
                    </Link>
                </div>
            </div>
        );
    }
}

export default withRouter(ProfileView);

