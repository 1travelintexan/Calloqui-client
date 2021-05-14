import React, { Component } from "react";

class Avatar extends Component {
  render() {
    const { onAvatar } = this.props;
    return (
      <div classname="addEvent">
        <form onSubmit={onAvatar}>
          <input name="eventImage" type="file" accept="image/jpeg, image/png" />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
export default Avatar;
