import axios from "axios";
import { React, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import MyNav from "./components/MyNav";
import EventList from "./components/EventList";
import EventDetail from "./components/EventDetail";
import AddEvent from "./components/AddEvent";
import EditEvent from "./components/EditEvent";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Avatar from "./components/Avatar";
import Profile from "./components/Profile";
import CircleLoader from "./components/CircleLoader";
import NotFound from "./components/NotFound";
import API_URL from "./components/config";

function App() {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [fetchingUser, setFetchingUser] = useState(true);
  const [comments, setComments] = useState([]);

  const navigate = useNavigate();

  // useEffect for the mounting of the project, handles all the get requests for initial data
  useEffect(() => {
    //get request for events
    axios
      .get(`${API_URL}/api/events`, {
        withCredentials: true,
      })
      .then((response) => {
        setEvents(response.data);
        setFetchingUser(false);
      })
      .catch((errorObj) => {
        console.log("promise failed, to get the events");
        setError(errorObj.data);
        setFetchingUser(false);
      });

    //get request for user
    axios
      .get(`${API_URL}/api/user`, {
        withCredentials: true,
      })
      .then((response) => {
        setUser(response.data);
        setFetchingUser(false);
      })
      .catch((errorObj) => {
        setError(errorObj.data);
        setFetchingUser(false);
      });

    //get request for comments
    axios
      .get(`${API_URL}/api/comments`, {
        withCredentials: true,
      })
      .then((response) => {
        setComments(response.data);
        setFetchingUser(false);
      })
      .catch((errorObj) => {
        setError(errorObj.data);
        setFetchingUser(false);
      });
  }, []);

  //log out pass an empty object as second parameter so it doesn't send the with credentials... as the object
  const handleLogout = (e) => {
    axios
      .post(`${API_URL}/api/logout`, {}, { withCredentials: true })
      .then(() => {
        setUser(null);
        navigate("/");
      })
      .catch((errorObj) => {
        setError(errorObj.response.data);
      });
  };

  //signing up function
  const handleSignUp = (e) => {
    e.preventDefault();
    let { username, password, email } = e.target;
    let newUser = {
      username: username.value,
      email: email.value,
      password: password.value,
    };
    axios
      .post(`${API_URL}/api/signup`, newUser, {
        withCredentials: true,
      })
      .then((response) => {
        setUser(response.data);
        navigate("/signin");
      })
      .catch((errorObj) => {
        setError(errorObj.response.data);
      });
  };

  //signing in function
  const handleSignIn = (e) => {
    e.preventDefault();
    let { email, password } = e.target;
    let newUser = {
      email: email.value,
      password: password.value,
    };
    axios
      .post(`${API_URL}/api/signin`, newUser, {
        withCredentials: true,
      })
      .then((response) => {
        setUser(response.data);
        setError(null);
        navigate("/");
      })
      .catch((error) => {
        setError(error.response.data);
        console.log("signin failed");
      });
  };

  //this creates a new event
  const handleAdd = async (e) => {
    e.preventDefault();

    let image = e.target.eventImage.files[0];
    let formData = new FormData();
    formData.append("imageUrl", image);

    try{
    let uploadResponse = await axios.post(`${API_URL}/api/upload`, formData)
    if(uploadResponse.data.image){
      let eventWithImage = await axios.post(
        `${API_URL}/api/create`,
        {
          name: e.target.name.value,
          image: uploadResponse.data.image,
          description: e.target.description.value,
          date: e.target.date.value,
          location: e.target.location.value,
        },
        {
          withCredentials: true,
        }
      );
      setEvents([...events,eventWithImage])
    }else{
      let eventWithOutImage =await axios.post(
          `${API_URL}/api/create`,
          {
            name: e.target.name.value,
            description: e.target.description.value,
            date: e.target.date.value,
            location: e.target.location.value,
          },
          {
            withCredentials: true,
          }
        )
        setEvents([...events,eventWithOutImage])
          navigate("/")
      }
    }
      catch(err){
        setError(err);
        console.log("upload failed", err);
      }
  };

  //this adds a comment to the db
  const handleComment = (e, eventId) => {
    e.preventDefault();
    let { comment } = e.target;

    axios
      .post(
        `${API_URL}/api/comment/${eventId}/create`,
        { comment: comment.value },

        {
          withCredentials: true,
        }
      )
      .then((response) => {
        //always with axios, the real data is in the data key word
        console.log("comment sucess!");

        // never modify the state except with setState, clone it,then add comment then set state
        const clonedComments = JSON.parse(JSON.stringify(this.state.comments));
        clonedComments.push(response.data);
        setComments(clonedComments);
        navigate(`/event/${eventId}`);
      })
      .catch((errorObj) => {
        console.log("comment upload failed");
        setError(errorObj.response.data);
      });
  };

  //deletes events in db
  const handleDelete = (eventId) => {
    //delete from the DB
    //delete from the state
    axios
      .delete(`${API_URL}/api/profile/${eventId}`, {
        withCredentials: true,
      })
      .then(() => {
        let filteredEvents = this.state.events.filter((event) => {
          return event._id !== eventId;
        });
        setEvents(filteredEvents);
        navigate("/");
      })
      .catch(() => {
        console.log("delete failed");
      });
  };

  //handling the edit items
  const handleEdit = (eventDetail) => {
    axios
      .patch(`${API_URL}/api/event/${eventDetail._id}`, eventDetail, {
        withCredentials: true,
      })
      .then(() => {
        //update the local state after updating the Db
        let updatedEvents = this.state.events.map((event) => {
          if (event._id === eventDetail._id) {
            event.name = eventDetail.name;
            event.description = eventDetail.description;
            event.location = eventDetail.location;
            event.date = eventDetail.date;
          }
          return event;
        });
        setEvents(updatedEvents);
        navigate("/");
      })
      .catch((errorObj) => {
        console.log("Error editing event", errorObj);
      });
  };

  //handles the avatar photo
  const handleAvatar = (e, userId) => {
    e.preventDefault();

    let avatar = e.target.avatar.files[0];
    let formData = new FormData();
    formData.append("imageUrl", avatar);

    axios
      .patch(`${API_URL}/api/avatar/${userId}`, formData, {
        withCredentials: true,
      })
      .then((response) => {
        setUser(response.data);
        navigate("/");
      })
      .catch(() => {
        console.log("avatar upload failed");
      });
  };

  //handle the shakas (likes)
  const handleShaka = (eventDetail) => {
    axios
      .patch(`${API_URL}/api/event/${eventDetail._id}/shaka`, eventDetail, {
        withCredentials: true,
      })
      .then((response) => {
        // check to see if the id of the events from this state = the id from the event detail with the like
        //if the id's match then return the event from response (this is for only one like per user)
        //bc if the ids are the same then it returns the event from this.state, but if
        let updatedEvents = events.map((event) => {
          if (event._id === eventDetail._id) {
            return response.data;
          }
          return event;
        });
        setEvents(updatedEvents);
      })
      .catch((errorObj) => {
        setError(errorObj.response.data);
      });
  };

  // destructor state first
  // const { events, error, user, fetchingUser, comments } = this.state;

  //loading screen
  if (fetchingUser) {
    return (
      <div className="loading">
        <h1 className="call">Kook-Club!</h1>

        <img
          className="logo-loading"
          loading="lazy"
          src="images/kclogo2.jpeg"
          alt="logo"
        />
        <CircleLoader />
      </div>
    );
  }

  //nav bar at top in orange
  return (
    <div>
      <div className="mynav">
        <div>
          <img
            className="logo"
            loading="lazy"
            src="images/kclogo2.jpeg"
            alt="logo"
          />
        </div>
        <div>
          <h1 className="call">Kook-Club!</h1>
        </div>
        <div>
          {user?.avatar ? (
            <img
              className="avatar"
              loading="lazy"
              src={user.avatar}
              alt="avatar"
            />
          ) : (
            <img
              className="avatar"
              loading="lazy"
              src="/images/no-avatar-300x300.png"
              alt="No Avatar"
            />
          )}
        </div>
      </div>

      <div>
        <MyNav onLogout={handleLogout} user={user} />
      </div>

      {/* all routes  */}
      <Routes>
        <Route
          exact
          path="/"
          element={<EventList user={user} events={events} />}
        />
        <Route
          exact
          path="/event/:eventId"
          element={
            <EventDetail
              events={events}
              user={user}
              onShaka={handleShaka}
              comments={comments}
              onComment={handleComment}
            />
          }
        />
        <Route
          path="/event/:eventId"
          element={<EditEvent onEdit={handleEdit} />}
        />

        <Route
          path="/add-event"
          element={<AddEvent user={user} onAdd={handleAdd} />}
        />
        <Route
          path="/signin"
          element={<SignIn error={error} onSignIn={handleSignIn} />}
        />
        <Route path="/signup" element={<SignUp onSubmit={handleSignUp} />} />

        <Route
          exact
          path="/avatar"
          element={<Avatar user={user} onAvatar={handleAvatar} />}
        />
        <Route
          path="/profile"
          element={
            <Profile
              events={events}
              error={error}
              user={user}
              comments={comments}
              onComment={handleComment}
              onDelete={handleDelete}
            />
          }
        />
        <Route element={NotFound} />
      </Routes>
    </div>
  );
}

// heroku url for env file https://kook-club.herokuapp.com
// url for local testing and development  http://localhost:5005
export default App;
