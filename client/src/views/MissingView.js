/*
    View - MissingView
    
    View for any 404 pages
*/

import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import aboutLeft from '../assets/img/aboutLeft.svg';
import aboutRight from '../assets/img/aboutRight.svg';

import { Link } from 'react-router-dom';


class MissingView extends Component {
    render() {
        return(
            <div className="container">
                <h1>Uh oh</h1>
                <p>404: This page doesn't exist.</p>
            </div>
        );
    }
}

export default MissingView;