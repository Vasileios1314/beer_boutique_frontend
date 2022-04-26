import axios from "axios";
import { apiUrl } from "../../config/constants";
import { showMessageWithTimeout } from "../appState/actions";
import { selectUser } from "../user/selectors";

const setEventDetails = (event) => ({
  type: "EVENT_DETAILS",
  payload: event,
});

const setBusiness = (business) => ({
  type: "SET_BUSINESS",
  payload: business,
});

export const postBeer = (beer) => ({
  type: "POST_BEER",
  payload: beer,
});

export const postEvent = (event) => ({
  type: "POST_EVENT",
  payload: event,
});

export const postComment = ({ beerId, comment }) => ({
  type: "POST_COMMENT",
  payload: { beerId, comment },
});

export const postRating = (rating) => ({
  type: "POST_RATING",
  payload: rating,
});

export const eventById = (id) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${apiUrl}/event/${id}`);
      dispatch(setEventDetails(response.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const fetchBusinessById = (id) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${apiUrl}/business/${id}`);
      dispatch(setBusiness(response.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const beerPost = (
  title,
  imageUrl,
  description,
  category,
  alcohoolRate,
  size,
  country
) => {
  return async (dispatch, getState) => {
    try {
      const { token } = selectUser(getState());

      const response = await axios.post(
        `${apiUrl}/business/beer/`,
        {
          title,
          imageUrl,
          description,
          category,
          alcohoolRate,
          size,
          country,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          "Beer posted successfully",
          3000
        )
      );
      dispatch(postBeer(response.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const eventPost = (
  title,
  imageUrl,
  description,
  capacity,
  end_date,
  start_date,
  location
) => {
  return async (dispatch, getState) => {
    try {
      const { token } = selectUser(getState());

      const response = await axios.post(
        `${apiUrl}/business/postEvent/`,
        {
          title,
          imageUrl,
          description,
          capacity,
          end_date,
          start_date,
          location,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          "Event posted successfully",
          3000
        )
      );
      dispatch(postEvent(response.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const commentPost = (beerId, comment) => {
  return async (dispatch, getState) => {
    try {
      const { token } = selectUser(getState());

      const response = await axios.post(
        `${apiUrl}/business/comment/${beerId}`,
        {
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(
        showMessageWithTimeout("success", false, response.data.message, 3000)
      );
      // console.log("dispatch", {
      //   beerId,
      //   comment: response.data,
      // });
      dispatch(
        postComment({
          beerId,
          comment: response.data,
        })
      );
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const ratingPost = (beerId, rating) => {
  return async (dispatch, getState) => {
    try {
      const { token } = selectUser(getState());

      const response = await axios.post(
        `${apiUrl}/business/rating/${beerId}`,
        {
          rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(
        showMessageWithTimeout("success", false, response.data.message, 3000)
      );
      dispatch(postRating(response.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};
