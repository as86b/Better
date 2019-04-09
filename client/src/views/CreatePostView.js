/* 
    components/create-post-view

    Defines the structure and content of a user creating a post
*/

import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import FilterBar from '../components/FilterBar';

const profilePicture = require('../assets/img/blank-profile-picture.png');

// Add in the creatpostview path to header.js to account for it
// Make sure naming is correct

// TODO
/*
    When attaching image, find out where the image will be stored on DB
        -When storing the image, check for the type of file
        -Check for how big it is?
        -After MVP is established, could have a modal pop up after image is uploaded
        to allow people to customize and crop a photo they are posting
    Santize content from the create post as it will go into the database
    Body needs to be santiized to prevent SQL injection in the wording for instance
    When adding tags, allow for custom entries but only allow for up 10 max prolly
*/

class CreatePostView extends Component {

    constructor(props) {
        super(props);
        // TODO add support for profile pictures (and bio?)
        this.state = {
            file: null, 
            errorText: ''
        };
        
        this.handleFileUpload = this.handleFileUpload.bind(this);
    }

    handleFileUpload() {
        this.setState({ file: document.getElementById('file-input').files[0] });
    }

    render() {
        return(
            <div className="container">
                {/* Profile name and level of post publicity?? */}
                
                <div className="row">
                    <div className="col s3 m2 push-m1 createpost-profile-pic">
                            {/*profile pic*/}
                            <a href="#"> {/* profile page link */ }
                                <img className="responsive-img circle profile-picture" src={profilePicture} alt="Profile" />
                            </a>
                    </div>
                    <FilterBar></FilterBar>
                </div>

                {/* attaching image and to post anonymously or not */}
                <div className="row">

                    {/* Image submission form here */}
                    <div className="col s12 m4 push-m2 file-field fileUpload">
                        <div className="row">
                            <div className="col s2">
                                <div className="btn-floating waves-effect white-text z-depth-2 betterButton">
                                    <i className="small material-icons">insert_photo</i>
                                    <input type="file" id="file-input" onChange={this.handleFileUpload} />
                                </div>
                            </div>
                            <div className="col s10">
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text" value={this.state.file ? this.state.file.name : 'Optional photo attachment'} readOnly />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div action="#" className="postCheckBox m4">
                        <label>
                            <input type="checkbox" />
                            <span id="postPhrase">Post Anonymously?</span>
                        </label>
                    </div>
                </div>
        
                {/* Post content */}
                {/* Check for max character count */}
                <div className="row">
                    <form className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <textarea   id="createPostBox" 
                                        placeholder="...Write post here" 
                                        className="materialize-textarea" 
                                        data-length="150">
                            </textarea>
                        </div>
                    </div>
                    </form>
                </div>

                {/* Adding Tags and submission button */}
                {/* Will take user back to feed after submission */}
                <div className="row tagField">
                    <form className="col s6">
                        <div className="row">
                            <div className="input-field col s6">
                                Tags: <input type="text" data-length="10" placeholder="Press enter to add..."></input>
                            </div>
                            <div className="btn-floating betterButton">
                                    <i className="material-icons">add</i>
                            </div>
                        </div>
                    </form>

                    <div className="btn right betterButton">
                        <span>Post</span>
                    </div>
                </div>
                



            </div>
        );
    }
}

export default CreatePostView;