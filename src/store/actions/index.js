export const setAsAdminLoggedIn = () => ({
  type: "ADMIN_LOGGED",
  value: true,
});
export const setAsAdminLoggedOut = (value) => ({
  type: "ADMIN_LOGGED",
  value: false,
});
export const setLogInAdminInfo = (value) => ({
  type: "ADMIN_LOGIN",
  value,
});
export const setIsCustomerLoginDrawerOpen = (value) => ({
  type: "DRAWER_STATUS",
  value: value,
});

export const setSellerIdInCart = (value) => ({
  type: "SELLER_IN_CART",
  value: value,
});

export const manageMyCart = (value) => ({
  type: "CART_LIST",
  value: value,
});
