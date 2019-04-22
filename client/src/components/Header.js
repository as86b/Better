/* 
    components/Header

    Fixed header to be displayed on every page
*/

import React from 'react';

//Materialize downloaded onto webserver. No need for a CDN
//Also Trevor says its more secure this way
import 'materialize-css/dist/css/materialize.min.css';

//Design imports
import logo from '../assets/img/mountain.png';
import profile from '../assets/img/corgi.jpeg';
import '../App.css';

import { Link, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { endpoint, loadUser, logoutUser } from '../App';

class Header extends React.Component {
    constructor(props) {
        super(props);

        //Intialize state to landing page
        this.state = {
            path: '/',
        }
        
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.pageBodyLoader = this.pageBodyLoader.bind(this);
    }

    handleLogoutClick() {
        logoutUser();
        this.forceUpdate();
        window.location.reload();
    }

    /*{ Checking for dark theme? }*/
    //The top right of the navbar will change based off of what page is currently loaded into the body
    pageBodyLoader(user) {
        console.log(user);
        let headPart;

        if (!user) {
            headPart = (
                <ul className="right hide-on-med-and-down">
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                </ul>
            );
        }
        else {
            headPart = (
                <ul className="right">
                    <li>
                        <a href="#">
                            <i className="material-icons">search</i>
                        </a>
                    </li>
                    <li>
                        <Link to="/">
                            <i className="material-icons hide-on-med-and-down">mail</i>
                        </Link>
                    </li>
                    {/*There are different versions of notifications icon maybe to use?*/}
                    {/*Or try to use some CSS to just overlay a little red dot*/}
                    <li>
                        <Link to="/">
                            <i className="material-icons hide-on-med-and-down">notifications</i>
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile">
                            <img className="headerProfilePic z-depth-2" src={`${endpoint}/api/users/getProfilePicture/${user.username}`} alt="Profile"></img>
                        </Link>
                    </li>
                    <li>
                        <a onClick={this.handleLogoutClick}>Logout</a>
                    </li>
                </ul>
            );
        }
        

        return headPart;
    }

    render() {
        let user = loadUser();
        let part = this.pageBodyLoader(user);

        return(
            //Materialize utilizes header, main, footer
            <header>
                <div className="navbar-fixed z-index-3">
                    <nav>
                        <div className="nav-wrapper">
                            <ul id="nav-mobile" className="left">
                                {/* Element is bleeding over slightly from navbar */}
                                <li>
                                    <Link to="/" >
                                        <div>
                                            <img className="betterMountainLogo" src={logo} alt="Logo"></img>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="betterLogo hide-on-med-and-down">Better</Link>
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