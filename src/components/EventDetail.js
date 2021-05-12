import React, { Component } from "react";
import axios from "axios";

class EventDetail extends Component {
  state = {
    eventDetail: {},
  };

  componentDidMount() {
    let eventId = this.props.match.params.eventId;
    axios
      .get("http://localhost:5005/api/events/${eventId}")
      .then((response) => {
        this.setState({ eventDetail: response.data });
      });
  }

  render() {
    const { eventDetail } = this.state;
    return (
      <div>
        <h2>Event Detail page</h2>
        <h3>{eventDetail.name}</h3>
        <h4>{eventDetail.description}</h4>
        <h4>{eventDetail.location}</h4>
        <h4>{eventDetail.date}</h4>
      </div>
    );
  }
}
export default EventDetail;
