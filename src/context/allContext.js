import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";
const AllContext = createContext();

function AllContextWrapper(props) {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [comments, setComments] = useState([]);
  const [fetchingUser, setFetchingUser] = useState(true);
  const [error, setError] = useState(null);

  const getEventsAndComments = async () => {
    try {
      let userDB = await axios.get(`${API_URL}/api/user`, {
        withCredentials: true,
      });
      setUser(userDB.data);
      setFetchingUser(false);
      let eventsDB = await axios.get(`${API_URL}/api/events`, {
        withCredentials: true,
      });
      setEvents(eventsDB.data);
      let commentsDB = await axios.get(`${API_URL}/api/comments`, {
        withCredentials: true,
      });
      setComments(commentsDB.data);
    } catch (err) {
      console.log("There was an error getting your events", err);
      setError(err.data);
      setFetchingUser(false);
    }
  };
  useEffect(() => {
    getEventsAndComments();
  }, []);

  return (
    <AllContext.Provider
      value={{
        user,
        events,
        comments,
        fetchingUser,
        error,
        setComments,
        setError,
        setEvents,
        setFetchingUser,
        setUser,
        getEventsAndComments,
      }}
    >
      {props.children}
    </AllContext.Provider>
  );
}

export { AllContextWrapper, AllContext };
