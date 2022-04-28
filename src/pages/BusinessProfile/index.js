import { Button, Col, Container } from "react-bootstrap";
import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  eventDelete,
  fetchBusinessById,
} from "../../store/eventDetails/actions";
import { selectBusiness } from "../../store/eventDetails/selectors";
import { setAttend } from "../../store/events/actions";
import { selectToken, selectUser } from "../../store/user/selectors";
import BeerCard from "../../components/BeerCard";

export default function BusinessProfile() {
  const { id } = useParams();
  const business = useSelector(selectBusiness);
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBusinessById(id));
  }, [dispatch, id]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  if (!business.id) return <div>loading</div>;

  return (
    <Container style={{ flexDirection: "column" }} key={business.id}>
      <div>
        <h2
          style={{
            color: "white",
            display: "flex",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          Business Profile
        </h2>
        <Card
          style={{ width: "22rem", borderRadius: 100, minHeight: 320 }}
          className="text-center"
          key={business.id}
        >
          <Card.Img
            variant="top"
            src={business.imageUrl}
            style={{ borderRadius: 100, minHeight: 320, maxHeight: 480 }}
          />
          <Card.Body>
            <Card.Title>{business.title}</Card.Title>
            <Card.Text>{business.description}</Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div>
        {business?.events?.length ? (
          <h3 style={{ color: "white", marginTop: 20 }}>Events</h3>
        ) : null}
        {business?.events?.map((event) => {
          return (
            <Card
              style={{ width: "18rem", borderRadius: 100, minHeight: 320 }}
              className="text-center"
              key={event.id}
            >
              <Card.Img
                variant="top"
                src={event.imageUrl}
                style={{ borderRadius: 100, minHeight: 320, maxHeight: 480 }}
              />
              <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                <Card.Text>{event.description}</Card.Text>
                <Card.Text>{event.location}</Card.Text>
                <Card.Text>Max capacity: {event.capacity}</Card.Text>
                <Card.Text>
                  Day:
                  <br />
                  {formatDate(event.start_date)}
                  <br />
                  until
                  <br />
                  {formatDate(event.end_date)}
                </Card.Text>
                <Button
                  variant="secondary"
                  style={{ borderRadius: 100 }}
                  onClick={() => dispatch(setAttend())}
                >
                  Subscribe
                </Button>
                <br />
                <br />
                {token && user.isBusiness ? (
                  <Button
                    variant="secondary"
                    style={{ borderRadius: 100 }}
                    onClick={() => dispatch(eventDelete(event.id))}
                  >
                    Delete Event
                  </Button>
                ) : null}
              </Card.Body>
            </Card>
          );
        })}
      </div>
      <div>
        <h3 style={{ color: "white" }}>Beers</h3>
        <Col className="m-3">
          {business?.beers?.map((beer) => {
            return (
              <div
                style={{ marginLeft: 20, marginRight: 20 }}
                key={business.beers.id}
              >
                <BeerCard beer={beer} />
              </div>
            );
          })}
        </Col>
      </div>
    </Container>
  );
}
