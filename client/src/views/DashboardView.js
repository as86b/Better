/*
    View - DashboardView
    
    The main page that will contain user posts and allow for new post creation 
*/

import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import axios from 'axios'; 
import { endpoint } from '../App'; 

import Post from '../components/Post';

class DashboardView extends Component {
    constructor(props) {
        super(props);

        // TODO implement pagination and filtering
        let query = { scope: 'global', page: '1' };
        axios.get(`${endpoint}/api/feed/${query.scope}-${query.page}`)
        .then((res) => {
            console.log(res.data); 
            // TODO error detection for returning no posts (empty doc): 
                // try and query page one then post results
                // could be useful whenever users are trying to query an inexistent page
        })
        .catch((err) => {
            console.log(err);
        });
    }

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