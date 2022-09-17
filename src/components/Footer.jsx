import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <div className="footer">
      <FontAwesomeIcon icon={faLinkedin} size="4x" />
      <FontAwesomeIcon icon={faGithub} size="4x" />
      <FontAwesomeIcon icon={faInstagram} size="4x" />
    </div>
  );
}

export default Footer;
