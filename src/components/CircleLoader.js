import React from "react";
import { motion } from "framer-motion";

const circleStyle = {
  display: "flex",
  width: "5rem",
  height: "5rem",
  border: "1rem solid #facaa7",
  borderTop: "1rem solid #f59042",
  borderRadius: "50%",

  boxSizing: "border-box",
  top: "10%",
  left: "40%",
};

const spinTransition = {
  loop: Infinity,
  ease: "linear",
  duration: 1,
};

export default function CircleLoader() {
  return (
    <div className="containerStyle">
      <motion.span
        style={circleStyle}
        animate={{ rotate: 360 }}
        transition={spinTransition}
      />
    </div>
  );
}
