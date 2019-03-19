/*
    View - AboutView
    
    View for when user clicks 'About' link in footer
*/

import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import aboutLeft from '../assets/img/aboutLeft.svg';
import aboutRight from '../assets/img/aboutRight.svg';


class AboutView extends Component {
    render() {
        return(
            <div className="row" id="aboutRow">
                <div>
                    <img src={aboutLeft} alt="" id="aboutImgLeft" className="col m4"></img>
                </div>

                <div id="aboutText" className="col s12 m4">
                        <h1 id="aboutTitle">About Better</h1>
                        <p>Better was created to help people feel better about themselves. You can post anonymously about anything you have on your mind. It is a judgement free zone meant to give people the opportunity to express themselves and support others.</p>
                        <p>You can make posts to rant about things that have been on your mind or tell a story you have wanted to tell the world but don't feel comfortable saying it face to face with someone. Participate in conversations with people that understand and support you.</p>
                        <p>Use Better to seek help and support when you need it. Help others with their problems. Find more resources in the Get Help tab below.</p>
                        <p>Make the world Better!</p>
                </div>

                <div>
                    <img src={aboutRight} alt="" id="aboutImgRight" className="col m4"></img>
                </div>
            </div>
        );
    }
}

export default AboutView;