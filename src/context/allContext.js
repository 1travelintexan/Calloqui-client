import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../components/config";
const AllContext = createContext();

function AllContextWrapper(props) {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [fetchingUser, setFetchingUser] = useState(true);
  const [error, setError] = useState(null);

  const getEventsAndComments = async () => {
    try {
      let eventsDB = await axios.get(`${API_URL.SERVER_URL}/api/events`, {
        withCredentials: true,
      });
      console.log("events", eventsDB.data);
      setEvents(eventsDB.data);

      let userDB = await axios.get(`${API_URL.SERVER_URL}/api/user`, {
        withCredentials: true,
      });
      console.log("user context", userDB);
      setUser(userDB.data);
      setFetchingUser(false);
    } catch (err) {
      console.log("There was an error", err.response.data.message);
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
        fetchingUser,
        error,
        setError,
        setEvents,
        setFetchingUser,
        setUser,
      }}
    >
      {props.children}
    </AllContext.Provider>
  );
}

export { AllContextWrapper, AllContext };
