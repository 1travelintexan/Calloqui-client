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
import { Helmet } from "react-helmet";
import NotFound from "./components/NotFound";

class App extends Component {
  state = {
    events: [],
    user: null,
    error: null,
    fetchingUser: true,
    comments: [],
    avatars: [],
  };

  //log out pass an empty objext as second parameter so it doesnt send the withcred... as the object
  handleLogout = (e) => {
    axios
      .post(`${config.API_URL}/api/logout`, {}, { withCredentials: true })
      .then((response) => {
        this.setState({
          user: null,
        });
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
    console.log(newUser);
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

  componentDidMount = () => {
    axios
      .get(`${config.API_URL}/api/events`, { withCredentials: true })
      .then((response) => {
        this.setState({ events: response.data });
      })
      .catch(() => {
        console.log("did not mount");
      });
    axios
      .get(`${config.API_URL}/api/events`, { withCredentials: true })
      .then((response) => {
        this.setState({ user: response.data, fetchingUser: false });
      })
      .catch((errorObj) => {
        this.setState({ error: errorObj.response.data, fetchingUser: false });
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
    console.log(comment.value);

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
        this.setState(
          {
            comments: response.data,
          },
          () => {
            this.props.history.push("/event/:eventId");
          }
        );
      })
      .catch((errorObj) => {
        this.setState({
          error: errorObj.response.data,
        });
      });
  };

  //deletes events in db
  handleDelete = (eventDetail) => {
    //delete from the DB
    //delete from the state
    axios
      .delete(`${config.API_URL}/api/events/${eventDetail._id}`, {
        withCredentials: true,
      })
      .then(() => {
        let filteredEvents = this.state.events.filter((event) => {
          return event._id !== eventDetail._id;
        });
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
      .patch(`${config.API_URL}/api/events/${eventDetail._id}`, eventDetail, {
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
  handleAvatar = (e) => {
    e.preventDefault();

    let image = e.target.eventImage.files[0];
    let formData = new FormData();
    formData.append("imageUrl", image);

    axios
      .post(`${config.API_URL}/api/upload/avatar`, formData, {
        withCredentials: true,
      })
      .then((response) => {
        this.setState(
          {
            avatars: [response.data, ...this.state.avatars],
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

  render() {
    // destructor state first
    const { events, error, user, fetchingUser, comments } = this.state;

    if (fetchingUser) {
      return <h2 className="alone"> Never Surf Alone!</h2>;
    }
    return (
      <div className="body">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Kook-Club!</title>
        </Helmet>
        <div className="mynav">
          <img
            className="logo"
            loading="lazy"
            src="./kclogo2.jpeg"
            alt="logo"
          />
          <h1 className="call">Kook-Club!</h1>
          <img
            className="avatar"
            loading="lazy"
            src="./avatar.jpg"
            alt="avatar"
          />
        </div>
        <div>
          <MyNav onLogout={this.handleLogout} user={user} />
        </div>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return <EventList events={events} />;
            }}
          />
          <Route
            exact
            path="/event/:eventId"
            render={(routeProps) => {
              return (
                <EventDetail
                  user={user}
                  comments={comments}
                  onComment={this.handleComment}
                  onDelete={this.handleDelete}
                  {...routeProps}
                />
              );
            }}
          />
          <Route
            path="/event/:eventId/edit"
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
            path="/upload/avatar"
            render={() => {
              return <Avatar user={user} onAvatar={this.handleAvatar} />;
            }}
          />
          <Route
            path="/profile"
            render={(routeProps) => {
              return <Profile error={error} user={user} {...routeProps} />;
            }}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}
export default withRouter(App);
