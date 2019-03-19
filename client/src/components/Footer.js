/* example component. follow this template */

import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import '../App.css'

import { Link } from 'react-router-dom';

class Footer extends React.Component  {

    render() {
        
        //wont appear on mobile

        return(
            <footer className="page-footer footBar">
                <div className="container">
                    <div className="row">
                        <div className="col m1 valign-wrapper">
                            <Link to="/" className="footLinks hide-on-small-and-down">About</Link>
                        </div>
                        <div className="col m2 push-m7 s12">
                            <Link to="https://suicidepreventionlifeline.org" className="footLinks">Get Help</Link>
                        </div>
                        <div className="col m2 push-m8 hide-on-small-and-down">
                            1-800-273-8255
                        </div>
                    </div>
                </div>
            </footer>
        );
    };
}

export default Footer;
