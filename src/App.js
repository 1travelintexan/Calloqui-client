import axios from "axios";
import { React, Component } from "react";
import { Switch, Route } from "react-router-dom";
import MyNav from "./components/MyNav";
import EventList from "./components/EventList";
import EventDetail from "./components/EventDetail";

class App extends Component {
  state = {
    events: [],
  };

  componentDidMount = () => {
    axios.get("http://localhost:5005/api/events").then((response) => {
      this.setState({ events: response.data });
    });
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
              return <EventDetail {...routeProps} />;
            }}
          />
        </Switch>
      </div>
    );
  }
}
export default App;
