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

  useEffect(() => {
    const getEventsAndComments = async () => {
      try {
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
    getEventsAndComments();
  }, []);

  const getUser = async () => {
    try {
      let userDB = await axios.get(`${API_URL}/api/user`, {
        withCredentials: true,
      });
      setUser(userDB.data);
      setFetchingUser(false);
    } catch (err) {
      console.log("There was an error getting your user", err);
      setError(err.data);
      setFetchingUser(false);
    }
  };

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
        getUser,
      }}
    >
      {props.children}
    </AllContext.Provider>
  );
}

export { AllContextWrapper, AllContext };
