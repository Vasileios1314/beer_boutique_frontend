import { Button, Col, Container } from "react-bootstrap";
import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  eventDelete,
  fetchBusinessById,
} from "../../store/eventDetails/actions";
import { selectBusiness } from "../../store/eventDetails/selectors";
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
    const hour = date.getHours();
    const min = date.getMinutes();

    return `${day}/${month}/${year} ${hour}:${min}`;
  };

  if (!business.id) return <div>loading</div>;

  return (
    <Container style={{ flexDirection: "column" }} key={business.id}>
      <div>
        <h2
          style={{
            padding: "10px",
            fontSize: "40px",
            color: "#feb600",
            fontWeight: "900",
            border: "2px solid #feb600",
            borderRadius: 10,
            textAlign: "center",
          }}
        >
          Business Profile
        </h2>
        <Card
          style={{
            padding: "20px",
            width: "25rem",
            // height: "30rem",
            borderRadius: "10px",
            background: "#feb600",
          }}
          className="text-center"
          key={business.id}
        >
          <Card.Img
            variant="top"
            src={business.imageUrl}
            style={{ borderRadius: "10px", height: 320, maxHeight: 480 }}
          />
          <Card.Body>
            <Card.Title>{business.title}</Card.Title>
            <Card.Text>{business.description}</Card.Text>
          </Card.Body>
        </Card>
      </div>
      <hr
        style={{
          color: "#fff",
          height: "2px",
          marginTop: "35px",
          width: "100%",
        }}
      />

      {business?.events?.length ? (
        <h3
          style={{
            padding: "20px 10px",
            fontSize: "30px",
            color: "#feb600",
            fontWeight: "400",
          }}
        >
          Events
        </h3>
      ) : null}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {business?.events?.map((event) => {
          return (
            <Card
              style={{
                width: "20rem",
                borderRadius: 10,
                boxShadow: "initial",
                minHeight: 710,
                background: "#feb600",
                padding: "10px",
              }}
              className="text-center"
              key={event.id}
            >
              <Card.Img
                variant="top"
                src={event.imageUrl}
                style={{ borderRadius: "10px", height: 320, maxHeight: 480 }}
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
                {token && !user.isBusiness && (
                  <Link to={`/event/${event.id}`}>
                    <Button variant="secondary" style={{ borderRadius: 10 }}>
                      Read More
                    </Button>
                  </Link>
                )}
                <br />
                <br />
                {token && user.isBusiness === user.id ? (
                  <Button
                    variant="secondary"
                    style={{ borderRadius: 10 }}
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
      <hr
        style={{
          color: "#fff",
          height: "2px",
          marginTop: "35px",
          width: "100%",
        }}
      />
      <div>
        {business?.beers?.length ? (
          <h3
            style={{
              padding: "20px 10px",
              fontSize: "30px",
              color: "#feb600",
              fontWeight: "400",
              textAlign: "center",
            }}
          >
            Beers
          </h3>
        ) : null}
        <Col
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {business?.beers?.map((beer) => {
            return (
              <div style={{ marginLeft: 20, marginRight: 20 }} key={beer.id}>
                <BeerCard beer={beer} />
              </div>
            );
          })}
        </Col>
      </div>
    </Container>
  );
}
