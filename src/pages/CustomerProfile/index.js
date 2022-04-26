import { Button, Col, Container, Row } from "react-bootstrap";
import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  EventUnsubscribe,
  fetchCustomerProfile,
  setAttend,
} from "../../store/events/actions";
import { selectEvents } from "../../store/events/selectors";
import { selectUser } from "../../store/user/selectors";
import Loading from "../../components/Loading";

export default function CustomerProfile() {
  const dispatch = useDispatch();
  const events = useSelector(selectEvents);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(fetchCustomerProfile());
  }, [dispatch]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    return `${day}-${month}-${year} * ${hour}:${minutes}`;
  };

  if (!events || !user) return <div>loading</div>;

  return (
    <Container className="d-flex flex-column align-items-center">
      <div key={user.id}>
        <Card style={{ width: "22rem" }} className="text-center">
          <Card.Img variant="top" src={user.imageUrl} />
          <Card.Body>
            <Card.Title>{user.name}</Card.Title>
            <Card.Text>{user.email}</Card.Text>
          </Card.Body>
        </Card>
      </div>

      <Col className="m-3">
        <div>
          {Loading
            ? events?.map((event) => {
                return (
                  <Card
                    style={{ width: "20rem" }}
                    className="text-center"
                    key={event.id}
                  >
                    <Card.Img variant="bottom" src={event?.imageUrl} />
                    <Card.Body>
                      <Card.Title>{event?.title}</Card.Title>
                      <Card.Text>{event?.description}</Card.Text>
                      <Card.Text>Max capacity: {event?.capacity}</Card.Text>
                      <Card.Text>{event?.location}</Card.Text>
                      <Card.Text>
                        Day and Time:
                        <br />
                        {formatDate(event?.start_date)}
                        <br />
                        until
                        <br />
                        {formatDate(event?.end_date)}
                      </Card.Text>

                      <Button
                        variant="secondary"
                        onClick={() =>
                          events.events?.includes(event.id)
                            ? dispatch(setAttend())
                            : dispatch(EventUnsubscribe(event.id))
                        }
                      >
                        {events.events?.includes(event.id)
                          ? "Subscribe"
                          : "Unsubscribe"}
                      </Button>
                    </Card.Body>
                  </Card>
                );
              })
            : ""}
        </div>
      </Col>
    </Container>
  );
}
