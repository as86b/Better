/*
    View - RegisterView
    
    A page that renders a form for users to register a new account 
*/

import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { endpoint } from '../App';

class RegisterView extends Component {
    constructor(props) {
        super(props);
        // TODO add support for profile pictures (and bio?)
        this.state = {
            emailVal: '',
            usernameVal: '',
            passwordVal: '',
            confirmPasswordVal: '',
            file: null, 
            errorText: ''
        };
        
        this.handleRegisterClick = this.handleRegisterClick.bind(this);
        this.handleEmailValChange = this.handleEmailValChange.bind(this);
        this.handleUsernameValChange = this.handleUsernameValChange.bind(this);
        this.handlePasswordValChange = this.handlePasswordValChange.bind(this);
        this.handleConfirmPasswordValChange = this.handleConfirmPasswordValChange.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
    }

    validateRegisterAttempt(registerAttempt) {
        // flag denotes an error in validation if:
        //  email is of an invalid format
        //  username is less than 6 characters 
        //  password / confirm password is less than 6 characters
        //  password =/= confirm password
        // NOTE: should password constraint be 6 +/- ? 
        var flag = 0;
        var atIndex = registerAttempt.email.indexOf("@");
        if (atIndex > 1) {
            var dotIndex = registerAttempt.email.indexOf(".");
            if ((dotIndex < atIndex+2) || (dotIndex+1 === registerAttempt.email.length)) { flag = 1; }
        }
        else { flag = 1; }
        if (flag) {
            this.setState({ errorText: 'Please provide a valid email address' });
            return false; 
        }
        if (registerAttempt.username.length < 6) {
            this.setState({ errorText: 'Please provide a valid username (minimum 6 characters)' });
            return false; 
        }
        if (registerAttempt.password.length < 6) {
            this.setState({ errorText: 'Please provide a valid password (minimum 6 characters)' });
            return false; 
        }
        if (registerAttempt.password !== registerAttempt.confirmPassword) {
            this.setState({ errorText: 'Passwords do not match' });
            return false; 
        }
        // reset any lingering errors
        this.setState({ errorText: '' });
        return true; 
    } 

    handleRegisterClick(e) {
        e.preventDefault();
        let registerAttempt = {
            email: this.state.emailVal,
            username: this.state.usernameVal,
            password: this.state.passwordVal,
            confirmPassword: this.state.confirmPasswordVal
        }
        console.log('file: ' + this.state.file.name);
        // FIXME testing file upload 
        // validate the registration information
        if (this.validateRegisterAttempt(registerAttempt) && this.state.errorText === '') {
            // registerAttempt has been validated
            // send the registration attempt somewhere
            axios.post(`${endpoint}/api/register/`, registerAttempt)
            .then((res) => {
                if (res.data.status === "success") {
                    /*
                        user registered successfully
                        now try to upload the profile picture, if there is one 
                    */
                    if (this.state.file) {
                        let fd = new FormData();
                        fd.append('file', this.state.file, this.state.file.name);
                        axios.post(`${endpoint}/api/upload/`, fd)
                        .then((res) => {
                            if (res.data.status === "error") {
                                console.log(res.data.details);
                            }
                            else {
                                console.log(res.data);
                                // add the profile picture to the user's account 
                                let userData = {
                                    "username": registerAttempt.username, 
                                    "filename": res.data.file.filename
                                }
                                console.log('userdata');
                                console.log(userData);
                                axios.post(`${endpoint}/api/users/changeProfilePicture`, userData)
                                .then((res) => {
                                    if (res.data.status === "success") {
                                        console.log(res.data.user);
                                    }
                                    else {
                                        console.log(res.data.details); 
                                    }
                                });
                            }
                        },
                        (err) => {
                            console.log(err);
                        });
                    }
                }
                else {
                    this.setState({ errorText: res.data.details });
                }
            })
            .catch((err) => {
                console.log(err);
            });
        }
        // reset registration form
        this.setState({ emailVal: '', usernameVal: '', passwordVal: '', confirmPasswordVal: '' });
    }

    // update the state of the email based on what is being typed
    handleEmailValChange(e) {
        this.setState({ emailVal: e.target.value });
    }

    // update the state of the username based on what is being typed
    handleUsernameValChange(e) {
        this.setState({ usernameVal: e.target.value });
    }
    
    // update the state of the password based on what is being typed
    handlePasswordValChange(e) {
        this.setState({ passwordVal: e.target.value });
    }

    // update the state of the confirm password based on what is being typed
    handleConfirmPasswordValChange(e) {
        this.setState({ confirmPasswordVal: e.target.value });
    }

    // update the file that is being uploaded
    handleFileUpload() {
        this.setState({ file: document.getElementById('file-input').files[0] });
    }

    render() {
        // display an error if one is set  
        let errorMessage;
        if (this.state.errorText === '') {
            errorMessage = (
                <span></span>
            );
        }
        else {
            errorMessage = (
                <div className="row">
                    <div className="col s12 m6 push-m3 z-depth-1 white-text red">
                        <p>{this.state.errorText}</p>
                    </div>
                </div>
            );
        }        
        return(
            <div className="container">
                <div className="row">
                    <h2>Register</h2>
                    <p>Create a new account today to begin helping others!</p>
                    <Link to="/login">Login to an existing account</Link>
                </div>
                { errorMessage }
                <form onSubmit={this.handleRegisterClick}>
                    <div className="row">
                        <div className="col s12 m6 push-m3">
                            <input type="email" id="email" value={this.state.emailVal} onChange={this.handleEmailValChange} className="validate"></input>
                            <label htmlFor="email" className="active">Email Address</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 m6 push-m3">
                            <input type="text" id="username" value={this.state.usernameVal} onChange={this.handleUsernameValChange} className="validate"></input>
                            <label htmlFor="username" className="active">Username</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 m6 push-m3">
                            <input type="password" value={this.state.passwordVal} onChange={this.handlePasswordValChange} className="validate"></input>
                            <label htmlFor="password" className="active">Password</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 m6 push-m3">
                            <input type="password" value={this.state.confirmPasswordVal} onChange={this.handleConfirmPasswordValChange} className="validate"></input>
                            <label htmlFor="password" className="active">Confirm Password</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 m6 push-m3 file-field">
                            <label className="file-field-label" htmlFor="file-input">Optionally specify a profile picture for your account</label>
                            <div className="btn-floating waves-effect white-text z-depth-2">
                                <i className="small material-icons">insert_photo</i>
                                <input type="file" id="file-input" onChange={this.handleFileUpload} />
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" value={this.state.file ? this.state.file.name : 'Optional profile picture...'} readOnly />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 m2 push-m7">
                            <button onClick={this.handleRegisterClick} className="btn form-btn waves-effect">Register</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default RegisterView;