/*
    View - PostView
    
    Shows the specified post and allows for replies
*/

import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import Post from '../components/Post';

import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { endpoint } from '../App';


class PostView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: 'a',
            redirect: false
        }
        console.log('post: ' + props.match.params.postID);
        // retrievePost();
    }

    // get the post from the passed post id, or redirect
    retrievePost() {
        axios.get(`${endpoint}/api/post/${this.props.match.params.postID}`)
        .then((res) => {
            if (res.status == "success") {
                this.setState({ post: res.post }); 
            }
            else {
                this.setState({ redirect: true });
            }
        });
    }

    render() {
        if (this.state.redirect || !this.state.post) 
            return(<Redirect to="/dashboard"></Redirect>);
        return(
            <div className="row">
                {/*  <Post post={this.state.post}></Post> */}
                <p>Hello</p>
            </div>
        );
    }
}

export default PostView;