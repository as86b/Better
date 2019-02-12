/*
    View - ExampleView
    
    A template for how a view can be structured and used 
*/

import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';

// demonstrate component imports
import Example from '../components/Example';

class ExampleView extends Component {
    render() {
        // demonstrate using an imported component 
        return(
            <Example></Example>
        );
    }
}

export default ExampleView;