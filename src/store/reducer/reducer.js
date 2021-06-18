import { combineReducers } from "redux";
import initialState from "../data/initialState";
import LandingScreenState from "../data/landing";

const isAdminLoggedIn = (state = initialState.isAdminLoggedIn, action) => {
  if (action.type === "ADMIN_LOGGED") {
    console.log('state',action.value )
    return action.value;
  }

  return state;
};

const isCustomerLoginDrawerOpen = (
  state = LandingScreenState.isCustomerLoginDrawerOpen,
  action
) => {
  if (action.type === "DRAWER_STATUS") {
    return  action.value 
  }
  return state;
};

export default combineReducers({
  isAdminLoggedIn,
  isCustomerLoginDrawerOpen,
});
