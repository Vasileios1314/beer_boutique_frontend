const initialState = [];

export default function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_EVENTS":
      return [...action.payload];

    default:
      return state;
  }
}
