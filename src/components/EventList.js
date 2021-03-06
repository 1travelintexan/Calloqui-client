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
            <div>
              <div key={event._id}>
                <Link className="event-name" to={`/event/${event._id}`}>
                  <h4>{event.name}</h4>
                </Link>
              </div>
              {/* <div className="row-above-event" key={event._id}>
                <img className="small-avatar" src={event.owner.avatar} />
                <h6>{event.owner.name}</h6>
              </div> */}
              <Link to={`/event/${event._id}`}>
                <img
                  className="eventPic-list"
                  src={event.image}
                  alt="sess pic"
                />
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}
export default EventList;
