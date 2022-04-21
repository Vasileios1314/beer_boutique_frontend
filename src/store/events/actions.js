import { apiUrl } from "../../config/constants";
import axios from "axios";

export const setEvents = (events) => ({
  type: "FETCH_EVENTS",
  payload: events,
});

export const fetchEvents = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${apiUrl}/event`);
      dispatch(setEvents(response.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};
