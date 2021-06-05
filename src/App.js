import axios from "axios";
import { React, Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import MyNav from "./components/MyNav";
import EventList from "./components/EventList";
import EventDetail from "./components/EventDetail";
import AddEvent from "./components/AddEvent";
import EditEvent from "./components/EditEvent";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Avatar from "./components/Avatar";
import Profile from "./components/Profile";
import config from "./components/config";
import CircleLoader from "./components/CircleLoader";
import { Helmet } from "react-helmet";
import NotFound from "./components/NotFound";

class App extends Component {
  state = {
    events: [],
    user: null,
    error: null,
    fetchingUser: true,
    comments: [],
  };

  //log out pass an empty objext as second parameter so it doesnt send the withcred... as the object
  handleLogout = (e) => {
    axios
      .post(`${config.API_URL}/api/logout`, {}, { withCredentials: true })
      .then((response) => {
        this.setState(
          {
            user: null,
          },
          () => {
            this.props.history.push(`/`);
          }
        );
      })
      .catch((errorObj) => {
        this.setState({
          error: errorObj.response.data,
        });
      });
  };

  //signing up function
  handleSignUp = (e) => {
    e.preventDefault();
    let { username, password, email } = e.target;
    let newUser = {
      username: username.value,
      email: email.value,
      password: password.value,
    };
    axios
      .post(`${config.API_URL}/api/signup`, newUser, { withCredentials: true })
      .then((response) => {
        //always with axios, the real data is in the data key word
        this.setState(
          {
            user: response.data,
          },
          () => {
            this.props.history.push("/");
          }
        );
      })
      .catch((errorObj) => {
        this.setState({
          error: errorObj.response.data,
        });
      });
  };

  //signing in function
  handleSignIn = (e) => {
    e.preventDefault();
    let { email, password } = e.target;
    let newUser = {
      email: email.value,
      password: password.value,
    };
    axios
      .post(`${config.API_URL}/api/signin`, newUser, { withCredentials: true })
      .then((response) => {
        //always with axios, the real data is in the data key word
        this.setState(
          {
            user: response.data,
            error: null,
          },
          () => {
            this.props.history.push("/");
          }
        );
        console.log("signin sucessful");
      })
      .catch((errorObj) => {
        this.setState({
          error: errorObj.response.data,
        });
        console.log("signin failed");
      });
  };

  // NEED TO UPDATE THE STRUCTURE TO HAVE A SINGLE SET STATE FOR ONE GET
  componentDidMount = () => {
    //get request for events
    axios
      .get(`${config.API_URL}/api/events`, {
        withCredentials: true,
      })
      .then((response) => {
        this.setState({
          events: response.data,
          fetchingUser: false,
        });
        console.log(response.data);
      })
      .catch((errorObj) => {
        console.log("promise failed, to get the events");
        this.setState({ error: errorObj.data, fetchingUser: false });
      });

    //get request for user
    axios
      .get(`${config.API_URL}/api/user`, {
        withCredentials: true,
      })
      .then((response) => {
        this.setState({
          user: response.data,
          fetchingUser: false,
        });
        console.log(response.data);
      })
      .catch((errorObj) => {
        console.log("promise failed, to get the user");
        this.setState({ error: errorObj.data, fetchingUser: false });
      });

    //get request for comments
    axios
      .get(`${config.API_URL}/api/comments`, {
        withCredentials: true,
      })
      .then((response) => {
        this.setState({
          comments: response.data,
          fetchingUser: false,
        });
        console.log(response.data);
      })
      .catch((errorObj) => {
        console.log("promise failed, to get the comments");
        this.setState({ error: errorObj.data, fetchingUser: false });
      });
  };

  //this updtes the DB and state
  handleAdd = (e) => {
    e.preventDefault();

    let image = e.target.eventImage.files[0];
    let formData = new FormData();
    formData.append("imageUrl", image);

    axios
      .post(`${config.API_URL}/api/upload`, formData)
      .then((response) => {
        return axios.post(
          `${config.API_URL}/api/create`,
          {
            name: e.target.name.value,
            image: response.data.image,
            description: e.target.description.value,
            date: e.target.date.value,
            location: e.target.location.value,
          },
          {
            withCredentials: true,
          }
        );
      })
      .then((response) => {
        this.setState(
          {
            events: [response.data, ...this.state.events],
          },
          () => {
            //redirect user after adding an event here
            this.props.history.push("/");
          }
        );
      })
      .catch(() => {
        console.log("upload failed");
      });
  };

  //this adds a comment to the db
  handleComment = (e, eventId) => {
    e.preventDefault();
    let { comment } = e.target;

    axios
      .post(
        `${config.API_URL}/api/comment/${eventId}/create`,
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
        this.setState(
          {
            comments: clonedComments,
          },
          () => {
            this.props.history.push(`/event/${eventId}`);
          }
        );
      })
      .catch((errorObj) => {
        console.log("comment failed");
        this.setState({
          error: errorObj.response.data,
        });
      });
  };

  //deletes events in db
  handleDelete = (eventId) => {
    console.log(`deleted: ${eventId}`);
    console.log(this.state.events);

    //delete from the DB
    //delete from the state
    axios
      .delete(`${config.API_URL}/api/profile/${eventId}`, {
        withCredentials: true,
      })
      .then(() => {
        let filteredEvents = this.state.events.filter((event) => {
          return event._id !== eventId;
        });
        console.log("delete sucessful");
        this.setState(
          {
            events: filteredEvents,
          },
          () => {
            this.props.history.push("/");
          }
        );
      })
      .catch(() => {
        console.log("delete failed");
      });
  };

  //handling the edit items
  handleEdit = (eventDetail) => {
    axios
      .patch(`${config.API_URL}/api/event/${eventDetail._id}`, eventDetail, {
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
        this.setState(
          {
            events: updatedEvents,
          },
          () => {
            this.props.history.push("/");
          }
        );
      })
      .catch((errorObj) => {});
  };

  //handles the avatar photo
  handleAvatar = (e, userId) => {
    e.preventDefault();

    let avatar = e.target.avatar.files[0];
    let formData = new FormData();
    formData.append("imageUrl", avatar);

    axios
      .patch(`${config.API_URL}/api/avatar/${userId}`, formData, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("avatar sucess");

        this.setState(
          {
            user: response.data,
          },
          () => {
            //redirect user after adding an event here
            this.props.history.push("/");
          }
        );
      })
      .catch(() => {
        console.log("avatar upload failed");
      });
  };

  //handle the shakas (likes)
  handleShaka = (eventDetail) => {
    axios
      .patch(
        `${config.API_URL}/api/event/${eventDetail._id}/shaka`,
        eventDetail,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        // check to see if the id of the events from this state = the id from the event detail with the like
        //if the id's match then return the event from response (this is for only one like per user)
        //bc if the ids are the same then it returns the event from this.state, but if
        let updatedEvents = this.state.events.map((event) => {
          if (event._id === eventDetail._id) {
            return response.data;
          }
          return event;
        });
        this.setState({
          events: updatedEvents,
        });
      })
      .catch((errorObj) => {
        this.setState({
          error: errorObj.response.data,
        });
      });
  };

  render() {
    // destructor state first
    const { events, error, user, fetchingUser, comments } = this.state;

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
        <Helmet>
          <meta charSet="utf-8" />
          <title>Kook-Club!</title>
        </Helmet>
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
          <MyNav onLogout={this.handleLogout} user={user} />
        </div>

        {/* all routes  */}
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return <EventList user={user} events={events} />;
            }}
          />
          <Route
            exact
            path="/event/:eventId"
            render={(routeProps) => {
              return (
                <EventDetail
                  events={events}
                  user={user}
                  onShaka={this.handleShaka}
                  comments={comments}
                  onComment={this.handleComment}
                  {...routeProps}
                />
              );
            }}
          />
          <Route
            path="/event/:eventId"
            render={(routeProps) => {
              return <EditEvent onEdit={this.handleEdit} {...routeProps} />;
            }}
          />

          <Route
            path="/add-event"
            render={() => {
              return <AddEvent user={user} onAdd={this.handleAdd} />;
            }}
          />
          <Route
            path="/signin"
            render={(routeProps) => {
              return (
                <SignIn
                  error={error}
                  onSignIn={this.handleSignIn}
                  {...routeProps}
                />
              );
            }}
          />
          <Route
            path="/signup"
            render={(routeProps) => {
              return <SignUp onSubmit={this.handleSignUp} {...routeProps} />;
            }}
          />

          <Route
            exact
            path="/avatar"
            render={() => {
              return <Avatar user={user} onAvatar={this.handleAvatar} />;
            }}
          />
          <Route
            path="/profile"
            render={(routeProps) => {
              return (
                <Profile
                  events={events}
                  error={error}
                  user={user}
                  comments={comments}
                  onComment={this.handleComment}
                  onDelete={this.handleDelete}
                  {...routeProps}
                />
              );
            }}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}
//always save these
// heroku url for env file https://kook-club.herokuapp.com
// url for local testing and development  http://localhost:5005
export default withRouter(App);
