/*
    View - ExampleView
    
    A template for how a view can be structured and used 
*/

import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import { Link } from 'react-router-dom';

// demonstrate component imports
import Example from '../components/Example';
import Post from '../components/Post';

class ExampleView extends Component {
    render() {
        return(
            <div className="container">
                <h1 className="title">Welcome to Better</h1>
                <Link to="/login">login</Link>
                <br></br>
                <Link to="/register">register a new account</Link>
                <Post></Post>
                <Post></Post>
                <Post></Post>
            </div>
        );
    }
}

export default ExampleView;