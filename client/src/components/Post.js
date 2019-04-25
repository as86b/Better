/* 
    components/Post

    Defines the structure and appearance of a user's post on the site
*/

import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import { endpoint } from '../App';

// TODO probably use withRouter to distinguish between views 
import { withRouter, Link } from 'react-router-dom';

class Post extends Component {
    constructor(props) {
        super(props);
    }

    handleSupportClick(e) {
        /*change support button color when clicked */
    
    }

    render() {
        let link = (<span></span>);
        if (!this.props.contained) {
            link = (
                <div className="show-more">
                    <a href={`/post/${this.props.post._id}`} className="show-more-btn">Show more</a>
                </div>
            );
        }
        return(
            <div className="row">
                <div className="col s12 m8 push-m2 post z-depth-3">
                    <div className="col s3 m2 post-profile-pic center">
                        {/*profile pic*/}
                        <Link to={`/profile/${this.props.post.username}`}>
                            <img className="profile-picture circle z-depth-2" src={`${endpoint}/api/users/getProfilePicture/${this.props.post.username}`} alt="Profile" />
                        </Link>
                        <p>{this.props.post.username}</p>
                    </div>
                    <div className="col s9 m10">
                        {/*post content*/}
                        <div className="row">
                            <div className="col s9 m10 post-content">
                                {/*post text*/}
                                <h5>{this.props.post.title}</h5>
                                <div className={this.props.contained ? "" : "hide-content"}>
                                    <p>{this.props.post.body}</p>
                                </div>
                                { link }
                            </div>
                            <div className="col s3 m2 post-support-icon">
                                {/*support button*/}
                                <i className="material-icons support-btn" onClick={this.handleSupportClick}>favorite</i>
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
