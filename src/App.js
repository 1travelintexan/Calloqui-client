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
import { API_URL } from "./components/config";
import Friends from "./components/Friends";
import FriendProfile from "./components/FriendProfile";
import Footer from "./components/Footer";
import ChatPage from "./components/ChatPage";

function App() {
  const navigate = useNavigate();
  const { user, events, setError, setEvents, setUser, error, setFetchingUser } =
    useContext(AllContext);

  const handleLogout = async (e) => {
    try {
      await axios.post(
        `${API_URL.SERVER_URL}/api/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log("There was an error logging out", err);
      setError(err.response.data);
    }
  };

  //signing up function
  const handleSignUp = async (e) => {
    e.preventDefault();
    let { username, password, email } = e.target;
    let newUser = {
      username: username.value,
      email: email.value,
      password: password.value,
    };
    try {
      await axios.post(`${API_URL.SERVER_URL}/api/signup`, newUser, {
        withCredentials: true,
      });

      navigate("/login");
    } catch (err) {
      console.log("There was an error signing up", err);
      setError(err.response.data);
    }
  };

  //signing in function
  const handleLogin = async (e) => {
    e.preventDefault();
    let { email, password } = e.target;
    let newUser = {
      email: email.value,
      password: password.value,
    };
    try {
      let loggedInUser = await axios.post(
        `${API_URL.SERVER_URL}/api/signin`,
        newUser,
        {
          withCredentials: true,
        }
      );
      setUser(loggedInUser.data);
      setError(null);
      setFetchingUser(false);
      navigate("/profile");
    } catch (err) {
      console.log(err.response.data.error);
      setError(err.response.data.error);
    }
  };

  //this creates a new event
  const handleAdd = async (e) => {
    //openweathermap api to get the lon and lat of a given city
    const API_KEY = process.env.REACT_APP_WEATHER_API;
    e.preventDefault();
    let image = e.target.eventImage.files[0];
    let formData = new FormData();
    formData.append("imageUrl", image);

    //city name for lon and lat api
    let city = e.target.location.value;
    try {
      let coordinates = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
      );
      let location = {
        city,
        lat: coordinates.data[0].lat,
        lon: coordinates.data[0].lon,
      };

      let uploadResponse = await axios.post(
        `${API_URL.SERVER_URL}/api/upload`,
        formData
      );
      if (uploadResponse.data.image) {
        let eventWithImage = await axios.post(
          `${API_URL.SERVER_URL}/api/create`,
          {
            name: e.target.name.value,
            image: uploadResponse.data.image,
            description: e.target.description.value,
            date: e.target.date.value,
            location,
          },
          {
            withCredentials: true,
          }
        );
        setEvents([...events, eventWithImage.data]);
        navigate("/");
      } else {
        console.log("event without image");
        let eventWithOutImage = await axios.post(
          `${API_URL.SERVER_URL}/api/create`,
          {
            name: e.target.name.value,
            description: e.target.description.value,
            date: e.target.date.value,
            location,
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
      console.log("upload failed", err.message);
    }
  };

  //deletes events in db
  const handleDelete = async (eventId) => {
    await axios
      .delete(`${API_URL.SERVER_URL}/api/profile/${eventId}`, {
        withCredentials: true,
      })
      .then(() => {
        let filteredEvents = events.filter((e) => e._id !== eventId);
        setEvents(filteredEvents);
        navigate("/profile");
      })
      .catch((err) => {
        console.log("delete EVENT failed", err);
      });
  };

  //handling the edit items
  const handleEdit = async (eventDetail) => {
    try {
      let editedEvent = await axios.patch(
        `${API_URL.SERVER_URL}/api/event/${eventDetail._id}`,
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
  const handleAvatar = async (e, userId) => {
    console.log(e, userId);
    e.preventDefault();

    let avatar = e.target.avatar.files[0];
    let formData = new FormData();
    formData.append("imageUrl", avatar);

    axios
      .post(`${API_URL.SERVER_URL}/api/avatar/${userId}`, formData, {
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
  const handleShaka = async (eventDetail) => {
    axios
      .patch(
        `${API_URL.SERVER_URL}/api/event/${eventDetail._id}/shaka`,
        eventDetail,
        {
          withCredentials: true,
        }
      )
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
      <Routes>
        <Route path="/" element={<EventList user={user} events={events} />} />
        <Route
          path="/event/:eventId"
          element={
            <EventDetail events={events} user={user} onShaka={handleShaka} />
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
          path="/login"
          element={<SignIn error={error} onSignIn={handleLogin} />}
        />
        <Route path="/signup" element={<SignUp onSubmit={handleSignUp} />} />

        <Route
          path="/avatar"
          element={<Avatar user={user} onAvatar={handleAvatar} />}
        />
        <Route path="/profile" element={<Profile onDelete={handleDelete} />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/friend/:friendId" element={<FriendProfile />} />
        <Route path="/chat/:chatId" element={<ChatPage user={user} />} />
        <Route path="/*" element={NotFound} />
      </Routes>
      <Footer />
    </div>
  );
}

// url for local testing and development  http://localhost:5005
export default App;
