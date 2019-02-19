/*
    View - RegisterView
    
    A page that renders a form for users to login to created accounts
*/

import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import { Link } from 'react-router-dom';

class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailVal: '',
            passwordVal: '',
            errorText: ''
        };

        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleEmailValChange = this.handleEmailValChange.bind(this);
        this.handlePasswordValChange = this.handlePasswordValChange.bind(this);
    }

    // validate that the provided information is valid to attempt a login
    validateLoginAttempt(loginAttempt) {
        // flag denotes an error in validation if:
        //  email is of an invalid format
        //  password is less than 6 characters 
        // NOTE: should password constraint be 6 +/- ? 
        var flag = 0;
        var atIndex = loginAttempt.email.indexOf("@");
        if (atIndex > 1) {
            var dotIndex = loginAttempt.email.indexOf(".");
            if (dotIndex < atIndex+2) { flag = 1; }
        }
        else { flag = 1; }
        if (flag) {
            // invalid email format has been sent
            this.setState({ errorText: 'Please provide a valid email address' });
        }
        else if (loginAttempt.password.length >= 6) {
            // valid login attempt, remove any lingering errors
            this.setState({ errorText: '' });
        } 
        else {
            // invalid password format has been sent 
            this.setState({ errorText: 'Please provide a valid password (minimum 6 characters)' });
        }
        return; 
    }

    // send login attempt (if valid) to be authenticated
    handleLoginClick(e) {
        e.preventDefault();
        let loginAttempt = { email: this.state.emailVal, password: this.state.passwordVal };
        // validate the login attempt 
        this.validateLoginAttempt(loginAttempt);
        if (this.state.errorText === '') {
            // loginAttempt has been validated
            // send the login attempt somewhere
        }
        // reset login form
        this.setState({ emailVal: '', passwordVal: '' });
    }

    // update the state of the email based on what is being typed
    handleEmailValChange(e) {
        this.setState({ emailVal: e.target.value });
    }

    // update the state of the password based on what is being typed
    handlePasswordValChange(e) {
        this.setState({ passwordVal: e.target.value });
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
                    <h2>Login</h2>
                    <p>Sign in to access the full Better experience</p>
                    <Link to="/register">Create a new account</Link>
                </div>
                { errorMessage }
                <form onSubmit={this.handleLoginClick}>
                    <div className="row">
                        <div className="col s12 m6 push-m3">
                            <input type="email" id="email" value={this.state.emailVal} onChange={this.handleEmailValChange} className="validate"></input>
                            <label htmlFor="email" className="active">Email Address</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 m6 push-m3">
                            <input type="password" value={this.state.passwordVal} onChange={this.handlePasswordValChange} className="validate"></input>
                            <label htmlFor="password" className="active">Password</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 m2 push-m7">
                            <button onClick={this.handleLoginClick} className="btn form-btn waves-effect">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginView;