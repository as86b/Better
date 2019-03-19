/*
    View - DashboardView
    
    The main page that will contain user posts and allow for new post creation 
*/

import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';

import { Link } from 'react-router-dom';

import Post from '../components/Post';

class DashboardView extends Component {
    render() {
        return(
            <div className="row">
                <div className="col s12 m8 push-m2">
                    <h1>Dashboard</h1>
                    <Post></Post>
                </div>
            </div>
        );
    }
}

export default DashboardView;