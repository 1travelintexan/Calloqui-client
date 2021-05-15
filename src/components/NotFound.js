import React, { Component } from "react";
import data from "../animations/bus.json";
import LottieControl from "./LottieControl";

class NotFound extends Component {
  render() {
    return (
      <div>
        <LottieControl animation={data} width={800} height={900} />
      </div>
    );
  }
}
export default NotFound;
