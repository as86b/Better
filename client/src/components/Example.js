/* example component. follow this template */

import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';

// demonstrate linking to routes 
import { Link } from 'react-router-dom';

class Example extends Component {
    render() {
        return(
            <div>
                <p>This is an example</p>
                <Link to="/example2">click me</Link> 
            </div>
        );
    }
}

export default Example;
