import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_URL } from "./config";
import { ShakeRotate } from "reshake";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Spinner } from "react-bootstrap";
import MapComponent from "./MapComponent";

function EventDetail({ user, onComment, onShaka, events }) {
  const [eventDetail, setEventDetail] = useState(null);
  const [fetchingData, setFetchingData] = useState(true);
  const [comments, setComments] = useState(null);
  const { eventId } = useParams();

  useEffect(() => {
    //eventDetail get from axios
    const getEventDetail = async () => {
      try {
        let eventDetails = await axios.get(
          `${API_URL.SERVER_URL}/api/event/${eventId}`,
          {
            withCredentials: true,
          }
        );
        //comments api get
        let comments = await axios.get(`${API_URL.SERVER_URL}/api/comments`, {
          withCredentials: true,
        });
        let eventComments = comments.data.filter(
          (e) => e.eventId === eventDetails.data._id
        );

        setEventDetail(eventDetails.data);
        setComments(eventComments);
        setFetchingData(false);
      } catch (err) {
        console.log("there was an error getting the event details", err);
        setFetchingData(false);
      }
    };
    getEventDetail();
  }, [eventId, events]);

  if (fetchingData) {
    return (
      <div className="loading">
        <Spinner
          animation="grow"
          variant="warning"
          style={{ height: "200px", width: "200px" }}
        />
      </div>
    );
  }

  return (
    <div className="event-detail">
      <h2>{eventDetail.name}</h2>
      {eventDetail.image && (
        <img className="eventPic1" src={eventDetail.image} alt="sess pic" />
      )}
      <div className="shaka">
        <h4>Spread some love! </h4>
      </div>
      <div className="shaka">
        <ShakeRotate>
          <div>
            <img
              onClick={() => onShaka(eventDetail)}
              src="/images/shaka.jpeg"
              alt="shaka"
            />
          </div>
        </ShakeRotate>

        <h5>Shaka Count: {eventDetail.shaka.length}</h5>
      </div>
      <h3>Description:</h3>
      <h6 className="desc">{eventDetail.description}</h6>
      <h3>Location:</h3>
      <h6>{eventDetail.location.city}</h6>
      <MapComponent
        lat={eventDetail.location.lat}
        lon={eventDetail.location.lon}
      />
      <h3>Date:</h3>
      <h6>{eventDetail.date}</h6>
      <h3>Comments:</h3>
      {comments &&
        comments.map((elem) => {
          return (
            <div key={uuidv4()}>
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
        <button type="submit" className="btn btn-info">
          Add Comment
        </button>
      </form>
    </div>
  );
}

export default EventDetail;
