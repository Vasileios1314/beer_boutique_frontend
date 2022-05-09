import { Button, Col, Container } from "react-bootstrap";
import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { eventById } from "../../store/eventDetails/actions";
import { selectEventDetails } from "../../store/eventDetails/selectors";
import { setAttend } from "../../store/events/actions";
import { selectToken, selectUser } from "../../store/user/selectors";

export default function EventDetails() {
  const { id } = useParams();
  const event = useSelector(selectEventDetails);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(eventById(id));
  }, [dispatch, id]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const min = date.getMinutes();

    return `${day}/${month}/${year} ${hour}:${min}`;
  };

  if (!event.id) return <div>loading</div>;

  return (
    <Container className="d-flex flex-column align-items-center">
      <Card.Text
        style={{
          padding: "10px",
          fontSize: "40px",
          color: "#feb600",
          fontWeight: "900",
          border: "2px solid #feb600",
          borderRadius: 10,
        }}
      >
        Event Page
      </Card.Text>
      <div>
        <Card
          style={{
            padding: "20px",
            width: "100%",
            borderRadius: "10px",
            background: "#feb600",
          }}
          className="text-center"
        >
          <Card.Img
            variant="top"
            src={event?.business?.imageUrl}
            style={{
              height: 350,
              maxHeight: 180,
            }}
          />
          <Card.Body>
            <Card.Title>{event?.business?.title}</Card.Title>
            <Card.Text>{event?.business?.description}</Card.Text>
            <Card.Text></Card.Text>
            <Link to={`/business/${event?.businessId}`}>
              <Button
                variant="secondary"
                style={{ borderRadius: "10px", height: "50px" }}
              >
                Visit The Business
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
      <Card.Text
        style={{
          padding: "20px 10px",
          fontSize: "30px",
          color: "#feb600",
          fontWeight: "400",
        }}
      >
        Business Event
      </Card.Text>
      <Col className="m-3">
        <div>
          <Card
            style={{
              width: "30rem",
              borderRadius: 10,
              boxShadow: "initial",
              minHeight: 710,
              background: "#feb600",
              padding: "10px",
            }}
            className="text-center"
          >
            <Card.Img
              variant="bottom"
              src={event.imageUrl}
              style={{ borderRadius: 10, minHeight: 320, maxHeight: 480 }}
            />
            <Card.Body>
              <Card.Title>{event.title}</Card.Title>
              <Card.Text>{event.description}</Card.Text>
              <Card.Text>Max capacity: {event.capacity}</Card.Text>
              <Card.Text>{event.location}</Card.Text>
              <Card.Text>
                When: {formatDate(event.start_date)}
                <br />
                until
                <br />
                {formatDate(event.end_date)}
              </Card.Text>
              {/* <Button variant="secondary" onClick={submitAttend}> */}
              {token && !user.isBusiness && (
                <Button
                  variant="secondary"
                  style={{ borderRadius: "10px", height: "50px" }}
                  onClick={() => dispatch(setAttend())}
                >
                  Subscribe
                </Button>
              )}
            </Card.Body>
          </Card>
        </div>
      </Col>
    </Container>
  );
}
