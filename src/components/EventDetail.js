import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import config from "./config";
import CircleLoader from "../components/CircleLoader";

class EventDetail extends Component {
  state = {
    eventDetail: null,
    fetchingData: true,
    comments: [],
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
        console.log("edit promise sucess");
        //console.log(response[0].value.data);
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

    //loading screen
    if (fetchingData) {
      return (
        <div className="loading">
          <h1 className="call">Kook-Club!</h1>
          <CircleLoader />
          <h2 className="alone"> Never Surf Alone!</h2>
          <img
            className="logo-loading"
            loading="lazy"
            src="./kclogo2.jpeg"
            alt="logo"
          />
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

    const eventComments = comments.filter(
      (elem) => elem.eventId === eventDetail._id
    );

    return (
      <div className="event-detail">
        <h2>{eventDetail.name}</h2>

        {eventDetail.image && (
          <img className="eventPic" src={eventDetail.image} alt="sess pic" />
        )}
        <div className="shaka">
          <h4>Spred some love! </h4>
          <img src="/images/shaka.jpeg" />
          <h5>Shaka Count: 0</h5>
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
                  <p>{elem.comment}</p>
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
