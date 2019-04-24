/* 
    components/PopupEdit

    popup with textbox and image input to edit profile bio
*/

import React from 'react';

import 'materialize-css/dist/css/materialize.min.css';
import { withRouter } from 'react-router-dom';
import { loadToken, endpoint } from '../App';
import axios from 'axios';

//Design imports
import '../App.css';


class PopupEdit extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        text: '',
        file: null,
        details: {
          header: "Add content",
          iplace: "Picture upload",
          tplace: ""
        }
      }

      this.handleSubmit = this.handleSubmit.bind(this); 
      this.handleTextChange = this.handleTextChange.bind(this);
      this.handleFileUpload = this.handleFileUpload.bind(this);
    }

    handleSubmit(e) {
      e.preventDefault();
      // are we submitting profile data or a reply?
      let query;
      let token = loadToken();
      let path = this.state.path.slice(1, this.state.path.length);
      path = path.slice(0, path.indexOf('/'));
      console.log(path);
      switch(path) {
        case 'profile': 
          console.log('profile update');
          // FIXME only change relevant fields 
          if (this.state.text.length > 0) {
            query = { token: token, bio: this.state.text };
            axios.post(`${endpoint}/api/users/changeBio`, query)
            .then((res) => {
              if (!this.state.file) {
                this.props.closePopup();
                window.location.reload();
              }
            });
          }
          if (this.state.file) {
            console.log('find the file');
            let fd = new FormData();
            fd.append('file', this.state.file, this.state.file.name);
            axios.post(`${endpoint}/api/upload`, fd)
            .then((res) => {
              if (res.data.status === "error") {
                console.log('Failed to upload');
              }
              else {
                query = { token: token, filename: res.data.file.filename };
                axios.post(`${endpoint}/api/users/changeProfilePicture`, query)
                .then((res) => {
                  this.props.closePopup();
                  window.location.reload();
                });
              }
            });
          }
          break;

        case 'post':
          // should be a reply, should have a post id in the props 
          console.log('creating reply');
          if (this.props.post_id) {
            // send the update 
          }
          else {
            console.log('Error: no post id specified');
          }
          break; 
      }
    }

    handleTextChange(e) {
      this.setState({ text: e.target.value });
    }

    handleFileUpload() {
      this.setState({ file: document.getElementById('file-input').files[0] });
    }

    componentDidMount() {
      let newPath = this.props.location.pathname;
      let details = {};
      this.setState({ path: newPath });
      let path = newPath.slice(1, newPath.length);
      path = path.slice(0, path.indexOf('/'));
      switch(path) {
        case 'profile':
          details.header = "Update your profile information";
          details.iplace = "Change your profile picture";
          details.tplace = "Change your profile bio..";
          this.setState({ details: details });
          break;

        case 'post':
        default:
          // should be a reply
          details.header = "Reply to this post";
          details.iplace = "Add an image";
          details.tplace = "Type your reply here..";
          this.setState({ details: details });
          break;
      }
    }

    render() {
      return (
        <div className='popup center'>
          <div className='popup_inner'>
            <p>{ this.state.details.header }</p>
            <form onSubmit={this.handleSubmit}>
              <div className="input-field">
                <textarea className="bioPopupTextarea" value={this.state.text} onChange={this.handleTextChange}></textarea>
              </div>
              <div className="row file-field">
                  <div className="col m1 push-m3 s2 push-s1">
                      <div className="btn-floating waves-effect white-text z-depth-2 betterButton">
                          <i className="small material-icons">insert_photo</i>
                          <input type="file" id="file-input" onChange={this.handleFileUpload} />
                      </div>
                  </div>
                  <div className="col m4 push-m3 s7 push-s1">
                      <div className="file-path-wrapper">
                          <input className="file-path validate" type="text" value={this.state.file ? this.state.file.name : this.state.details.iplace} readOnly />
                      </div>
                  </div>
              </div>
              <button onClick={this.handleSubmit} className="btn waves-effect updateBioButton">Submit</button>
              <button onClick={this.props.closePopup} className="btn waves-effect updateBioButton">Cancel</button>
            </form>
          </div>
        </div>
      );
    }
}

export default withRouter(PopupEdit);