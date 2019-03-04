/*
    View - RegisterView
    
    A page that renders a form for users to register a new account 
*/

import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import { Link } from 'react-router-dom';

class RegisterView extends Component {
    constructor(props) {
        super(props);
        // TODO add support for profile pictures (and bio?)
        this.state = {
            emailVal: '',
            usernameVal: '',
            passwordVal: '',
            confirmPasswordVal: '',
            errorText: ''
        };
        
        this.handleRegisterClick = this.handleRegisterClick.bind(this);
        this.handleEmailValChange = this.handleEmailValChange.bind(this);
        this.handleUsernameValChange = this.handleUsernameValChange.bind(this);
        this.handlePasswordValChange = this.handlePasswordValChange.bind(this);
        this.handleConfirmPasswordValChange = this.handleConfirmPasswordValChange.bind(this);
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
            if (dotIndex < atIndex+2) { flag = 1; }
        }
        else { flag = 1; }
        if (flag) {
            // invalid email format has been sent
            this.setState({ errorText: 'Please provide a valid email address' });
            return; 
        }
        if (registerAttempt.password !== registerAttempt.confirmPassword) {
            this.setState({ errorText: 'Passwords do not match' });
            return; 
        }
        if (registerAttempt.username.length < 6) {
            this.setState({ errorText: 'Please provide a valid username (minimum 6 characters)' });
            return; 
        }
        if (registerAttempt.password.length < 6) {
            this.setState({ errorText: 'Please provide a valid password (minimum 6 characters)' });
            return; 
        }
        // reset any lingering errors
        this.setState({ errorText: '' });
        return; 
    } 

    handleRegisterClick(e) {
        e.preventDefault();
        let registerAttempt = {
            email: this.state.emailVal,
            username: this.state.usernameVal,
            password: this.state.passwordVal,
            confirmPassword: this.state.confirmPasswordVal
        }
        // validate the registration information
        this.validateRegisterAttempt(registerAttempt);
        if (this.state.errorText === '') {
            // registerAttempt has been validated
            // send the registration attempt somewhere
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