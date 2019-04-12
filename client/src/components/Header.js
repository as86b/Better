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

import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { endpoint } from '../App';

class Header extends React.Component {
    constructor(props) {
        super(props);

        //Intialize state to landing page
        this.state = {
            path: '/',
            username: 'default'
        }
        
        this.pageBodyLoader = this.pageBodyLoader.bind(this);
    }

    componentDidMount() {
        let newPath = this.props.location.pathname;
        // FIXME need to retrieve the user's username somehow 
        this.setState({ path: newPath });
    }
    
    /*{ Checking for dark theme? }*/
    //The top right of the navbar will change based off of what page is currently loaded into the body
    pageBodyLoader() {
        
        let headPart;

        switch(this.state.path) {
            
            //Landing page
            case '/':
            case '/login':
            case '/register':
                //Above 3 pages share this layout in the top right
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
                break;

            case '/dashboard':
            case '/profile':
            case '/createPost':
                //If logged in and looking at feed for instance
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
                                <img className="headerProfilePic z-depth-2" src={`${endpoint}/api/users/getProfilePicture/${this.state.username}`} alt="Profile"></img>
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