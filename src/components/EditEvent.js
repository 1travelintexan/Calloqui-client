import React, { Component } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

class EditEvent extends Component {
  state = {
    eventDetail: {},
  };

  componentDidMount() {
    let eventId = this.props.match.params.eventId;

    axios
      .get(`http://${config.API_URL}/api/event/${eventId}`)
      .then((response) => {
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
      <div className="add-event-page">
        <div className="add-event">
          <div>
            <h2>Edit your Event: </h2>
          </div>
          <div>
            <label>Event Name:</label>
            <input
              onChange={this.handleNameChange}
              type="text"
              value={eventDetail.name}
            />
          </div>
          <div>
            <label>Event Date:</label>
            <input
              onChange={this.handleDateChange}
              type="date"
              value={eventDetail.date}
            />
          </div>
          <div>
            <label>Event Location:</label>
            <input
              onChange={this.handleLocationChange}
              type="text"
              value={eventDetail.location}
            />
          </div>
          <div>
            <label>Event Description:</label>
            <textarea
              rows="2"
              cols="40"
              onChange={this.handleDescChange}
              value={eventDetail.description}
            />
          </div>
          <Button
            type="submit"
            onClick={() => {
              onEdit(eventDetail);
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }
}
export default EditEvent;
