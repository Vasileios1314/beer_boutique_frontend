const initialState = [];

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
    default:
      return state;
  }
}
