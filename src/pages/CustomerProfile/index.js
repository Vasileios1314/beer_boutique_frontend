import { Button, Col, Container } from "react-bootstrap";
import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  EventUnsubscribe,
  fetchCustomerProfile,
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

    return `${day}-${month}-${year}`;
  };

  if (!events || !user) return <div>loading</div>;

  return (
    <Container className="d-flex flex-column align-items-center">
      <div key={user.id}>
        <h2
          style={{
            color: "white",
            display: "flex",
            justifyContent: "center",
            margin: 20,
          }}
        >
          My Profile
        </h2>
        <Card
          style={{ width: "22rem", borderRadius: 100 }}
          className="text-center"
        >
          <Card.Img
            variant="top"
            src={user.imageUrl}
            style={{ borderRadius: 100, minHeight: 320, maxHeight: 480 }}
          />
          <Card.Body>
            <Card.Title>{user.name}</Card.Title>
            <Card.Text>{user.email}</Card.Text>
          </Card.Body>
        </Card>
      </div>

      <Col className="m-3">
        <div>
          <h3
            style={{
              color: "white",
              display: "flex",
              justifyContent: "center",
              margin: 20,
            }}
          >
            Subscribed Events
          </h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {Loading
              ? events?.map((event) => {
                  return (
                    <div
                      style={{
                        marginLeft: 20,
                        marginRight: 20,
                      }}
                    >
                      <Card
                        style={{
                          width: "20rem",
                          borderRadius: 100,
                          minHeight: 710,
                        }}
                        className="text-center"
                        key={event.id}
                      >
                        <Card.Img
                          variant="bottom"
                          src={event?.imageUrl}
                          style={{
                            borderRadius: 100,
                            minHeight: 320,
                            maxHeight: 480,
                          }}
                        />
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
                            style={{ borderRadius: 100 }}
                            onClick={() => dispatch(EventUnsubscribe(event.id))}
                          >
                            Unsubscribe
                          </Button>
                        </Card.Body>
                      </Card>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </Col>
    </Container>
  );
}
