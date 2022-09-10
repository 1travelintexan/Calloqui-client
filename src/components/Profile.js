import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AllContext } from "../context/allContext";

function Profile({ events, user, onDelete }) {
  const { getUser, fetchingUser } = useContext(AllContext);

  useEffect(() => {
    const getProfileInfo = async () => {
      try {
        await getUser();
      } catch (err) {
        console.log("error in profile page", err);
      }
    };
    getProfileInfo();
  }, [getUser]);

  if (fetchingUser) {
    return (
      <div className="loading">
        <h1> loading...</h1>
      </div>
    );
  }
  return (
    <div className="margin-bottom">
      <h1 className="upcoming-events">Welcome {user.name}!</h1>
      <h2 className="event-detail">List of your events:</h2>
      <div className="events-list">
        {events
          .filter((e) => e.owner === user._id)
          .map((e) => {
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
    </div>
  );
}
export default Profile;
