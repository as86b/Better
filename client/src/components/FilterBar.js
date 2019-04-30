/*

    components/FilterBar

*/

import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import '../App.css'

import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class FilterBar extends React.Component  {

    constructor(props) {

        super(props);

        //Intialize state to landing page
        this.state = {
            path: '/',
            scope: 'global',
            buttons: { 
                global: true, 
                followers: false, 
                private: false, 
                verified: false,
                posts: false,
                replies: false,
                personal: false,
                supported: false 
            }
        }
        
        this.handleScopeClick = this.handleScopeClick.bind(this);
        this.pageFilterBarLoader = this.pageFilterBarLoader.bind(this);
    }

    // ADD IN ONCLICK FUNCTIONS TO BUTTONS
    // onclick={} to go where it needs to

    handleScopeClick(e) {
        this.setState({ scope: e });
        let buttons = this.state.buttons; 
        for (var button in this.state.buttons) {
            buttons[button] = (button === e); 
        }
        this.setState({ buttons: buttons });
        this.props.handleScopeChange(e);
    }

    pageFilterBarLoader() {
        
        let bar;
        let path = this.state.path.slice(1, this.state.path.length);
        if (path.indexOf('/') > 0)
            path = path.slice(0, path.indexOf('/'));
        switch(path) {
            
            case 'dashboard':
                bar = (
                    <div className="filterBarButtons col s12 m10 push-m1">
                            <button id="global" 
                                    className={this.state.buttons.global === true ? 'waves-effect waves-light btn betterButtonSelected' : 'waves-effect waves-light btn betterButton'}
                                    onClick={() => this.handleScopeClick('global')}>Global</button>
                            <button id="followers" 
                                    className={this.state.buttons.followers === true ? 'waves-effect waves-light btn betterButtonSelected' : 'waves-effect waves-light btn betterButton'}
                                    onClick={() => this.handleScopeClick('followers')}>Followers</button>
                            <button id="verified" 
                                    className={this.state.buttons.verified === true ? 'waves-effect waves-light btn betterButtonSelected' : 'waves-effect waves-light btn betterButton'}
                                    onClick={() => this.handleScopeClick('verified')}>Verified</button>
                    </div>
                );
            break;

            
            case 'createpost':
                bar = (
                    <div className="">
                        <div className="filterBarButtons col s12 m10 push-m1">
                            <button id="global" 
                                    className={this.state.buttons.global === true ? 'waves-effect waves-light btn betterButtonSelected' : 'waves-effect waves-light btn betterButton'}
                                    onClick={() => this.handleScopeClick('global')}>Global</button>
                            <button id="followers" 
                                    className={this.state.buttons.followers === true ? 'waves-effect waves-light btn betterButtonSelected' : 'waves-effect waves-light btn betterButton'}
                                    onClick={() => this.handleScopeClick('followers')}>Followers</button>
                            <button id="private" 
                                    className={this.state.buttons.private === true ? 'waves-effect waves-light btn betterButtonSelected' : 'waves-effect waves-light btn betterButton'}
                                    onClick={() => this.handleScopeClick('private')}>Just Me</button>
                        </div>
                    </div>
                );
            break;

            case 'profile':
                if (this.props.personal) {
                    bar = (
                        <div className="filterBarButtons col s12 m10 push-m1">
                            <button id="posts" 
                                    className={this.state.buttons.posts === true ? 'waves-effect waves-light btn betterButtonSelected' : 'waves-effect waves-light btn betterButton'}
                                    onClick={() => this.handleScopeClick('posts')}>Posts</button>
                            <button id="replies" 
                                    className={this.state.buttons.replies === true ? 'waves-effect waves-light btn betterButtonSelected' : 'waves-effect waves-light btn betterButton'}
                                    onClick={() => this.handleScopeClick('replies')}>Replies</button>
                            <button id="personal" 
                                    className={this.state.buttons.personal === true ? 'waves-effect waves-light btn betterButtonSelected' : 'waves-effect waves-light btn betterButton'}
                                    onClick={() => this.handleScopeClick('personal')}>Personal</button>
                            <button id="supported" 
                                    className={this.state.buttons.supported === true ? 'waves-effect waves-light btn betterButtonSelected' : 'waves-effect waves-light btn betterButton'}
                                    onClick={() => this.handleScopeClick('supported')}>Supported</button>
                        </div>
                    );
                }
                else {
                    bar =(
                        <div className="filterBarButtons col s12 m10 push-m2">
                            <button id="posts" 
                                    className={this.state.buttons.posts === true ? 'waves-effect waves-light btn betterButtonSelected' : 'waves-effect waves-light btn betterButton'}
                                    onClick={() => this.handleScopeClick('posts')}>Posts</button>
                            <button id="replies" 
                                    className={this.state.buttons.replies === true ? 'waves-effect waves-light btn betterButtonSelected' : 'waves-effect waves-light btn betterButton'}
                                    onClick={() => this.handleScopeClick('replies')}>Replies</button>
                        </div>
                    );
                }
            break;

            default:
                break;
        }

        return bar;
    }

    componentDidMount() {
        let newPath = this.props.location.pathname;
        this.setState({ path: newPath });
        let path = newPath.slice(1, newPath.length);
        if (path.indexOf('/') > 0)
            path = path.slice(0, path.indexOf('/'));
        if (path === "profile") {
            let buttons = this.state.buttons;
            buttons['global'] = false;
            buttons['posts'] = true;
            this.setState({ scope: 'posts', buttons: buttons });
        }
    }

    render() {
        
        let bar = this.pageFilterBarLoader();

        return(
            <div>
                {bar}
            </div>
        );
    };
}

export default withRouter(FilterBar);
