/* 
    components/Post

    Defines the structure and appearance of a user's post on the site
*/

import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import { endpoint, loadToken } from '../App';
import axios from 'axios';

// TODO probably use withRouter to distinguish between views 
import { withRouter, Link } from 'react-router-dom';

class Post extends Component {
    constructor(props) {
        super(props);

        this.handleSupportClick = this.handleSupportClick.bind(this);
    }

    handleSupportClick(e) {
        /*
            send the support and
            change support button color when clicked
            if the user made a valid action 
        */
        let icon = e.target;
        let query = { token: loadToken(), postID: this.props.post._id };
        if (this.props.reply) 
            query.reply = true;
        axios.post(`${endpoint}/api/support/`, query) 
        .then((res) => {
            if (res.data.status === "success") {
                // change color locally. this will still be reflected on a refresh because of parents
                icon.style.color = '#46c6a5';
            }
        });
    }

    render() {
        let link = (<span></span>);
        let image = (<span></span>);
        if (!this.props.contained) {
            link = (
                <div className="show-more">
                    <a href={`/post/${this.props.post._id}`} className="show-more-btn">Show more</a>
                </div>
            );
        }
        else {
            if (this.props.post.file) {
                // load the file 
                image = (<img className="responsive-img z-depth-2" src={`${endpoint}/api/upload/image/${this.props.post.file}`} alt="postImage" />);
            }
        }
        return(
            <div className="row">
                <div className={!this.props.contained ? "col s12 m8 push-m2 post z-depth-3" : "col s12 m8 push-m2 post-full z-depth-3"}>
                    <div className="col s3 m2 post-profile-pic center">
                        {/*profile pic*/}
                        <Link to={`/profile/${this.props.post.username}`}>
                            <img className="profile-picture circle z-depth-2" src={`${endpoint}/api/users/getProfilePicture/${this.props.post.username}`} alt="Profile" />
                        </Link>
                        <p>{this.props.post.username}</p>
                    </div>
                    <div className="col s9 m10">
                        {/*post content*/}
                        <div className="row content-row">
                            <div className="col s9 m10 post-content">
                                {/*post text*/}
                                <h5>{this.props.post.title}</h5>
                                <div className={this.props.contained ? "" : "hide-content"}>
                                    <p>{this.props.post.body}</p>
                                </div>
                                { image }
                                { link }
                            </div>
                            <div className="col s3 m2 post-support-icon noselect">
                                {/*support button*/}
                                <i className={this.props.supported ? "material-icons support-btn-supported" : "material-icons support-btn"} onClick={this.handleSupportClick}>favorite</i>
                            </div>
                        </div>
                        <div className="row flag-tags-div">
                        {/*TODO tags*/}
                        {/*
                            <div className=" col s1 m2 post-tag">
                                <p className="center">#tags</p>
                            </div>
                        */}
                            <div className="col s1 right">
                                <i className="material-icons small post-flag-btn" onClick={this.handleFlagClick}>flag</i>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Post);
