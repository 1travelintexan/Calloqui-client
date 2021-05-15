import React, { Component } from "react";
import data from "../animations/bus.json";
import LottieControl from "./LottieControl";

class NotFound extends Component {
  render() {
    return (
      <div className="page">
        <LottieControl animation={data} width={400} height={300} />
      </div>
    );
  }
}
export default NotFound;
