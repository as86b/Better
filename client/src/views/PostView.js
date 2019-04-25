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
import { endpoint } from '../App';


class PostView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: null,
            replies: [],
            queried: false,
            showPopup: false
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
            post = (<Post post={this.state.post} contained={true}></Post>);
            // TODO add pagination on replies to a post...
            for (var i = 0; i < this.state.replies.length; i++) {
                replies.push(
                    <Post key={i} post={this.state.replies[i]} contained={true}></Post>
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