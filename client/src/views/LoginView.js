/*
    View - RegisterView
    
    A page that renders a form for users to login to created accounts
*/

import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import { Link, Redirect } from 'react-router-dom';
import { endpoint, loginUser, loadToken } from '../App';
import axios from 'axios';

class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginVal: '',
            passwordVal: '',
            errorText: '',
            redirect: false 
        };

        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLoginValChange = this.handleLoginValChange.bind(this);
        this.handlePasswordValChange = this.handlePasswordValChange.bind(this);
    }

    // validate that the provided information is valid to attempt a login
    validateLoginAttempt(loginAttempt) {
        // flag denotes an error in validation if:
        //  email is of an invalid format
        //  password is less than 6 characters 
        // NOTE: should password constraint be 6 +/- ? 
        var atIndex = loginAttempt.login.indexOf("@");
        if (atIndex > 0) {
            // looking at email address 
            if (atIndex === 0) {
                this.setState({ errorText: 'Please provide a valid email address' });
                return false; 
            }
            var dotIndex = loginAttempt.login.indexOf(".");
            if ((dotIndex < atIndex+2) || (dotIndex + 1 === loginAttempt.login.length)) { 
                this.setState({ errorText: 'Please provide a valid email address' });
                return false;  
            }
        }
        else { 
            // looking at username 
            if (loginAttempt.login.length < 6) {
                this.setState({ errorText: 'Please provide a valid username (minimum 6 characters)' });
                return false;
            }
        }
        // check password 
        if (loginAttempt.password.length < 6) {
            this.setState({ errorText: 'Please provide a valid password (minimum 6 characters)' });
            return false;
        }
        // valid login attempt, remove any lingering errors
        this.setState({ errorText: '' });
        return true; 
    }

    // send login attempt (if valid) to be authenticated
    handleLoginClick(e) {
        e.preventDefault();
        let loginAttempt = { login: this.state.loginVal, password: this.state.passwordVal };
        if (this.validateLoginAttempt(loginAttempt) && this.state.errorText === '') {
            // loginAttempt has been validated
            // send the login attempt somewhere
            axios.post(`${endpoint}/api/login/`, loginAttempt)
            .then((res) => {
                if (res.data.status === "success") {
                    loginUser(loginAttempt.login, res.data.token);
                    this.setState({ redirect: true });
                }
                else {
                    this.setState({ errorText: res.data.details });
                }
            })
            .catch((err) => {
                console.log(err);
            });
        }
        // reset login form
        this.setState({ loginVal: '', passwordVal: '' });
    }

    // update the state of the email based on what is being typed
    handleLoginValChange(e) {
        this.setState({ loginVal: e.target.value });
    }

    // update the state of the password based on what is being typed
    handlePasswordValChange(e) {
        this.setState({ passwordVal: e.target.value });
    }

    render() {
        if (this.state.redirect || loadToken()) {
            console.log('User already logged in');
            return(<Redirect to="/dashboard"></Redirect>);
        }
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
                            <input type="email" id="email" value={this.state.loginVal} onChange={this.handleLoginValChange} className="validate"></input>
                            <label htmlFor="email" className="active">Username/Email Address</label>
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