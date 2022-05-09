import { useBootstrapBreakpoints } from "react-bootstrap/esm/ThemeProvider";

const initialState = [];

/*
const initialState = {
    id: null,
    title: "",
    description: "",
    imageUrl: "",
    userId: null,
    events: [],
    beers: [],
}
*/

export default function eventDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case "EVENT_DETAILS":
      return { ...state, ...action.payload };
    case "SET_BUSINESS":
      return { ...state, ...action.payload };
    case "SET_ALLBUSINESS":
      return { ...state, ...action.payload };
    case "POST_BEER":
      return { ...state, ...action.payload };
    case "POST_EVENT":
      return { ...state, ...action.payload };
    case "POST_COMMENT":
      const { beerId, comment } = action.payload;
      const updatedBeers = state.beers.map((beer) => {
        if (beer.id === beerId)
          return {
            ...beer,
            comments: [...beer.comments, comment],
          };

        return beer;
      });

      return {
        ...state,
        beers: updatedBeers,
      };
    case "DELETE_EVENT":
      return { ...state, ...action.payload };
    case "LIKES_UPDATED":
      return {
        ...state,
        beers: state.beers.map((beer) => {
          if (beer.id === action.payload.beerLikes.id) {
            return {
              ...beer,
              likes: beer.likes + 1,
            };
          }

          return beer;
        }),
      };
    case "DELETE_BEER":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
