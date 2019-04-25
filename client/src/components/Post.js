/* 
    components/Post

    Defines the structure and appearance of a user's post on the site
*/

import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';

// TODO probably use withRouter to distinguish between views 
import { withRouter } from 'react-router-dom';

// import profile picture
// TODO make this dynamic based on user 
const profilePicture = require('../assets/img/blank-profile-picture.png');

class Post extends Component {
    constructor(props) {
        super(props);
    }

    handleSupportClick(e) {
        
    
    }

    render() {
        return(
            <div className="row">
                <div className="col s12 m8 push-m2 post z-depth-3">
                    <div className="col s3 m2 post-profile-pic center">
                        {/*profile pic*/}
                        <img className="responsive-img circle z-depth-2 profile-picture" src={profilePicture} alt="Profile" />
                        <p>Username</p>
                    </div>
                    <div className="col s9 m10">
                        {/*post content*/}
                        <div className="row">
                            <div className="col s9 m10 post-content">
                                {/*post text*/}
                                <h5>Title</h5>
                                <div className="hide-content">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at cursus ligula, sed eleifend sem. Vivamus quis arcu a ipsum placerat laoreet. Morbi mattis nibh at diam ullamcorper, nec sagittis tellus consectetur. Nulla at placerat nisi, eget sodales nisi. Quisque lacinia risus nec augue euismod, vitae malesuada magna bibendum.</p>
                                </div>

                                <div class="show-more">
                                    <a href="#" className="show-more-btn">Show more</a>
                                </div>
                            </div>
                            <div className="col s3 m2 post-support-icon">
                                {/*support button*/}
                                <i className="material-icons support-btn" onClick={this.handleSupportClick}>favorite</i>
                            </div>
                        </div>
                        <div className="row">
                            {/*tags*/}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Post);
