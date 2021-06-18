import { combineReducers } from "redux";
import initialState from "../data/initialState";
import LandingScreenState from "../data/landing";

const isAdminLoggedIn = (state = initialState.isAdminLoggedIn, action) => {
  if (action.type === "ADMIN_LOGGED") {
    return action.value;
  }
  return state;
};

const isCustomerLoginDrawerOpen = (
  state = LandingScreenState.isCustomerLoginDrawerOpen,
  action
) => {
    if(action.type === 'DRAWER_STATUS'){
        console.log(state)
        // return state.isCustomerLoginDrawerOpen
    }
  return state;
};

export default combineReducers({
  isAdminLoggedIn,
  isCustomerLoginDrawerOpen,
});
