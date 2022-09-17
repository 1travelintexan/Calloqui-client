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
      <a
        href="https://www.linkedin.com/in/-joshua-george/"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faLinkedin} size="4x" />
      </a>
      <a
        href="https://github.com/1travelintexan"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faGithub} size="4x" />{" "}
      </a>
      <a
        href="https://www.instagram.com/1travelintexan/"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faInstagram} size="4x" />
      </a>

      <h5>Joshua George™</h5>
    </div>
  );
}

export default Footer;
