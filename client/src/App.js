/* 
  frontend entry point

  NOTE on routing structure
  - views are full pages that should be rendered between the header and footer
  - components are pieces of views that should be composed and reused
  - DO NOT route to a single component, routing should only be done to a view 

  link to color pallette: http://paletton.com/#uid=53a0u0kgtOf5uZcbsUxkJGooIxF
*/


import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';

// packages 
import socketIOClient from 'socket.io-client';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';


// view imports 
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import LandingView from './views/LandingView';
import AboutView from './views/AboutView';
import DashboardView from './views/DashboardView';
import ProfileView from './views/ProfileView';
import CreatePostView from './views/CreatePostView';
import PostView from './views/PostView';
import MissingView from './views/MissingView';

// component imports 
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// import '../App.css';

// setup socket connection with backend
// TODO setup socket. 
//    commenting this out for now to prevent ongoing error messages in console
// const socket = socketIOClient(endpoint);

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div className="container-fluid">
         <Header user={loadUser()}></Header>

          <ScrollToTop>
            <div className="switchStyle">
              <Switch>
                  <Route exact path="/" component={LandingView}></Route>
                  <Route path="/dashboard" component={DashboardView}></Route>
                  <Route exact path="/profile/:username" component={ProfileView}></Route>
                  <Route path="/login" component={LoginView}></Route>
                  <Route path="/register" component={RegisterView}></Route>
                  <Route path="/about" component={AboutView}></Route>
                  <Route path="/createpost" component={CreatePostView}></Route>
                  <Route exact path="/post/:postID" component={PostView}></Route>
                  {/* default case - TODO possibly make a 404 error for here */}
                  <Route component={MissingView}></Route>
              </Switch>
          </div>  
        </ScrollToTop>

        <Footer></Footer>
      </div>
    );
  }
}

export default App;
// manage the endpoint of the server for api requests
export const endpoint = 'http://localhost:4000'

export const loginUser = (username, token) => {
  Cookies.set('user', username, { expires: 1 });
  localStorage.setItem('token', token);
}

export const logoutUser = () => {
  Cookies.remove('user');
  localStorage.removeItem('token');
}

export const loadUser = () => {
  let user = Cookies.get('user');
  return user;
}

export const loadToken = () => {
  let token = localStorage.getItem('token');
  return token;
}