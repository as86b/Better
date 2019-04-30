/*
    View - DashboardView
    
    The main page that will contain user posts and allow for new post creation 
*/

import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import axios from 'axios'; 
import { Link } from 'react-router-dom';
import { endpoint, loadUser } from '../App'; 

import Post from '../components/Post';

class DashboardView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            scope: 'global',
            feed: [],
            username: loadUser(),
            user_id: null
        };

        this.retrieveFeed(this.state.scope, this.state.page);

        this.retrieveFeed = this.retrieveFeed.bind(this);
        this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this);
    }

    handleLoadMoreClick() {
        var page = this.state.page + 1;
        this.setState({ page: page });
        this.retrieveFeed(this.state.scope, page);
    }

    retrieveFeed(scope, page) {
        console.log('query: ' + page);
        axios.get(`${endpoint}/api/feed/${scope}-${page}`)
        .then((res) => {
            console.log(res);
            if (res.data.status === "success") {
                let feed = this.state.feed;
                Array.prototype.push.apply(feed, res.data.feed.docs);
                this.setState({ feed: feed }); 
            }
        });
    }

    render() {
        if (this.state.username && !this.state.user_id) {
            axios.get(`${endpoint}/api/users/getID/${this.state.username}`)
            .then((res) => {
                if (res.data.status === "success") {
                    this.setState({ user_id: res.data._id });
                }
            });
        }
        let posts = [];
        var supported = false; 
        if (this.state.feed.length > 0) {
             for (var i = 0; i < this.state.feed.length; i++) {
                supported = false; 
                // check if the user has liked this post 
                if (this.state.user_id) {
                    console.log(this.state.user_id);
                    for (var j = 0; j < this.state.feed[i].supports.length; j++) {
                        console.log(this.state.feed[i].supports[j]);
                        if (this.state.feed[i].supports[j] === this.state.user_id) {
                            supported = true; 
                            break;
                        }
                    }
                }
                else {
                    console.log('no id');
                }
                posts.push(
                    <Post key={(i+1)*this.state.page} post={this.state.feed[i]} supported={supported}></Post>
                );
             }
        }
        else {
            posts = null;
        }
        return(
            <div className="row">
                <div className="col s12 m8 push-m2">
                    { posts }
                    <div className="center">
                        <button className="btn" onClick={this.handleLoadMoreClick}>More posts</button>
                    </div>
                </div>
                <div className="fixed-action-btn">
                    <Link to="/createpost" className="btn-floating btn-large create-post-btn">
                        <i className="large material-icons">mode_edit</i>
                    </Link>
                </div>
            </div>
        );
    }
}

export default DashboardView;