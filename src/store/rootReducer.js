import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import eventsReducer from "./events/reducer";
import eventDetailsReducer from "./eventDetails/reducer";

export default combineReducers({
  appState,
  events: eventsReducer,
  eventDetails: eventDetailsReducer,
  user,
});
