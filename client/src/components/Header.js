/* eslint-disable no-fallthrough */
/* example component. follow this template */

import React from 'react';

//Materialize downloaded onto webserver. No need for a CDN
//Also Trevor says its more secure this way
import 'materialize-css/dist/css/materialize.min.css';

//Design imports
import logo from '../assets/img/mountain.png';
import profile from '../assets/img/corgi.jpeg';
import '../App.css';

import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            path: '/'
        }
        
        this.pageBodyLoader = this.pageBodyLoader.bind(this);
    }

    /*{ Checking for dark theme? }*/
    componentDidMount() {
        let newPath = this.props.location.pathname;
        console.log(newPath);
        this.setState({ path: newPath });
        console.log(this.state.path);
    }
    
    //The top right of the navbar will change based off of what page is currently loaded into the body
    pageBodyLoader() {
        
        let headPart;

        switch(this.state.path) {
            
            //Landing page
            case '/':

            // case '/login':

            case '/register':

            //Above 3 pages share this layout in the top right
            headPart = (
                <ul className="right hide-on-med-and-down">
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <a href="#">Registration</a>
                    </li>
                </ul>
            );

            break;

            case '/login':
            //If logged in and looking at feed for instance
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
                            <img className = "circle responsive-img brand-logo" src={profile}></img>
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
        let part = this.pageBodyLoader();
        return(
            <div className="navbar-fixed">
                <nav>
                    <div className="nav-wrapper">
                        <ul id="nav-mobile" className="left hide-on-med-and-down">
                            <li>
                                <a href="#" >
                                    <img id ="betterMountainLogo" src={logo}></img>
                                </a>
                            </li>
                            <li><a href="#" id="betterLogo">Better</a></li>
                        </ul>
                        {part}
                    </div>
                </nav>
            </div>
        );
    }
}

export default withRouter(Header);