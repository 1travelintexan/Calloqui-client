import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AllContext } from "../context/allContext";
import Spinner from "react-bootstrap/Spinner";

function Profile({ onDelete }) {
  const { fetchingUser, user, events } = useContext(AllContext);
  const [userEvents, setUserEvents] = useState([]);
  useEffect(() => {
    const filterEvents = () => {
      const filteredEvents = events.filter((e) => e.owner === user._id);
      setUserEvents(filteredEvents);
      console.log("users events", filteredEvents, events);
    };
    if (events && user) {
      filterEvents();
    }
  }, [events, user]);
  if (fetchingUser || !user) {
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
  console.log("events from profile", events, user);
  return (
    <main>
      <h1 className="upcoming-events">Welcome {user.name}!</h1>
      <h2 className="event-detail">List of your events:</h2>
      <div className="events-list">
        {userEvents.length &&
          userEvents.map((e) => {
            return (
              <div key={e._id}>
                <div className="event-list">
                  <div>
                    <Link className="event-name" to={`/event/${e._id}`}>
                      <h2>{e.name}</h2>
                    </Link>
                  </div>
                  <Link to={`/event/${e._id}`}>
                    <img className="eventPic" src={e.image} alt="sess pic" />
                  </Link>
                </div>
                <div className="edit-button">
                  <div className="link">
                    <Link className="link1" to={`/event/${e._id}/edit`}>
                      Edit
                    </Link>
                  </div>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      onDelete(e._id);
                    }}
                  >
                    Delete Event
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </main>
  );
}
export default Profile;
