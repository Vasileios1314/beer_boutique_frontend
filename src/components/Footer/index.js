import React from "react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./styles.css";

export default function Footer() {
  return (
    <div className="footerContainer">
      <ul className="f-icons">
        <li>
          <a
            rel="noreferrer"
            href="https://www.linkedin.com/in/vasileios-bomponis-a20673121/"
            target="_blank"
          >
            <FiLinkedin color=" aliceblue" size="2em" className="Linkedin" />
          </a>
        </li>
        <li>
          <a
            rel="noreferrer"
            href="https://github.com/Vasileios1314"
            target="_blank"
          >
            <FiGithub color=" aliceblue" size="2em" className="Github" />
          </a>
        </li>
        <li>
          <a
            rel="noreferrer"
            href="https://vasileiosbomponis.netlify.app/"
            target="_blank"
          >
            ® 2022 Copyright Vasileios Bomponis
          </a>
        </li>
      </ul>
    </div>
  );
}
