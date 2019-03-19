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

        //Intialize state to landing page
        this.state = {
            path: '/'
        }
        
        this.pageBodyLoader = this.pageBodyLoader.bind(this);
    }

    componentDidMount() {
        let newPath = this.props.location.pathname;
        console.log(newPath);
        this.setState({ path: newPath });
        console.log(this.state.path);
    }
    
    /*{ Checking for dark theme? }*/
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
                        <Link to="/registration">Registration</Link>
                    </li>
                </ul>
            );

            break;

            case '/login':
            //If logged in and looking at feed for instance
            headPart = (
                <ul className="right">
                    <li>
                        <i className="material-icons">search</i>
                    </li>
                    <li>
                        <Link to="/">
                            <i className="material-icons hide-on-med-and-down">mail</i>
                        </Link>
                    </li>
                    {/*There are different versions of notificaitons icon maybe to use?*/}
                    {/*Or try to use some CSS to just overlay a little red dot*/}
                    <li>
                        <Link to="/">
                            <i className="material-icons hide-on-med-and-down">notifications</i>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <img className = "circle responsive-img profilePic" src={profile}></img>
                        </Link>
                    </li>
                </ul>
            );
            break;

             //If mobile is detected do something if materialize isnt taking care of it

            default:

            break;
        }

        return headPart;
    }

    render() {

        let part = this.pageBodyLoader();

        return(
            //Materialize utilizes header, main, footer
            <header>
                <div className="navbar-fixed">
                    <nav>
                        <div className="nav-wrapper">
                            <ul id="nav-mobile" className="left">
                                {/* Element is bleeding over slightly from navbar */}
                                <li>
                                    <Link to="/" >
                                        <div>
                                        <img className = "betterMountainLogo" src={logo}></img>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="betterLogo" className="hide-on-med-and-down">Better</Link>
                                </li>
                            </ul>
                            {part}
                        </div>
                    </nav>   

                    {/* sidenav code here */}
                </div>

                {/* or here?*/}
            </header>
        );
    }
}

export default withRouter(Header);