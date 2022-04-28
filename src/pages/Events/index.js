import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Event from "../../components/Event";
import Loading from "../../components/Loading";
import { fetchEvents } from "../../store/events/actions";
import {
  selectEvents,
  selectEventsLoading,
} from "../../store/events/selectors";
import "./styles.css";

export default function Events() {
  const dispatch = useDispatch();
  const events = useSelector(selectEvents);
  const loading = useSelector(selectEventsLoading);
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (loading) return <Loading />;

  if (events.lenth === 0)
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        No events
      </div>
    );

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <h2 style={{ color: "white" }}>Events</h2>
      </div>
      <Container>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {events?.map((event) => {
            return (
              <Event
                key={event.id}
                id={event.id}
                title={event.title}
                description={event.description}
                imageUrl={event.imageUrl}
                start_date={event.start_date}
                end_date={event.end_date}
                capacity={event.capacity}
                location={event.location}
                createdAt={event.createdAt}
              />
            );
          })}
        </div>
      </Container>
    </>
  );
}
