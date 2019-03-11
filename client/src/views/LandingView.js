/*
    View - LandingView
    
    View for when user first opens website - landing page
*/

import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import { Link } from 'react-router-dom';
import landingLeft from '../assets/img/landingLeft.svg';
import landingRight from '../assets/img/landingRight.svg';

// demonstrate component imports
import Example from '../components/Example';

class LandingView extends Component {
    render() {
        return(
            <div className="row" id="landingRow">
                <div>
                    <img src={landingLeft} id="landingImgLeft" className="col m4 "></img>
                </div>

                <div id="landingText" className="col s12 m4">
                        <h1 id="landingTitle">Feel Better</h1>
                        <p>Better is a community focused on helping others and getting help for yourself.</p>
                        <p>Post anonymously about anything you have on your mind. Express yourself openly. Participate in provoking conversations with people across the world.</p>
                        <br></br>
                    <div className="row">
                        <Link to="/about" className="col s6 m6 landingLink">Learn More</Link>
                        <Link to="/" className="col s6 m6 landingLink">Join the Conversation</Link>
                    </div>
                </div>

                <div>
                    <img src={landingRight} id="landingImgRight" className="col m4 "></img>
                </div>
            </div>
        );
    }
}

export default LandingView;