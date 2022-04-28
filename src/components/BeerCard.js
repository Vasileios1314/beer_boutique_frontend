import { useState } from "react";
import { Card, Button, Form, ListGroup } from "react-bootstrap";
import { commentPost } from "../store/eventDetails/actions";
import { useDispatch } from "react-redux";

export default function BeerCard(props) {
  const [comment, setComment] = useState("");
  const beer = props.beer;
  const dispatch = useDispatch();

  function submitComment(event, id) {
    event.preventDefault();
    console.log("submit", id, comment);
    dispatch(commentPost(id, comment));
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
        {/* <div style={{ display: "flex", alignItems: "center" }}>
                    <ReactStars
                      count={5}
                      value={beer.averageRating}
                      size={24}
                      isHalf
                      edit={false}
                      emptyIcon={<i className="far fa-star"></i>}
                      fullIcon={<i className="fa fa-star"></i>}
                      activeColor="#ffd700"
                    />
                    <p style={{ margin: "0" }}>
                      {beer?.averageRating?.toFixed(1)} / 5
                    </p>
                  </div> */}
        <Card.Header style={{ borderRadius: 100 }}>Comments</Card.Header>
        {beer?.comments?.map((comment) => {
          return (
            <ListGroup key={comment.id} style={{ marginTop: "10px" }}>
              <ListGroup.Item>{comment.comment}</ListGroup.Item>
            </ListGroup>
          );
        })}
        <Form onSubmit={(event) => submitComment(event, beer.id)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* <Form.Label>Comment Here!</Form.Label> */}
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
        {/* <Form onSubmit={(e) => submitRating(e, beer.id)}>
                    {ratings[beer.id] ? (
                      <div>
                        Your Vote:
                        <ReactStars
                          count={5}
                          value={
                            beer?.ratings?.find(
                              (rating) => rating.userId === user.id
                            ).rating
                          }
                          size={24}
                          edit={false}
                          emptyIcon={<i className="far fa-star"></i>}
                          fullIcon={<i className="fa fa-star"></i>}
                          activeColor="#ffd700"
                          onChange={(rate) => setRating(rate)}
                        />
                      </div>
                    ) : (
                      <>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>Give a Rate!</Form.Label>
                          <ReactStars
                            count={5}
                            value={rating}
                            size={24}
                            emptyIcon={<i className="far fa-star"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffd700"
                            onChange={(rate) => setRating(rate)}
                          />
                        </Form.Group>
                        <Button variant="secondary" type="submit">
                          Rate
                        </Button>
                      </>
                    )}
                  </Form> */}
      </Card.Body>
    </Card>
  );
}
