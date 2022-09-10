import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
function EventList({ events }) {
  return (
    <div className="events-list">
      <h1 className="upcoming-events">Upcoming Events:</h1>
      {events &&
        events.map((event) => {
          return (
            <div key={uuidv4()}>
              <div>
                <Link className="event-name" to={`/event/${event._id}`}>
                  <h4>{event.name}</h4>
                </Link>
              </div>
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
export default EventList;
