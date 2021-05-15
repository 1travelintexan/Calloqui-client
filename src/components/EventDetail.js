import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

class EventDetail extends Component {
  state = {
    eventDetail: {},
  };

  componentDidMount() {
    let eventId = this.props.match.params.eventId;

    axios
      .get(`http://localhost:5005/api/events/${eventId}`)
      .then((response) => {
        console.log(response.data);
        this.setState({ eventDetail: response.data });
      });
  }

  render() {
    const { eventDetail } = this.state;

    const { onDelete, user, comments, onComment } = this.props;

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
      <div className="event-detail">
        <h2>{eventDetail.name}</h2>
        <Link to={`/event/${eventDetail._id}/edit`}>Edit</Link>
        {eventDetail.image && (
          <img className="eventPic" src={eventDetail.image} alt="sess pic" />
        )}
        <h3>Location:</h3>
        <h6>{eventDetail.location}</h6>

        <h3>Date:</h3>
        <h6>{eventDetail.date}</h6>

        <h3>Description:</h3>
        <h6>{eventDetail.description}</h6>

        <h3>Comments:</h3>
        <h6>{comments.comment}</h6>

        <div className="commentBtn">
          <form onSubmit={(e) => onComment(e, eventDetail._id)}>
            <input name="comment" type="text" placeholder="comment" />
            <button type="submit" class="btn btn-info">
              Add Comment
            </button>
          </form>
        </div>
        <div>
          <button
            type="button"
            class="btn btn-danger"
            onClick={() => {
              onDelete(eventDetail);
            }}
          >
            Delete Event
          </button>
        </div>
      </div>
    );
  }
}
export default EventDetail;
