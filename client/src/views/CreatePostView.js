/* 
    views/create-post-view

    Defines the structure and content of a user creating a post
*/

import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import FilterBar from '../components/FilterBar';
import { endpoint, loadUser, loadToken } from '../App';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

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
            scopeVal: 'global', 
            anon: false,
            text: '',
            tags: [],
            file: null, 
            errorText: '',
            redirect: false,
            username: loadUser(),
            token: loadToken(),
        };

        console.log(this.state.user);
        if (!this.state.token || !this.state.user) {
            this.setState({ redirect: true });
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this); 
        this.handleScopeChange = this.handleScopeChange.bind(this); 
        this.handleAnonChange = this.handleAnonChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this); 
        this.handleTextChange = this.handleTextChange.bind(this); 
        this.handleTagsChange = this.handleTagsChange.bind(this); 
        this.handleFileUpload = this.handleFileUpload.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault(); 
        let postValues = {
            token: this.state.token,
            username: this.state.username,
            scope: this.state.scopeVal,
            anon: this.state.anon,
            // TODO add a title form and rename 'text' to 'body'
            title: this.state.title,
            body: this.state.text,
            tags: this.state.tags,
        }
        console.log(postValues);
        axios.post(`${endpoint}/api/post/`, postValues)
        .then((res) => {
            // upload any images after post is created
            if (res.data.status == "success") {
                let postID = res.data._id; 
                if (this.state.file) {
                    let fd = new FormData();
                    fd.append('file', this.state.file, this.state.file.name);
                    axios.post(`${endpoint}/api/upload/`, fd)
                    .then((res) => {
                        if (res.data.status === "success") {
                            // add file to post 
                            let query = { 
                                token: this.state.token,
                                _id: postID,
                                filename: res.data.file.filename 
                            };
                            axios.post(`${endpoint}/api/post/addPicture`, query)
                            .then((res) => {
                                // done
                                this.setState({ redirect: true });
                            });
                        }
                    });
                }
                this.setState({ redirect: true });
            }
            // TODO else display an error
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();
    }

    handleScopeChange(scope) {
        this.setState({ scopeVal: scope });
    }

    handleAnonChange(e) {
        this.setState({ anon: e.target.checked });
    }

    handleTitleChange(e) {
        this.setState({ title: e.target.value });
    }

    handleTextChange(e) {
        this.setState({ text: e.target.value });
    }

    handleTagsChange(e) {
        // TODO 
    }

    handleFileUpload() {
        this.setState({ file: document.getElementById('file-input').files[0] });
    }

    render() {
        if (this.state.redirect || !loadToken()) {
            return(<Redirect to="/dashboard"></Redirect>);
        }
        return(
            <div className="container">
                {/* Profile name and level of post publicity?? */}
                <form onSubmit={this.handleFormSubmit}>

                    <div className="row">
                        <div className="col s3 m2 push-m1 createpost-profile-pic">
                                {/*profile pic*/}
                                <img className="circle profile-picture-big" src={`${endpoint}/api/users/getProfilePicture/${this.state.username}`} alt="Profile" />
                        </div>
                        <FilterBar handleScopeChange={this.handleScopeChange}></FilterBar>
                    </div>
            
                    {/* Post content */}
                    {/* Check for max character count */}
                    <div className="row">

                        <div className="row">
                            <div className="input-field col s12 m9 push-m1">
                                <input id="title" value={this.state.title} onChange={this.handleTitleChange} type="text" className="validate"></input>
                                <label htmlFor="title" className="active">Title</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                                <textarea   id="createPostBox" 
                                            value={this.state.text}
                                            onChange={this.handleTextChange}
                                            placeholder="Share yourself..." 
                                            className="materialize-textarea" 
                                            data-length="150">
                                </textarea>
                            </div>
                        </div>
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
                                <input type="checkbox" onChange={this.handleAnonChange} value={this.state.anon} />
                                <span id="postPhrase">Post Anonymously?</span>
                            </label>
                        </div>

                    </div>

                    {/* Adding Tags and submission button */}
                    {/* Will take user back to feed after submission */}
                    <div className="row tagField">
                            {/* <div className="row">
                                <div className="input-field col s6">
                                    Tags: <input type="text" data-length="10" placeholder="Press enter to add..."></input>
                                </div>
                                <div className="btn-floating betterButton">
                                        <i className="material-icons">add</i>
                                </div>
                            </div> */}

                        <button className="btn right betterButton" onClick={this.handleSubmit}>Post</button>
                    </div>

                </form>
            </div>
        );
    }
}

export default CreatePostView;