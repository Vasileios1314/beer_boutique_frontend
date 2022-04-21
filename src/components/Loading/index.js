import React from "react";
import Spinner from "react-bootstrap/Spinner";
import "./spinner.css";

export default function Loading() {
  return (
    <div className="loading_spinner">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
