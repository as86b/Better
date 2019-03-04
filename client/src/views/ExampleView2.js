/*
    View - ExampleView2
    
    A template for how a view can be structured and used 
*/

import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';

import { Link } from 'react-router-dom';

class ExampleView2 extends Component {
    render() {
        // demonstrate using an imported component 
        return(
            <div>
                <h1>Hello!</h1>
                <Link to="/">Go back!</Link>
            </div>
        );
    }
}

export default ExampleView2;