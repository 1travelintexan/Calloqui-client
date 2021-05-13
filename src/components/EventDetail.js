import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

class EventDetail extends Component {
  state = {
    eventDetail: {},
  };

  componentDidMount() {
    let eventId = this.props.match.params.eventId;
    console.log(eventId);
    axios
      .get(`http://localhost:5005/api/events/${eventId}`)
      .then((response) => {
        console.log(response.data);
        this.setState({ eventDetail: response.data });
      });
  }

  render() {
    const { eventDetail } = this.state;
    console.log(eventDetail);

    const { onDelete, user } = this.props;
    if (!user) {
      return (
        <Redirect
          to={{
            pathname: "/signin",
            state: {
              message: "Plese login first",
            },
          }}
        />
      );
    }
    return (
      <div>
        <h1>Event Detail page</h1>
        <h3>Event Name:{eventDetail.name}</h3>
        <h3>Event Location:{eventDetail.location}</h3>
        <h3>Event Date:{eventDetail.date}</h3>
        <h4>Description:{eventDetail.description}</h4>
        <button>
          <Link to={`/event/${eventDetail._id}/edit`}>Edit</Link>
        </button>
        <button
          onClick={() => {
            onDelete(eventDetail);
          }}
        >
          Delete
        </button>
      </div>
    );
  }
}
export default EventDetail;
