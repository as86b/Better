/*
    View - ProfileView
    
    Page to view a user's profile with their posts
*/

import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';

import Post from '../components/Post';
const profilePicture = require('../assets/img/blank-profile-picture.png');

class ProfileView extends Component {
    render() {
        return(
            <div className="row">
                <div className="col s12 m8 push-m2">
                    <div className="center" id="profile-picture">
                        <img className="responsive-img circle z-depth-2" src={profilePicture} alt="Profile" />
                    </div>

                    <div className="card center profileBioCard"> 
                        <div className="cardTop">
                            <a className="bio-button btn-floating waves-effect waves-light right"><i className="material-icons">group</i></a>
                            <a className="bio-button btn-floating waves-effect waves-light right"><i className="material-icons">edit</i></a>
                            
                                <p class="card-title center" id="profileUsername">UserName</p>
                            
                        </div>

                        <div class="card-content" id="bioContent">
                            <p>This is the user's profile bio. You can write anything you want about yourself in this box. Edit this box by using the buttons above.</p>
                        </div>
                    </div>
                    
                    <Post></Post>
                </div>
            </div>
        );
    }
}

export default ProfileView;