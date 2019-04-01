/*
    View - ProfileView
    
    Page to view a user's profile with their posts
*/

import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';

import Post from '../components/Post';

class ProfileView extends Component {
    render() {
        return(
            <div className="row">
                <div className="col s12 m8 push-m2">
                    
                    <Post></Post>
                </div>
            </div>
        );
    }
}

export default ProfileView;