import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import config from "./config";
import CircleLoader from "../components/CircleLoader";
import { ShakeRotate } from "reshake";

class EventDetail extends Component {
  state = {
    eventDetail: null,
    fetchingData: true,
    comments: this.props.comments,
  };

  componentDidMount() {
    let eventId = this.props.match.params.eventId;

    //eventDetail get from axios
    let eventDetailGet = axios.get(`${config.API_URL}/api/event/${eventId}`, {
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

  componentDidUpdate() {
    const { events } = this.props;
    //current event is used to update the event ater a like has happened or comment
    const currentEvent = events.filter(
      (e) => e._id === this.state.eventDetail._id
    );

    if (currentEvent[0].shaka.length !== this.state.eventDetail.shaka.length) {
      this.setState({ eventDetail: currentEvent[0] });
    }
    if (this.props.comments.length !== this.state.comments.length) {
      this.setState({ comments: this.props.comments });
    }
  }

  render() {
    const { eventDetail, fetchingData } = this.state;
    const { user, onComment, onShaka, comments } = this.props;

    //loading screen
    if (fetchingData) {
      return (
        <div className="loading">
          <h1 className="call">Kook-Club!</h1>

          <img
            className="logo-loading"
            loading="lazy"
            src="images/kclogo2.jpeg"
            alt="logo"
          />
          <CircleLoader />
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

    //this filters the comments for only the ones for this specific event
    const eventComments = this.state.comments.filter(
      (elem) => elem.eventId === this.state.eventDetail._id
    );
    return (
      <div className="event-detail">
        <h2>{eventDetail.name}</h2>
        {eventDetail.image && (
          <img className="eventPic1" src={eventDetail.image} alt="sess pic" />
        )}
        <div className="shaka">
          <h4>Spred some love! </h4>
        </div>
        <div className="shaka">
          <ShakeRotate>
            <div>
              <img
                onClick={() => onShaka(eventDetail)}
                src="/images/shaka.jpeg"
              />
            </div>
          </ShakeRotate>

          <h5>Shaka Count: {eventDetail.shaka.length}</h5>
        </div>
        <h3>Description:</h3>
        <h6 className="desc">{eventDetail.description}</h6>
        <h3>Location:</h3>
        <h6>{eventDetail.location}</h6>
        <h3>Date:</h3>
        <h6>{eventDetail.date}</h6>
        <h3>Comments:</h3>
        {eventComments.map((elem) => {
          return (
            <div>
              <div className="comments">
                <div>
                  <h5 className="owner">{elem.owner.name}:</h5>
                </div>
                <div>
                  <h6>{elem.comment}</h6>
                </div>
              </div>
            </div>
          );
        })}
        <form onSubmit={(e) => onComment(e, eventDetail._id)}>
          <input name="comment" type="text" placeholder="comment" />
          <button type="submit" class="btn btn-info">
            Add Comment
          </button>
        </form>
      </div>
    );
  }
}
export default EventDetail;
