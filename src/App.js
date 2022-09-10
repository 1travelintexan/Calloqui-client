import axios from "axios";
import { React, useContext } from "react";
import { AllContext } from "./context/allContext";
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
import NotFound from "./components/NotFound";
import API_URL from "./components/config";
import Friends from "./components/Friends";
import FriendProfile from "./components/FriendProfile";

function App() {
  const navigate = useNavigate();
  const {
    user,
    comments,
    events,
    setComments,
    setError,
    setEvents,
    setUser,
    error,
    setFetchingUser,
  } = useContext(AllContext);

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
        setFetchingUser(false);
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

    try {
      let uploadResponse = await axios.post(`${API_URL}/api/upload`, formData);
      if (uploadResponse.data.image) {
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
        setEvents([...events, eventWithImage.data]);
        navigate("/");
      } else {
        let eventWithOutImage = await axios.post(
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
        );
        setEvents([...events, eventWithOutImage.data]);
        navigate("/");
      }
    } catch (err) {
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
  const handleDelete = async (eventId) => {
    //delete from the DB
    //delete from the state
    await axios
      .delete(`${API_URL}/api/profile/${eventId}`, {
        withCredentials: true,
      })
      .then(() => {
        let filteredEvents = events.filter((e) => e._id !== eventId);
        setEvents(filteredEvents);
        navigate("/profile");
      })
      .catch((err) => {
        console.log("delete failed", err);
      });
  };

  //handling the edit items
  const handleEdit = async (eventDetail) => {
    try {
      let editedEvent = await axios.patch(
        `${API_URL}/api/event/${eventDetail._id}`,
        eventDetail,
        {
          withCredentials: true,
        }
      );
      setEvents([...events, editedEvent]);
      navigate("/profile");
    } catch (err) {
      console.log("Error editing event", err);
    }
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
          <h1 className="call">KOOK CLUB</h1>
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
          path="/event/:eventId/edit"
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
        <Route path="/profile" element={<Profile onDelete={handleDelete} />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/friend/:friendId" element={<FriendProfile />} />
        <Route element={NotFound} />
      </Routes>
    </div>
  );
}

// heroku url for env file https://kook-club.herokuapp.com
// url for local testing and development  http://localhost:5005
export default App;
