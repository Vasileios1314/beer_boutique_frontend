import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import { selectBusiness } from "../../store/eventDetails/selectors";
import { beerPost } from "../../store/eventDetails/actions";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

export default function PostBeer() {
  const isBusiness = useSelector(selectBusiness);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  console.log("cat", category);
  const [size, setSize] = useState(0);
  const [country, setCountry] = useState("");
  const [alcohoolRate, setAlcohoolRate] = useState(0);

  function submitForm(event) {
    event.preventDefault();
    console.log(
      "beer",
      title,
      imageUrl,
      description,
      category,
      size,
      country,
      alcohoolRate
    );
    dispatch(
      beerPost(
        title,
        imageUrl,
        description,
        parseInt(category),
        alcohoolRate,
        size,
        country
      )
    );
    setTitle("");
    setDescription("");
    setCategory("");
    setCountry("");
    setSize(0);
    setAlcohoolRate(0);
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
      <Form.Select
        onChange={(e) => setCategory(e.target.value)}
        aria-label="Default select example"
      >
        <option value="2">blonde</option>
        <option value="3">red</option>
        <option value="1">black</option>
      </Form.Select>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Country</Form.Label>
        <Form.Control
          type="text"
          placeholder="Country"
          value={country}
          onChange={(event) => setCountry(event.target.value)}
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
        <Form.Label>Size</Form.Label>
        <Form.Control
          type="number"
          value={size}
          onChange={(event) => setSize(event.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Alcohool Rate</Form.Label>
        <Form.Control
          type="number"
          value={alcohoolRate}
          onChange={(event) => setAlcohoolRate(event.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={submitForm}>
        Submit
      </Button>
    </Form>
  );
}
