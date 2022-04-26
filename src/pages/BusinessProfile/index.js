import {
  Breadcrumb,
  Button,
  Col,
  Container,
  Form,
  ListGroup,
} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { render } from "react-dom";
import {
  commentPost,
  fetchBusinessById,
  ratingPost,
} from "../../store/eventDetails/actions";
import { selectBusiness } from "../../store/eventDetails/selectors";
import { setAttend } from "../../store/events/actions";
import { selectUser } from "../../store/user/selectors";

export default function BusinessProfile() {
  const { id } = useParams();
  const business = useSelector(selectBusiness);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [ratings, setRatings] = useState({});

  useEffect(() => {
    dispatch(fetchBusinessById(id));
  }, [dispatch, id]);

  function submitComment(event, id) {
    event.preventDefault();
    console.log("submit", id, comment);
    dispatch(commentPost(id, comment));
    setComment("");
  }

  function submitRating(event, id) {
    event.preventDefault();
    if (rating !== 0) dispatch(ratingPost(id, rating));
    setRating(0);
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    return `${day}-${month}-${year} * ${hour}:${minutes}`;
  };

  useEffect(() => {
    // go over all beers
    // go over all ratings
    // every time we have a rating in a beer
    // save it as true
    const checkRatings = {};
    // business.beers.forEach((beer) => {
    //   beer.ratings.forEach((rating) => {
    //     // return (rating.rating = true);
    //     if(rating )
    //   });
    // });
    /*
    const ratings = {
      0: true,
      1: false,
      2: false
    }
    */
    business.beers.forEach((beer) => {
      beer.ratings.forEach((rating) => {
        if (rating.userId === user.id) checkRatings[beer.id] = true;
      });
    });

    setRatings(checkRatings);
  }, [business]);

  useEffect(() => {
    // console.log(ratings);
  }, [ratings]);

  if (!business.id) return <div>loading</div>;

  return (
    <Container>
      <div>
        <Card
          style={{ width: "22rem" }}
          className="text-center"
          key={business.id}
        >
          <Card.Img variant="top" src={business.imageUrl} />
          <Card.Body>
            <Card.Title>{business.title}</Card.Title>
            <Card.Text>{business.description}</Card.Text>
          </Card.Body>
        </Card>
        {business?.events?.map((event) => {
          return (
            <Card
              style={{ width: "18rem" }}
              className="text-center"
              key={event.id}
            >
              <Card.Img variant="top" src={event.imageUrl} />
              <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                <Card.Text>{event.description}</Card.Text>
                <Card.Text>{event.location}</Card.Text>
                <Card.Text>Max capacity: {event.capacity}</Card.Text>
                <Card.Text>
                  Day and Time:
                  <br />
                  {formatDate(event.start_date)}
                  <br />
                  until
                  <br />
                  {formatDate(event.end_date)}
                </Card.Text>
                <Button
                  variant="secondary"
                  onClick={() => dispatch(setAttend())}
                >
                  Subscribe
                </Button>
              </Card.Body>
            </Card>
          );
        })}

        <Col className="m-3">
          {business?.beers?.map((beer) => {
            return (
              <Card
                style={{ width: "18rem" }}
                className="text-center"
                key={beer.id}
              >
                <Card.Img variant="top" src={beer.imageUrl} />
                <Card.Body>
                  <Card.Title>{beer.title}</Card.Title>
                  <Card.Text>{beer.description}</Card.Text>
                  <Card.Text>Category: {beer.category.title}</Card.Text>
                  <Card.Text>Country: {beer.country}</Card.Text>
                  <Card.Text>Size: {beer.size} ml</Card.Text>
                  <Card.Text>Alcohol: {beer.alcohoolRate}%</Card.Text>
                  <div style={{ display: "flex", alignItems: "center" }}>
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
                  </div>
                  <Card.Header>Comments</Card.Header>
                  {beer?.comments?.map((comment) => {
                    return (
                      <ListGroup key={comment.id} style={{ marginTop: "10px" }}>
                        <ListGroup.Item>{comment.comment}</ListGroup.Item>
                      </ListGroup>
                    );
                  })}
                  <Form onSubmit={(event) => submitComment(event, beer.id)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Comment Here!</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                      />
                    </Form.Group>
                    <Button variant="secondary" type="submit">
                      Comment
                    </Button>
                  </Form>
                  <Form onSubmit={(e) => submitRating(e, beer.id)}>
                    {ratings[beer.id] ? (
                      <div>
                        Your Vote:
                        <ReactStars
                          count={5}
                          value={
                            beer.ratings.find(
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
                  </Form>
                </Card.Body>
              </Card>
            );
          })}
        </Col>
      </div>
    </Container>
  );
}
