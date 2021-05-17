import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import config from "./config";

class EventDetail extends Component {
  state = {
    eventDetail: null,
    fetchingData: true,
    comments: [],
  };

  componentDidMount() {
    let eventId = this.props.match.params.eventId;

    //eventDetail get from axios
    let eventDetailGet = axios.get(`${config.API_URL}/api/events/${eventId}`, {
      withCredentials: true,
    });

    //comments api get
    let commentGet = axios.get(`${config.API_URL}/api/comments`, {
      withCredentials: true,
    });

    Promise.allSettled([eventDetailGet, commentGet])
      .then((response) => {
        this.setState({
          eventDetail: response[0].value.data,
          comments: response[1].value.data,
          fetchingData: false,
        });
      })
      .catch((errorObj) => {
        console.log("promise failed");
        this.setState({ error: errorObj.data, fetchingData: false });
      });
  }

  render() {
    const { eventDetail, fetchingData } = this.state;
    const { user, onComment, comments } = this.props;

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
    if (fetchingData) {
      return (
        <div className="loading">
          <h1> loading...</h1>
        </div>
      );
    }
    const eventComments = comments.filter(
      (elem) => elem.eventId === eventDetail._id
    );

    return (
      <div className="event-detail">
        <h2>{eventDetail.name}</h2>

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

        {eventComments.map((elem) => {
          return (
            <div>
              <p>{elem.comment}</p>
            </div>
          );
        })}

        <div className="commentBtn">
          <form onSubmit={(e) => onComment(e, eventDetail._id)}>
            <input name="comment" type="text" placeholder="comment" />
            <button type="submit" class="btn btn-info">
              Add Comment
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default EventDetail;
