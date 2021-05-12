import React, { Component } from "react";
import axios from "axios";

class EditEvent extends Component {
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

  //update just the name of the event
  handleNameChange = (event) => {
    let newName = event.target.value;

    // clone the object to update one specific part of it
    const { eventDetail } = this.state;
    let clonedEventDetail = JSON.parse(JSON.stringify(eventDetail));

    clonedEventDetail.name = newName;

    this.setState({
      eventDetail: clonedEventDetail,
    });
  };

  //update the event decription
  handleDescChange = (event) => {
    let newDesc = event.target.value;

    // clone the object to update one specific part of it
    const { eventDetail } = this.state;
    let clonedEventDetail = JSON.parse(JSON.stringify(eventDetail));

    clonedEventDetail.description = newDesc;

    this.setState({
      eventDetail: clonedEventDetail,
    });
  };

  //update the event date
  handleDateChange = (event) => {
    let newDate = event.target.value;

    // clone the object to update one specific part of it
    const { eventDetail } = this.state;
    let clonedEventDetail = JSON.parse(JSON.stringify(eventDetail));

    clonedEventDetail.date = newDate;

    this.setState({
      eventDetail: clonedEventDetail,
    });
  };

  //update the event location
  handleLocationChange = (event) => {
    let newLocation = event.target.value;

    // clone the object to update one specific part of it
    const { eventDetail } = this.state;
    let clonedEventDetail = JSON.parse(JSON.stringify(eventDetail));

    clonedEventDetail.location = newLocation;

    this.setState({
      eventDetail: clonedEventDetail,
    });
  };

  render() {
    const { eventDetail } = this.state;
    const { onEdit } = this.props;
    return (
      <div>
        <h2>Edit Event Page</h2>
        <input
          onChange={this.handleNameChange}
          type="text"
          value={eventDetail.name}
        />
        <input
          onChange={this.handleDescChange}
          type="text"
          value={eventDetail.description}
        />
        <input
          onChange={this.handleDateChange}
          type="text"
          value={eventDetail.date}
        />
        <input
          onChange={this.handleLocationChange}
          type="text"
          value={eventDetail.location}
        />
        <button
          onClick={() => {
            onEdit(eventDetail);
          }}
        >
          Submit
        </button>
      </div>
    );
  }
}
export default EditEvent;
