import { Button, Col, Container } from "react-bootstrap";
import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { eventById } from "../../store/eventDetails/actions";
import { selectEventDetails } from "../../store/eventDetails/selectors";
import { setAttend } from "../../store/events/actions";

export default function EventDetails() {
  const { id } = useParams();
  const event = useSelector(selectEventDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(eventById(id));
  }, [dispatch, id]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  if (!event.id) return <div>loading</div>;

  return (
    <Container className="d-flex flex-column align-items-center">
      <div>
        <Card
          style={{ width: "22rem", borderRadius: 100 }}
          className="text-center"
        >
          <Card.Img
            variant="top"
            src={event?.business?.imageUrl}
            style={{ borderRadius: 100, minHeight: 320, maxHeight: 480 }}
          />
          <Card.Body>
            <Card.Title>{event?.business?.title}</Card.Title>
            <Card.Text>{event?.business?.description}</Card.Text>
            <Card.Text></Card.Text>
            <Link to={`/business/${event?.businessId}`}>
              <Button variant="secondary" style={{ borderRadius: 100 }}>
                Visit The Business
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
      <Col className="m-3">
        <div>
          <Card
            style={{
              width: "18rem",
              borderRadius: 100,
              boxShadow: "initial",
              minHeight: 710,
            }}
            className="text-center"
          >
            <Card.Img
              variant="bottom"
              src={event.imageUrl}
              style={{ borderRadius: 100, minHeight: 320, maxHeight: 480 }}
            />
            <Card.Body>
              <Card.Title>{event.title}</Card.Title>
              <Card.Text>{event.description}</Card.Text>
              <Card.Text>Max capacity: {event.capacity}</Card.Text>
              <Card.Text>{event.location}</Card.Text>
              <Card.Text>When: {formatDate(event.start_date)}</Card.Text>
              {/* <Button variant="secondary" onClick={submitAttend}> */}
              <Button
                variant="secondary"
                style={{ borderRadius: 100 }}
                onClick={() => dispatch(setAttend())}
              >
                Subscribe
              </Button>
            </Card.Body>
          </Card>
        </div>
      </Col>
    </Container>
  );
}
