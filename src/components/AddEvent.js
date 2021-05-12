import React, { Component } from "react";
import { Button } from "react-bootstrap";

class AddEvent extends Component {
  render() {
    const { onAdd } = this.props;
    return (
      <form onSubmit={onAdd}>
        <input name="name" type="text" placeholder="Enter name" />
        <input name="description" type="text" placeholder="Description" />
        <input name="date" type="text" placeholder="Enter date" />
        <input name="location" type="text" placeholder="Location" />
        <Button type="submit">Submit</Button>
      </form>
    );
  }
}

export default AddEvent;
