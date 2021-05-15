import React, { Component } from "react";
import { Link } from "react-router-dom";

class EventList extends Component {
  render() {
    //destructor props coming from app.js state
    const { events } = this.props;
    return (
      <div className="events-list">
        <h1 className="upcoming-events">Upcoming Events:</h1>
        {events.map((event) => {
          return (
            <div className="event-list">
              <div key={event._id}>
                <Link className="event-name" to={`/event/${event._id}`}>
                  <h2>{event.name}</h2>
                </Link>
              </div>
              <img className="eventPic" src={event.image} alt="sess pic" />
            </div>
          );
        })}
      </div>
    );
  }
}
export default EventList;
