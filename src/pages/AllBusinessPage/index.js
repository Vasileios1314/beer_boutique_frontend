import { Button, Container } from "react-bootstrap";
import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllBusiness } from "../../store/eventDetails/actions";
import { selectBusiness } from "../../store/eventDetails/selectors";

export default function AllBusinessPage() {
  const business = useSelector(selectBusiness);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllBusiness());
  }, [dispatch]);

  if (!business) return <div>loading</div>;

  return (
    <Container style={{ flexDirection: "column" }}>
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
      <hr
        style={{
          color: "#fff",
          height: "2px",
          marginTop: "35px",
          width: "100%",
        }}
      />
      <h3
        style={{
          padding: "10px",
          fontSize: "25px",
          color: "#feb600",
          fontWeight: "900",
          textAlign: "center",
        }}
      >
        Visit our Business
      </h3>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          padding: 20,
        }}
      >
        {business[0]?.map((business) => {
          return (
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
                src={business?.imageUrl}
                style={{ borderRadius: "10px", height: 320, maxHeight: 480 }}
              />
              <Card.Body>
                <Card.Title>{business?.title}</Card.Title>
                <Card.Text>{business?.description}</Card.Text>
                <Link to={`/business/${business.id}`}>
                  <Button
                    variant="secondary"
                    style={{ borderRadius: "10px", height: "50px" }}
                  >
                    Visit The Business
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </Container>
  );
}
