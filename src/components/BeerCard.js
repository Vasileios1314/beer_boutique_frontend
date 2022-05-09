import { useState } from "react";
import { Card, Button, Form, ListGroup } from "react-bootstrap";
import { commentPost, likesUpdated } from "../store/eventDetails/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../store/user/selectors";

export default function BeerCard(props) {
  const [comment, setComment] = useState("");
  const beer = props.beer;
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  function submitComment(event, id) {
    event.preventDefault();
    dispatch(commentPost(id, comment));
    setComment("");
  }
  return (
    <Card
      style={{
        width: "22rem",
        borderRadius: 10,
        boxShadow: "initial",
        minHeight: 710,
        background: "#feb600",
        padding: "10px",
      }}
      className="text-center"
      key={beer.id}
    >
      <Card.Img
        variant="top"
        src={beer.imageUrl}
        style={{
          borderRadius: 10,
          height: 320,
          maxHeight: 480,
        }}
      />
      <Card.Body>
        <Card.Title>{beer.title}</Card.Title>
        <Card.Text>{beer.description}</Card.Text>
        <Card.Text>Category: {beer.category.title}</Card.Text>
        <Card.Text>Country: {beer.country}</Card.Text>
        <Card.Text>Size: {beer.size} ml</Card.Text>
        <Card.Text>Alcohol: {beer.alcohoolRate}%</Card.Text>
        <Card.Text>Likes: {beer.likes}</Card.Text>
        {token && (
          <Button
            variant="secondary"
            style={{ borderRadius: 10 }}
            onClick={() => dispatch(likesUpdated(beer.likes, beer.id))}
          >
            Like
          </Button>
        )}
        <Card.Header style={{ borderRadius: 10 }}>Comments</Card.Header>

        <div style={{ overflow: "scroll", height: "80px" }}>
          {beer?.comments?.map((comment) => {
            return (
              <ListGroup
                key={comment.id}
                style={{ marginTop: "10px", borderRadius: 10 }}
              >
                <ListGroup.Item>{comment.comment}</ListGroup.Item>
              </ListGroup>
            );
          })}
        </div>

        {token && (
          <Form onSubmit={(event) => submitComment(event, beer.id)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Comment"
                value={comment}
                style={{ borderRadius: 10, marginTop: 2 }}
                onChange={(event) => setComment(event.target.value)}
              />
            </Form.Group>
            <Button
              variant="secondary"
              type="submit"
              style={{ borderRadius: 10 }}
            >
              Comment
            </Button>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
}
