/* 
    components/ProfileBioPopup

    popup with textbox to edit profile bio
*/

import React from 'react';

import 'materialize-css/dist/css/materialize.min.css';

//Design imports
import '../App.css';


class ProfileBioPopup extends React.Component {
    render() {
      return (
        <div className='popup'>
          <div className='popup_inner'>
            <p>Update your bio in the text box below</p>
            <textarea className="bioPopupTextarea" placeholder="Type here to update bio..."/>
            <button onClick={this.props.handleUpdateBio} className="btn waves-effect updateBioButton">Update Bio</button>
            <button onClick={this.props.closePopup} className="btn waves-effect updateBioButton">Cancel</button>
          </div>
        </div>
      );
    }
}

export default ProfileBioPopup;