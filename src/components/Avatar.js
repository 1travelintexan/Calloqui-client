import React, { Component } from "react";

class Avatar extends Component {
  render() {
    const { onAvatar } = this.props;
    return (
      <div classname="addEvent">
        <h2>Select image for your Avatar</h2>
        <form onSubmit={onAvatar}>
          <input name="eventImage" type="file" accept="image/jpeg, image/png" />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
export default Avatar;
