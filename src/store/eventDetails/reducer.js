const initialState = {
  id: null,
  title: "",
  description: "",
  imageUrl: "",
  urerId: null,
  events: [],
  beers: [],
};

export default function eventDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case "EVENT_DETAILS":
      return { ...state, ...action.payload };
    case "SET_BUSINESS":
      return { ...state, ...action.payload };
    case "POST_BEER":
      return { ...state, ...action.payload };
    case "POST_EVENT":
      return { ...state, ...action.payload };
    case "POST_COMMENT":
      // map over beers, for the specific beer - add one comment
      const { beerId, comment } = action.payload;
      const updatedBeers = state.beers.map((beer) => {
        if (beer.id === beerId)
          return {
            ...beer,
            comments: [...beer.comments, comment],
          };

        return beer;
      });
      console.log("updated beers", updatedBeers);
      return {
        ...state,
        beers: updatedBeers,
      };
    case "POST_RATING":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
