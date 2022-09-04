import { Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../components/config";
import { useEffect, useState } from "react";



function Profile({ events, user, onDelete }) {
  const [fetchingUser, setFetchingUser] = useState(true);
  const [ profileEvents, setProfileEvents ] = useState([]);

  useEffect(() => {
    const getProfileInfo = async ()=>{
      try{
        let profileResponseDB = await axios.get(`${API_URL}/api/profile`)
        let filteredEvents = profileResponseDB.data.filter(e => e.owner=== user._id)
        setProfileEvents(filteredEvents);
        setFetchingUser(false);
      }
      catch(err){
        console.log('error in profile page', err)
      }
    }
    getProfileInfo()
  }, [user._id]);

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
        {profileEvents.map((e) => {
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
