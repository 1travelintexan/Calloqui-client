import React, { Component } from "react";
import { Button } from "react-bootstrap";

class Avatar extends Component {
  render() {
    const { user, onAvatar } = this.props;

    return (
      <div>
        <div>
          <h2 className="avatar-page-h2">Select image for your Avatar</h2>
        </div>
        <div className="avatar-page">
          <form onSubmit={(e) => onAvatar(e, user._id)}>
            <div>
              <input name="avatar" type="file" accept="image/jpeg, image/png" />

              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Avatar;
