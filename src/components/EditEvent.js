import { Button } from "react-bootstrap";
import axios from "axios";
import config from "../components/config";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function EditEvent({ onEdit }) {
  const [eventDetail, setEventDetail] = useState({});
  const { eventId } = useParams();
  useEffect(() => {
    axios.get(`${config.API_URL}/api/event/${eventId}`).then((response) => {
      setEventDetail(response.data);
    });
  }, [eventId]);

  //update just the name of the event
  const handleNameChange = (event) => {
    let newName = event.target.value;
    // clone the object to update one specific part of it
    let clonedEventDetail = JSON.parse(JSON.stringify(eventDetail));

    clonedEventDetail.name = newName;
    setEventDetail(clonedEventDetail);
  };

  //update the event description
  const handleDescChange = (event) => {
    let newDesc = event.target.value;

    // clone the object to update one specific part of it
    let clonedEventDetail = JSON.parse(JSON.stringify(eventDetail));

    clonedEventDetail.description = newDesc;
    setEventDetail(clonedEventDetail);
  };

  //update the event date
  const handleDateChange = (event) => {
    let newDate = event.target.value;

    // clone the object to update one specific part of it
    let clonedEventDetail = JSON.parse(JSON.stringify(eventDetail));
    clonedEventDetail.date = newDate;
    setEventDetail(clonedEventDetail);
  };

  //update the event location
  const handleLocationChange = (event) => {
    let newLocation = event.target.value;

    // clone the object to update one specific part of it
    let clonedEventDetail = JSON.parse(JSON.stringify(eventDetail));

    clonedEventDetail.location = newLocation;

    setEventDetail(clonedEventDetail);
  };

  return (
    <div className="add-event-page">
      <div className="add-event">
        <div>
          <h2>Edit your Event: </h2>
        </div>
        <div>
          <label>Event Name:</label>
          <input
            onChange={handleNameChange}
            type="text"
            value={eventDetail.name}
          />
        </div>
        <div>
          <label>Event Date:</label>
          <input
            onChange={handleDateChange}
            type="date"
            value={eventDetail.date}
          />
        </div>
        <div>
          <label>Event Location:</label>
          <input
            onChange={handleLocationChange}
            type="text"
            value={eventDetail.location}
          />
        </div>
        <div>
          <label>Event Description:</label>
          <textarea
            rows="2"
            cols="40"
            onChange={handleDescChange}
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
export default EditEvent;
