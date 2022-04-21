import { Button } from "react-bootstrap";
import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { eventById } from "../../store/eventDetails/actions";
import { selectEventDetails } from "../../store/eventDetails/selectors";

export default function EventDetails() {
  const { id } = useParams();
  const event = useSelector(selectEventDetails);
  const dispatch = useDispatch();
  // console.log("first", event);

  useEffect(() => {
    dispatch(eventById(id));
  }, [dispatch, id]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    return `${day}/${month}/${year} ${hour}:${minutes}`;
  };

  if (!event.id) return <div>loading</div>;

  return (
    <div>
      <div>
        <Card style={{ width: "20rem" }} className="text-center">
          <Card.Img variant="top" src={event?.business?.imageUrl} />
          <Card.Body>
            <Card.Title>{event?.business?.title}</Card.Title>
            <Card.Text>{event?.business?.description}</Card.Text>
            <Card.Text></Card.Text>
            <Link to={`/business/${id}`}>
              <Button variant="secondary">Visit The Business</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>

      <div>
        <Card style={{ width: "20rem" }} className="text-center">
          <Card.Img variant="bottom" src={event.imageUrl} />
          <Card.Body>
            <Card.Title>{event.title}</Card.Title>
            <Card.Text>{event.description}</Card.Text>
            <Card.Text>Max capacity: {event.capacity}</Card.Text>
            <Card.Text>{event.location}</Card.Text>
            <Card.Text>
              Time: {formatDate(event.start_date)} till{" "}
              {formatDate(event.end_date)}
            </Card.Text>
            {/* <Link to={`/event/${id}`}> */}
            <Button variant="secondary">Subscribe</Button>
            {/* </Link> */}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
