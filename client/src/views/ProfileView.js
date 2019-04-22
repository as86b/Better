/*
    View - ProfileView
    
    Page to view a user's profile with their posts
*/

import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import { Link, Redirect } from 'react-router-dom';

import Post from '../components/Post';
import ProfileBioPopup from '../components/ProfileBioPopup';
const profilePicture = require('../assets/img/blank-profile-picture.png');

class ProfileView extends Component {
        
    constructor() {
        super();
        this.state = {
            showPopup: false
        }   
    };

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    handleUpdateBio(e) {
        e.preventDefault();
        
    }


    render() {
        return(
            <div className="row">
                <div className="col s12 m8 push-m2">
                    <div className="center" id="profile-picture">
                        <img className="responsive-img circle z-depth-2 profile-picture" src={profilePicture} alt="Profile" />
                    </div>

                    <div className="card center profileBioCard"> 
                        <div className="cardTop">
                            <a href="#" className="bio-button btn-floating waves-effect waves-light right" ><i className="material-icons">group</i></a>
                            <a className="bio-button btn-floating waves-effect waves-light right" onClick={this.togglePopup.bind(this)}><i className="material-icons">edit</i></a>
                            {this.state.showPopup ? 
                                <ProfileBioPopup closePopup={this.togglePopup.bind(this)} /> : null
                            }
                            
                            <p class="card-title center" id="profileUsername">UserName</p>
                        </div>

                        <div class="card-content" id="bioContent">
                            <p>This is the user's profile bio. You can write anything you want about yourself in this box. Edit this box by using the buttons above.</p>
                        </div>
                    </div>
                    {/* TODO add posts */}
                </div>
                <div class="fixed-action-btn">
                    <Link to="/createpost">
                        <a class="btn-floating btn-large create-post-btn">
                            <i class="large material-icons">mode_edit</i>
                        </a>
                    </Link>
                    
                </div>
            </div>
        );
    }
}

export default ProfileView;

