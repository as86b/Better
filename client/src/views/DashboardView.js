/*
    View - DashboardView
    
    The main page that will contain user posts and allow for new post creation 
*/

import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import axios from 'axios'; 
import { Link } from 'react-router-dom';
import { endpoint } from '../App'; 

import Post from '../components/Post';

class DashboardView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            feed: null
        };

        // TODO implement pagination and filtering
        let query = { scope: 'global', page: '1' };
        axios.get(`${endpoint}/api/feed/${query.scope}-${query.page}`)
        .then((res) => {
            console.log(res.data); 
            // TODO error detection for returning no posts (empty doc): 
                // try and query page one then post results
                // could be useful whenever users are trying to query an inexistent page
            this.setState({ feed: res.data.feed.docs }); 
        })
        .catch((err) => {
            console.log(err);
        });
    }

    render() {
        let posts = [];
        if (this.state.feed) {
             for (var i = 0; i < this.state.feed.length; i++) {
                posts.push(
                    <Post key={(i+1)*this.state.page} post={this.state.feed[i]}></Post>
                );
             }
        }
        else {
            posts = null;
        }
        return(
            <div className="row">
                <div className="col s12 m8 push-m2">
                    { posts }
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

export default DashboardView;