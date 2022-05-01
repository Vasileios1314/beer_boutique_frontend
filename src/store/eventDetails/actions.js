import axios from "axios";
import { apiUrl } from "../../config/constants";
import { showMessageWithTimeout } from "../appState/actions";
import { getUserWithStoredToken } from "../user/actions";
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

export const deleteEvent = (deleteEvent) => ({
  type: "DELETE_EVENT",
  payload: deleteEvent,
});
export const updatedLikes = (likes) => ({
  type: "LIKES_UPDATED",
  payload: likes,
});

export const deleteBeer = (deleteBeer) => ({
  type: "DELETE_BEER",
  payload: deleteBeer,
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
      if ((title, imageUrl, description, category, alcohoolRate, size, country))
        return;
      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          "Beer posted successfully",
          3000
        )
      );
      dispatch(postBeer(response.data));
      dispatch(getUserWithStoredToken());
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
      dispatch(getUserWithStoredToken());
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

      dispatch(
        postComment({
          beerId,
          comment: response.data,
        })
      );
      dispatch(fetchBusinessById());
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const eventDelete = (eventId) => {
  return async (dispatch, getState) => {
    try {
      const { token, id: ID } = selectUser(getState());

      const response = await axios.delete(
        `${apiUrl}/business/deleteevent/${eventId}`,
        { id: eventId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(showMessageWithTimeout("success", false, "Deleted", 3000));
      dispatch(deleteEvent(response.data));
      dispatch(getUserWithStoredToken(ID)); //this fetched the profile info again, so we don't have to update the reducer
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const likesUpdated = (likes, id) => {
  return async (dispatch, getState) => {
    try {
      const { token, id: ID } = selectUser(getState());

      console.log("likes", likes, id);
      const response = await axios.patch(
        `${apiUrl}/business/beer/${id}`,
        {
          likes: likes + 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(showMessageWithTimeout("success", false, "Like", 3000));
      dispatch(updatedLikes(response.data));
      dispatch(getUserWithStoredToken(ID));
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const beerDelete = (beerId) => {
  return async (dispatch, getState) => {
    try {
      const { id: ID } = selectUser(getState());

      const response = await axios.delete(
        `${apiUrl}/business/deletebeer/${beerId}`,
        { id: beerId }
      );
      dispatch(showMessageWithTimeout("success", false, "Deleted", 3000));
      dispatch(deleteEvent(response.data));
      dispatch(getUserWithStoredToken(ID));
    } catch (e) {
      console.log(e.message);
    }
  };
};
