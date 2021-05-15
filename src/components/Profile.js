import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Profile extends Component {
  render() {
    const { user } = this.props;
    if (!user) {
      return <Redirect to={"/signup"} />;
    }
    return (
      <div>
        <h1 className="upcoming-events">Welcome! {user.name}</h1>
        <h2 className="profile">List of your events:</h2>
      </div>
    );
  }
}
export default Profile;
