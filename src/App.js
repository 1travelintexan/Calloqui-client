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
import config from "./components/config";

class App extends Component {
  state = {
    events: [],
    user: null,
    error: null,
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
      .post(`${config.API_URL}/api/signup`, newUser)
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
      .post(`${config.API_URL}/api/signin`, newUser)
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
    axios.get(`${config.API_URL}/api/events`).then((response) => {
      this.setState({ events: response.data });
    });
  };

  //this updtes the DB and state
  handleAdd = (e) => {
    e.preventDefault();

    let newEvent = {
      name: e.target.name.value,
      description: e.target.description.value,
      date: e.target.date.value,
      location: e.target.location.value,
    };

    axios
      .post(`${config.API_URL}/api/create`, newEvent)
      .then(() => {
        this.setState(
          {
            events: [newEvent, ...this.state.events],
          },
          () => {
            //redirect user after adding an event here
            this.props.history.push("/");
          }
        );
      })
      .catch(() => {
        console.log("add event failed");
      });
  };

  //deletes events in db
  handleDelete = (eventDetail) => {
    //delete from the DB
    //delete from the state
    axios
      .delete(`${config.API_URL}/api/events/${eventDetail._id}`)
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
      .patch(`${config.API_URL}/api/events/${eventDetail._id}`, eventDetail)
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

  render() {
    // destructor state first
    const { events, error } = this.state;
    return (
      <div>
        <div className="mynav">
          <img className="logo" src="./Clogo.jpeg" alt="logo" height="60px" />
          <h1 className="call">Calloqui</h1>
          <img className="logo" src="./Clogo2.png" alt="avatar" height="60px" />
        </div>
        <div>
          <MyNav />
          <h1 className="sess">Upcoming Sessions:</h1>
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
                <EventDetail onDelete={this.handleDelete} {...routeProps} />
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
              return <AddEvent onAdd={this.handleAdd} />;
            }}
          />
          <Route
            path="/signin"
            render={(routeProps) => {
              return (
                <SignIn
                  error={this.error}
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
        </Switch>
      </div>
    );
  }
}
export default withRouter(App);
