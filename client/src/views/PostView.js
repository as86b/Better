/*
    View - PostView
    
    Shows the specified post and allows for replies
*/

import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import Post from '../components/Post';
import PopupEdit from '../components/PopupEdit';

import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { endpoint, loadUser } from '../App';


class PostView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: null,
            replies: [],
            queried: false,
            showPopup: false,
            username: loadUser(),
            user_id: null
        }

        this.retrievePost();
        this.togglePopup = this.togglePopup.bind(this);
    }

    // get the post from the passed post id, or redirect
    retrievePost() {
        axios.get(`${endpoint}/api/post/${this.props.match.params.postID}`)
        .then((res) => {
            if (res.data.status == "success") {
                this.setState({ post: res.data.post }); 
                this.setState({ replies: res.data.replies });
            }
            this.setState({ queried: true });
        });
    }

    togglePopup() {
        let toggle = this.state.showPopup;
        this.setState({ showPopup: !toggle });
    }

    render() {
        if (this.state.queried && !this.state.post) 
            return(<Redirect to="/404"></Redirect>);
        let post, replies = []; 
        if (this.state.queried) {
            if (this.state.username && !this.state.user_id) {
                axios.get(`${endpoint}/api/users/getID/${this.state.username}`)
                .then((res) => {
                    if (res.data.status === "success") {
                        this.setState({ user_id: res.data._id });
                    }
                });
            }
            var supported = false; 
            if (this.state.user_id) {
                for (var j = 0; j < this.state.post.supports.length; j++) {
                    if (this.state.post.supports[j] === this.state.user_id)
                        supported = true; 
                }
            }
            post = (<Post post={this.state.post} contained={true} supported={supported}></Post>);
            // TODO add pagination on replies to a post...
            console.log(this.state.replies);
            for (var i = 0; i < this.state.replies.length; i++) {
                supported = false; 
                if (this.state.user_id) {
                    for (var j = 0; j < this.state.replies[i].supports.length; j++) {
                        if (this.state.replies[i].supports[j] === this.state.user_id) {
                            supported = true; 
                            break;
                        }
                    }
                }
                replies.push(
                    <Post key={i} post={this.state.replies[i]} contained={true} supported={supported} reply={true}></Post>
                );
            }
            if (replies.length <= 0) {
                replies = null; 
            }
        }
        else 
            post = (<h2 className="center">Loading post...</h2>);
        return(
            <div>
                {this.state.showPopup ? 
                    <PopupEdit post_id={this.state.post._id} closePopup={this.togglePopup} /> : null
                }
                <div className="row">
                    { post }
                </div>
                <div className="row">
                    <div className="col s12 m8 push-m2">
                        { replies }
                    </div>
                </div>
                <div className="fixed-action-btn">
                    <a className="btn-floating btn-large create-post-btn" onClick={this.togglePopup}>
                        <i className="large material-icons">mode_edit</i>
                    </a>
                </div>
            </div>
            
        );
    }
}

export default PostView;