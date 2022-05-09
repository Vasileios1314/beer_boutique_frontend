import { Button, Col, Container } from "react-bootstrap";
import React from "react";
import { Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { beerDelete, eventDelete } from "../../store/eventDetails/actions";
import { setAttend } from "../../store/events/actions";
import {
  selectToken,
  selectUser,
  selectUserBusiness,
} from "../../store/user/selectors";
import BeerCard from "../../components/BeerCard";

export default function MyProfile() {
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);

  const business = useSelector(selectUserBusiness);
  const dispatch = useDispatch();

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const min = date.getMinutes();

    return `${day}/${month}/${year} ${hour}:${min}`;
  };

  if (!business) return <div>loading</div>;

  return (
    <Container style={{ flexDirection: "column" }}>
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
            width: "100%",
            borderRadius: "10px",
            background: "#feb600",
          }}
          className="text-center"
          key={business?.id}
        >
          <Card.Img
            variant="top"
            src={business?.imageUrl}
            style={{ borderRadius: "10px", minHeight: 320, maxHeight: 480 }}
          />
          <Card.Body>
            <Card.Title>{business?.title}</Card.Title>
            <Card.Text>{business?.description}</Card.Text>
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
                style={{ borderRadius: "10px", minHeight: 320, maxHeight: 480 }}
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
                  <Button
                    variant="secondary"
                    style={{ borderRadius: "10px" }}
                    onClick={() => dispatch(setAttend())}
                  >
                    Subscribe
                  </Button>
                )}
                <br />
                <br />
                {token && (
                  <Button
                    variant="danger"
                    style={{
                      borderRadius: "100%",
                      width: "50px",
                      fontSize: "25px",
                    }}
                    onClick={() => dispatch(eventDelete(event.id))}
                  >
                    x
                  </Button>
                )}
              </Card.Body>
            </Card>
          );
        })}
        <hr
          style={{
            color: "#fff",
            height: "2px",
            marginTop: "35px",
            width: "100%",
          }}
        />
      </div>
      {business?.beers?.length ? (
        <h3
          style={{
            padding: "20px 10px",
            fontSize: "30px",
            color: "#feb600",
            fontWeight: "400",
          }}
        >
          Beers
        </h3>
      ) : null}
      <div>
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
                {token &&
                user.isBusiness &&
                user.business.userId === user.id ? (
                  <Button
                    variant="danger"
                    style={{
                      borderRadius: "100%",
                      position: "relative",
                      top: "-55px",
                      right: "-50px",
                    }}
                    onClick={() => dispatch(beerDelete(beer.id))}
                  >
                    x
                  </Button>
                ) : null}
              </div>
            );
          })}
        </Col>
      </div>
    </Container>
  );
}
