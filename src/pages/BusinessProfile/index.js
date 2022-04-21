import { Button, Form, ListGroup } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBusinessById } from "../../store/eventDetails/actions";
import { selectBusiness } from "../../store/eventDetails/selectors";

export default function BusinessProfile() {
  const { id } = useParams();
  const business = useSelector(selectBusiness);
  const dispatch = useDispatch();

  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  useEffect(() => {
    dispatch(fetchBusinessById(id));
  }, [dispatch, id]);
  console.log("business", business);

  function submitComment(event) {
    event.preventDefault();
    // dispatch(somithng(comment));
    setComment("");
  }

  function submitRating(event) {
    event.preventDefault();
    // dispatch(somithng(rating));
    setRating(1);
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    return `${day}/${month}/${year} ${hour}:${minutes}`;
  };

  if (!business.id) return <div>loading</div>;

  return (
    <div>
      <Card style={{ width: "22rem" }} className="text-center">
        <Card.Img variant="top" src={business.imageUrl} />
        <Card.Body key={business.id}>
          <Card.Title>{business.title}</Card.Title>
          <Card.Text>{business.description}</Card.Text>
        </Card.Body>
      </Card>
      {business?.events?.map((event) => {
        return (
          <Card style={{ width: "18rem" }} className="text-center">
            <Card.Img variant="top" src={event.imageUrl} />
            <Card.Body key={event.id}>
              <Card.Title>{event.title}</Card.Title>
              <Card.Text>{event.description}</Card.Text>
              <Card.Text>{event.location}</Card.Text>
              <Card.Text>{event.capacity}</Card.Text>
              <Card.Text>
                {formatDate(event.start_date)} - {formatDate(event.end_date)}
              </Card.Text>
              {/* <Link to={`/event/${id}`}> */}
              <Button variant="secondary">Subscribe</Button>
              {/* </Link> */}
            </Card.Body>
          </Card>
        );
      })}

      {business?.beers?.map((beer) => {
        return (
          <Card style={{ width: "18rem" }} className="text-center">
            <Card.Img variant="top" src={beer.imageUrl} />
            <Card.Body key={beer.id}>
              <Card.Title>{beer.title}</Card.Title>
              <Card.Text>{beer.description}</Card.Text>
              <Card.Text>{beer.category.title}</Card.Text>
              <Card.Text>{beer.country}</Card.Text>
              <Card.Text>{beer.country}</Card.Text>
              <Card.Text>{beer.size}</Card.Text>
              <Card.Text>{beer.alcohoolRate}</Card.Text>
              <Card.Header>Comments</Card.Header>
              {beer?.comments?.map((comment) => {
                return (
                  <ListGroup key={comment.id}>
                    <ListGroup.Item>{comment.comment}</ListGroup.Item>
                  </ListGroup>
                );
              })}
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Comment Here!</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Comment"
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="secondary"
                  type="submit"
                  onClick={submitComment}
                >
                  Comment
                </Button>
              </Form>

              <Card.Header>Rating</Card.Header>
              {beer?.ratings?.map((rating) => {
                return (
                  <ListGroup key={rating.id}>
                    <ListGroup.Item>{rating.rating}</ListGroup.Item>
                  </ListGroup>
                );
              })}
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Give a Rate!</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="1 to 5"
                    value={rating}
                    onChange={(event) => setRating(event.target.value)}
                  />
                </Form.Group>
                <Button variant="secondary" type="submit">
                  {" "}
                  onClick={submitRating}
                  Rate
                </Button>
              </Form>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}
