import React, { Component } from "react";
import { Button } from "react-bootstrap";

class AddForm extends Component {
  render() {
    return (
      <form>
        <input name="name" type="text" placeholder="Enter name" />
        <input name="description" type="text" placeholder="Description" />
        <input name="date" type="text" placeholder="Enter date" />
        <input name="location" type="text" placeholder="Location" />
        <Button type="submit">Submit</Button>
      </form>
    );
  }
}

export default AddForm;
