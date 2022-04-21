import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import { selectBusiness } from "../../store/eventDetails/selectors";
import { eventPost } from "../../store/eventDetails/actions";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

export default function PostEvent() {
  const isBusiness = useSelector(selectBusiness);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [capacity, setCapacity] = useState();
  const [location, setLocation] = useState("");

  function submitForm(event) {
    event.preventDefault();
    console.log(
      "event",
      title,
      imageUrl,
      description,
      capacity,
      end,
      start,
      location
    );
    dispatch(
      eventPost(title, imageUrl, description, capacity, end, start, location)
    );
    setTitle("");
    setDescription("");
    setCapacity(0);
    setEnd("");
    setStart("");
    setLocation("");
    setImageUrl("");
  }
  if (!token || !isBusiness) {
    return <div>Loading...</div>;
  }

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Capacity</Form.Label>
        <Form.Control
          type="number"
          placeholder="capacity"
          value={capacity}
          onChange={(event) => setCapacity(event.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Start</Form.Label>
        <Form.Control
          type="date"
          placeholder="Start"
          value={start}
          onChange={(event) => setStart(event.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>End</Form.Label>
        <Form.Control
          type="date"
          placeholder="End"
          value={end}
          onChange={(event) => setEnd(event.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Image Url</Form.Label>
        <Form.Control
          type="text"
          placeholder="imageUrl"
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          placeholder="Location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={submitForm}>
        Submit
      </Button>
    </Form>
  );
}
