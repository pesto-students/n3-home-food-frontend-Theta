import { combineReducers } from "redux";
import initialState from "../data/initialState";
import LandingScreenState from "../data/landing";

import cart from "../data/cart";

const isAdminLoggedIn = (state = initialState.isAdminLoggedIn, action) => {
  if (action.type === "ADMIN_LOGGED") {
    console.log("state", action.value);
    return action.value;
  }

  return state;
};

const isCustomerLoginDrawerOpen = (
  state = LandingScreenState.isCustomerLoginDrawerOpen,
  action
) => {
  if (action.type === "DRAWER_STATUS") {
    return action.value;
  }
  return state;
};

const sellerIdInCart = (
  state = cart.sellerIdInCart,
  action
) => {
  if (action.type === "SELLER_IN_CART") {
    return action.value;
  }
  return state;
};

const myCart = (state = cart, action) => {
  if (action.type === "CART_LIST") {
    return action.value;
  }
  return state;
};

export default combineReducers({
  isAdminLoggedIn,
  myCart,
  isCustomerLoginDrawerOpen,
  sellerIdInCart
});
