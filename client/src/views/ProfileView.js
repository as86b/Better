/*
    View - ProfileView
    
    Page to view a user's profile with their posts
*/

import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { endpoint } from '../App';

import Post from '../components/Post';
import PopupEdit from '../components/PopupEdit';
import axios from 'axios';
const profilePicture = require('../assets/img/blank-profile-picture.png');

class ProfileView extends Component {
        
    constructor(props) {
        super(props);
        this.state = {
            showPopup: false,
            redirect: false,
            user: null
        }   

        this.retrieveProfile();
    };

    retrieveProfile() {
        axios.get(`${endpoint}/api/users/getProfile/${this.props.match.params.username}`)
        .then((res) => {
            console.log(res);
            if (res.data.status == "error") {
                this.setState({ redirect: true });
            }
            else {
                this.setState({ user: res.data });
            }
        });
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    render() {
        if (this.state.redirect) 
            return(<Redirect to="/404"></Redirect>);
        return(
            <div className="row">
                <div className="col s12 m8 push-m2">
                    <div className="center" id="profile-picture">
                        <img className="responsive-img circle z-depth-2 profile-picture" src={this.state.user ? `${endpoint}/api/users/getProfilePicture/${this.state.user.username}` : ''} alt="Profile" />
                    </div>

                    <div className="card center profileBioCard"> 
                        <div className="cardTop">
                            {/* TODO change icons based on if you're viewing your account or another */}
                            <a href="#" className="bio-button btn-floating waves-effect waves-light right" ><i className="material-icons">group</i></a>
                            <a className="bio-button btn-floating waves-effect waves-light right" onClick={this.togglePopup.bind(this)}><i className="material-icons">edit</i></a>
                            {this.state.showPopup ? 
                                <PopupEdit closePopup={this.togglePopup.bind(this)} /> : null
                            }
                            
                            <p className="card-title" id="profileUsername">{this.state.user ? this.state.user.username : 'Username'}</p>
                        </div>

                        <div className="card-content" id="bioContent">
                            <p>{this.state.user ? this.state.user.bio : 'User bio'}</p>
                        </div>
                    </div>
                    {/* TODO add posts */}
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

export default withRouter(ProfileView);

