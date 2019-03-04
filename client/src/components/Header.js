/* example component. follow this template */

import React from 'react';

//Materialize downloaded onto webserver. No need for a CDN
//Also Trevor says its more secure this way
import 'materialize-css/dist/css/materialize.min.css';

//Design imports
import logo from '../assets/img/mountain.png';
import profile from '../assets/img/corgi.jpeg';
import '../App.css';

import { withRouter } from 'react-router-dom';

class Header extends React.Component {

    /*{ Checking for dark theme?}*/

    componentDidMount() {

        let path = this.props.location.pathname;

        this.pageBodyLoader(path);
    }
    
    //The top right of the navbar will change based off of what page is currently loaded into the body
    pageBodyLoader (path) {

        let headPart;

        switch(path) {
            
            //Landing page
            case '/':

            //Only time top right is different is on landing page
            case '/login':
                headPart = (
                    <ul class="right hide-on-med-and-down">
                        <li>
                            <a href="#">Login</a>
                        </li>
                        <li>
                            <a href="#">Registration</a>
                        </li>
                    </ul>
                );

            break;

            //Everything else should share this?
            case '/registration':
                headPart = (
                    <ul class="right hide-on-med-and-down">
                        <li>
                            <a href="#">
                                <i class="material-icons">mail</i>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="material-icons">search</i>
                            </a>
                        </li>
                        {/*There are different versions of notificaitons icon maybe to use?*/}
                        {/*Or try to use some CSS to just overlay a little red dot*/}
                        <li>
                            <a href="#">
                                <i class="material-icons">notifications</i>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img class = "circle" src={profile}></img>
                            </a>
                        </li>
                    </ul>
                );

            break;

             //If mobile is detected do something

            default:

            break;
        }

        return headPart;
    }

    render() {
        return(
            <div class="navbar-fixed">
                <nav>
                    <div class="nav-wrapper">
                        <ul id="nav-mobile" class="left hide-on-med-and-down">
                            <li>
                                <a href="#" >
                                    <img id = "betterMountainLogo" src = {logo}></img>
                                </a>
                            </li>
                            <li><a href="#" id="betterLogo">Better</a></li>
                        </ul>
                    </div>
                    {this.pageBodyLoader}
                </nav>
            </div>
        );
    }
}

export default withRouter(Header);