import { Button, Col, Container, Row } from "react-bootstrap";
import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

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
    <Container>
      <Row>
        <Col className="m-3">
          <Card style={{ width: "20rem" }} className="text-center">
            <Card.Img variant="top" src={imageUrl} />
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Text>{description}</Card.Text>
              <Card.Text>{location}</Card.Text>
              <Card.Text></Card.Text>
              <Link to={`/event/${id}`}>
                <Button variant="secondary">Read More</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
