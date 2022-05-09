import { Button, Col } from "react-bootstrap";
import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../pages/Events/styles.css";

export default function Event(props) {
  const {
    id,
    imageUrl,
    title,
    description,
    location,
    // start_date,
    // end_date,
    // capacity,
    // createdAt,
  } = props;
  return (
    <div>
      <Col className="col" style={{ minHeight: 510 }}>
        <Card
          style={{
            width: "20rem",
            borderRadius: "10px",
            padding: "10px",
            background: "#feb600",
          }}
          className="text-center"
        >
          <Card.Img
            variant="top"
            src={imageUrl}
            style={{ borderRadius: "10px", minHeight: 320, maxHeight: 480 }}
          />
          <Card.Body>
            <Card.Title style={{ fontSize: "20px", fontWeight: "900" }}>
              {title}
            </Card.Title>
            <Card.Text>{description}</Card.Text>
            <Card.Text style={{ textDecoration: "underline" }}>
              {location}
            </Card.Text>
            <Card.Text></Card.Text>
            <Link to={`/event/${id}`}>
              <Button
                variant="secondary"
                style={{ borderRadius: "10px", height: "50px" }}
              >
                Read More
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
}
