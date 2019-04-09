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
            path: '/'
        }
        
        this.pageFilterBarLoader = this.pageFilterBarLoader.bind(this);
    }

    // ADD IN ONCLICK FUNCTIONS TO BUTTONS
    // onclick={} to go where it needs to

    pageFilterBarLoader() {
        
        let bar;

        switch(this.state.path) {
            
            // case '/feed':
            //     bar = (
            //         <div className="filterBarButtons col s12 m10 push-m2">
            //             <button className="waves-effect waves-light btn betterButton">Global</button>
            //             <button className="waves-effect waves-light btn betterButton">Followers</button>
            //             <button className="waves-effect waves-light btn betterButton">Verified</button>
            //         </div>
            //     );
            // break;

            
            case '/createpost':
                bar = (
                    <div className="">
                        <p>Share with:   </p>
                        <div className="filterBarButtons col s12 m10 push-m2">
                            <button className="waves-effect waves-light btn betterButton">Global</button>
                            <button className="waves-effect waves-light btn betterButton">Followers</button>
                            <button className="waves-effect waves-light btn betterButton">Just Me</button>
                        </div>
                    </div>
                );
            break;

            case '/profile':
                bar = (
                    <div className="filterBarButtons col s12 m10 push-m2">
                        <button className="waves-effect waves-light btn betterButton">Posts</button>
                        <button className="waves-effect waves-light btn betterButton">Replies</button>
                        <button className="waves-effect waves-light btn betterButton">Person</button>
                        <button className="waves-effect waves-light btn betterButton">Supported</button>
                    </div>
                );
            break;

            // case '/someone else's profile':
                // bar =(
                    // <div className="filterBarButtons col s12 m10 push-m2">
                    //     <button className="waves-effect waves-light btn betterButton">Posts</button>
                    //     <button className="waves-effect waves-light btn betterButton">Replies</button>
                    // </div>
                // );
                // break;

            default:
                break;
        }

        return bar;
    }

    componentDidMount() {
        let newPath = this.props.location.pathname;
        console.log(newPath);
        this.setState({ path: newPath });
        console.log(this.state.path);
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
