import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

class AddEvent extends Component {
  render() {
    const { onAdd, user } = this.props;
    if (!user) {
      return <Redirect to={"/signup"} />;
    }
    return (
      <div classname="addEvent">
        <form onSubmit={onAdd}>
          <input name="name" type="text" placeholder="Enter name" />
          <input name="description" type="text" placeholder="Description" />
          <input name="date" type="date" placeholder="Enter date" />
          <input name="location" type="text" placeholder="Location" />
          <input name="eventImage" type="file" accept="image/jpeg, image/png" />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    );
  }
}

export default AddEvent;
