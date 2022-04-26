import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectUser } from "../user/selectors";
import { showMessageWithTimeout } from "../appState/actions";
import { selectEventDetails } from "../eventDetails/selectors";

export const setEvents = (events) => ({
  type: "FETCH_EVENTS",
  payload: events,
});

export const setAttendance = (attend) => ({
  type: "SET_ATTENDANCE",
  payload: attend,
});

export const setCustomerProfile = (profile) => ({
  type: "SET_PROFILE",
  payload: profile,
});

export const setUnsubscribe = (unsubscribe) => ({
  type: "SET_UNSUBSCRIBE",
  payload: unsubscribe,
});

const startLoading = () => ({
  type: "EVENTS_LOADING",
});

export const fetchEvents = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(startLoading());
      const response = await axios.get(`${apiUrl}/event`);
      dispatch(setEvents(response.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const fetchCustomerProfile = () => {
  return async (dispatch, getState) => {
    try {
      const { token } = selectUser(getState());
      const response = await axios.get(`${apiUrl}/customer/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setCustomerProfile(response.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const setAttend = (userId, eventId) => {
  return async (dispatch, getState) => {
    try {
      const { token, id } = selectUser(getState());
      const { id: Id } = selectEventDetails(getState());
      const response = await axios.post(
        `${apiUrl}/event/attend/`,
        { userId: id, eventId: Id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(showMessageWithTimeout("success", false, "Event Attend", 3000));
      dispatch(setAttendance(response.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const EventUnsubscribe = (eventId) => {
  return async (dispatch, getState) => {
    try {
      const { token } = selectUser(getState());
      const { id } = selectEventDetails(getState());
      const response = await axios.delete(
        `${apiUrl}/event/unsubscribe/${eventId}`,
        { eventId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(showMessageWithTimeout("success", false, "Unsubscribe", 3000));
      dispatch(setAttendance(response.data));
      dispatch(fetchCustomerProfile()); //this fetched the profile info again, so we don't have to update the reducer
    } catch (e) {
      console.log(e.message);
    }
  };
};
