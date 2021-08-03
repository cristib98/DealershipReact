import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import cars from "./cars"
import users from "./users"


export default combineReducers({
  auth,
  message,
  cars,
  users
});