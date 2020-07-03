import { combineReducers } from "@reduxjs/toolkit";
/// project files
import weatherReducer from "./weatherSlice";
import mapReducer from "./mapSlice";
import userReducer from "./userSlice";

const rootReducer = combineReducers({
  weather: weatherReducer,
  map: mapReducer,
  user: userReducer,
});

export default rootReducer;
