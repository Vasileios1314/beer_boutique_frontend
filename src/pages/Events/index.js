import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Event from "../../components/Event";
import { fetchEvents } from "../../store/events/actions";
import { selectEvents } from "../../store/events/selectors";

export default function Events() {
  const dispatch = useDispatch();
  const events = useSelector(selectEvents);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);
  return (
    <div>
      {events.map((event) => {
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
  );
}
