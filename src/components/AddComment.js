import React, { Component } from "react";
import { Button } from "react-bootstrap";

class AddComment extends Component {
  render() {
    const { onComment } = this.props;
    return (
      <div>
        <form onSubmit={onComment}>
          <input name="comment" type="text" placeholder="comment" />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    );
  }
}

export default AddComment;
