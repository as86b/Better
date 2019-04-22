/* 
    components/Footer

    Fixed footer to be displayed on every page
*/

import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import '../App.css'

import { Link } from 'react-router-dom';

class Footer extends React.Component  {

    render() {
        return(
            <footer className="page-footer footBar z-index-3">
                <div className="container">
                    <div className="row">
                        <div className="col m2 hide-on-small-and-down">
                            <Link to="/about" className="footLinks">About</Link>
                        </div>
                        <div className="col m2 push-m6 s12">
                            <a href="https://www.suicidepreventionlifeline.org" className="footLinks">Get Help</a>
                        </div>
                        <div className="col m4 push-m6 hide-on-small-and-down left">
                            <a href="#" className="footLinks">1-800-273-8255</a>
                        </div>
                    </div>
                </div>
            </footer>
        );
    };
}

export default Footer;
