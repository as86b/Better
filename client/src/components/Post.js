/* 
    components/Post

    Defines the structure and appearance of a user's post on the site
*/

import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import { endpoint } from '../App';

// TODO probably use withRouter to distinguish between views 
import { withRouter } from 'react-router-dom';

// import profile picture
// TODO make this dynamic based on user 
const profilePicture = require('../assets/img/blank-profile-picture.png');

class Post extends Component {
    render() {
        return(
            <div className="row">
                <div className="col s12 m8 push-m2 post z-depth-3">
                    <div className="col s3 m2 post-profile-pic center">
                        {/*profile pic*/}
                        <img className="responsive-img circle z-depth-2 profile-picture" src={`${endpoint}/api/users/getProfilePicture/${this.props.post.username}`} alt="Profile" />
                        <p>{this.props.post.username}</p>
                    </div>
                    <div className="col s9 m10">
                        {/*post content*/}
                        <div className="row">
                            <div className="col s9 m10 post-text">
                                {/*post text*/}
                                <h5>{this.props.post.title}</h5>
                                <p>{this.props.post.body}</p>
                            </div>
                            <div className="col s3 m2 post-support-icon">
                                {/*support button*/}
                                <i className="material-icons">sentiment_very_satisfied</i>
                            </div>
                        </div>
                        <div className="row">
                            {/*TODO tags*/}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Post);
