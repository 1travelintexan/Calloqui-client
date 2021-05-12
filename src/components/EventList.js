import React, { Component } from "react";
import { Link } from "react-router-dom";

class EventList extends Component {
  render() {
    //destructor props coming from app.js state
    const { events } = this.props;
    return (
      <div>
        <h2> Event list:</h2>
        {events.map((event) => {
          return (
            <div key={event._id}>
              <Link to={`/event/${event._id}`}>{event.name}</Link>
            </div>
          );
        })}
      </div>
    );
  }
}
export default EventList;
