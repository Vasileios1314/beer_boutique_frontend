const initialState = {
  loading: false,
  events: [],
};

export default function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case "EVENTS_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_EVENTS":
      return {
        ...state,
        loading: false,
        events: [...action.payload],
      };
    case "SET_ATTENDANCE":
      return { ...state, ...action.payload };
    case "SET_PROFILE":
      return { ...state, ...action.payload };
    case "SET_UNSUBSCRIBE":
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
