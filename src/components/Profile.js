import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

class Profile extends Component {
  state = {
    events: [],
    user: null,
    error: null,
    fetchingUser: true,
    comments: [],
    eventDetail: {},
  };

  componentDidMount() {
    //let eventId = this.props.match.params.eventId;

    axios.get(`http://localhost:5005/api/profile`).then((response) => {
      console.log(response.data);
      this.setState({ eventDetail: response.data, fetchingData: false });
    });
  }

  render() {
    const { fetchingData } = this.state;
    const { events, user, onDelete } = this.props;
    const myEvents = events.filter((elem) => elem.owner === user._id);

    if (fetchingData) {
      return (
        <div className="loading">
          <h1> loading...</h1>
        </div>
      );
    }
    if (!user) {
      return (
        <Redirect
          to={{
            pathname: "/signup",
            state: "Please sign in",
          }}
        />
      );
    }

    return (
      <div>
        <h1 className="upcoming-events">Welcome! {user.name}</h1>
        <h2 className="profile">List of your events:</h2>
        <div className="events-list">
          {myEvents.map((e) => {
            return (
              <div>
                <div className="event-list">
                  <div key={e._id}>
                    <Link className="event-name" to={`/event/${e._id}`}>
                      <h2>{e.name}</h2>
                    </Link>
                  </div>
                  <img className="eventPic" src={e.image} alt="sess pic" />
                </div>
                <div className="edit-button">
                  <div className="link">
                    <Link className="link1" to={`/events/${e._id}`}>
                      Edit
                    </Link>
                  </div>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => {
                      onDelete(e._id);
                    }}
                  >
                    Delete Event
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default Profile;
