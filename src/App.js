import axios from "axios";
import { React, Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import MyNav from "./components/MyNav";
import EventList from "./components/EventList";
import EventDetail from "./components/EventDetail";
import AddEvent from "./components/AddEvent";
import EditEvent from "./components/EditEvent";

class App extends Component {
  state = {
    events: [],
  };

  componentDidMount = () => {
    axios.get("http://localhost:5005/api/events").then((response) => {
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
      .post("http://localhost:5005/api/create", newEvent)
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

  handleDelete = (eventDetail) => {
    //delete from the DB
    //delete from the state
    axios
      .delete(`http://localhost:5005/api/events/${eventDetail._id}`)
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
      .patch(`http://localhost:5005/api/events/${eventDetail._id}`, eventDetail)
      .then(() => {
        //update the local state after updating the Db
        let updatedEvents = this.state.events.map((event) => {
          if (event._id == eventDetail._id) {
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
      .catch(() => {});
  };

  render() {
    // destructor state first
    const { events } = this.state;
    return (
      <div>
        <h1>Surf Sessions:</h1>
        <MyNav />
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
        </Switch>
      </div>
    );
  }
}
export default withRouter(App);
