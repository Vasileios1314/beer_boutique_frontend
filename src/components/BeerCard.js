import { useState } from "react";
import { Card, Button, Form, ListGroup } from "react-bootstrap";
import { commentPost } from "../store/eventDetails/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../store/user/selectors";

export default function BeerCard(props) {
  const [comment, setComment] = useState("");
  const beer = props.beer;
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  function submitComment(event, id) {
    event.preventDefault();
    console.log("submit", id, comment);
    dispatch(commentPost(id, comment));
    setComment("");
  }

  return (
    <Card
      style={{ width: "18rem", borderRadius: 100, minHeight: 710 }}
      className="text-center"
      key={beer.id}
    >
      <Card.Img
        variant="top"
        src={beer.imageUrl}
        style={{ borderRadius: 100, minHeight: 320, maxHeight: 480 }}
      />
      <Card.Body>
        <Card.Title>{beer.title}</Card.Title>
        <Card.Text>{beer.description}</Card.Text>
        <Card.Text>Category: {beer.category.title}</Card.Text>
        <Card.Text>Country: {beer.country}</Card.Text>
        <Card.Text>Size: {beer.size} ml</Card.Text>
        <Card.Text>Alcohol: {beer.alcohoolRate}%</Card.Text>

        <Card.Header style={{ borderRadius: 100 }}>Comments</Card.Header>
        {beer?.comments?.map((comment) => {
          return (
            <ListGroup key={comment.id} style={{ marginTop: "10px" }}>
              <ListGroup.Item>{comment.comment}</ListGroup.Item>
            </ListGroup>
          );
        })}
        {token && (
          <Form onSubmit={(event) => submitComment(event, beer.id)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Comment"
                value={comment}
                style={{ borderRadius: 100, marginTop: 2 }}
                onChange={(event) => setComment(event.target.value)}
              />
            </Form.Group>
            <Button
              variant="secondary"
              type="submit"
              style={{ borderRadius: 100 }}
            >
              Comment
            </Button>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
}
