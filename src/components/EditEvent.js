import { Button } from "react-bootstrap";
import axios from "axios";
import API_URL from "./config";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function EditEvent({ onEdit }) {
  const [eventDetail, setEventDetail] = useState({});
  const { eventId } = useParams();
  useEffect(() => {
    const getEventToEdit = async () => {
      const eventToEdit = await axios.get(`${API_URL}/api/event/${eventId}`);
      setEventDetail(eventToEdit.data);
    };
    getEventToEdit();
  }, [eventId]);

  const handleEdit = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setEventDetail({ ...eventDetail, [name]: value });
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
            onChange={handleEdit}
            type="text"
            name="name"
            value={eventDetail.name}
          />
        </div>
        <div>
          <label>Event Date:</label>
          <input
            onChange={handleEdit}
            type="date"
            name="date"
            value={eventDetail.date}
          />
        </div>
        <div>
          <label>Event Location:</label>
          <input
            onChange={handleEdit}
            type="text"
            name="location"
            value={eventDetail.location}
          />
        </div>
        <div>
          <label>Event Description:</label>
          <textarea
            rows="2"
            cols="40"
            name="description"
            onChange={handleEdit}
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
