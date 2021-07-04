import moment from "moment";

export const setUser = (user) => {
  return localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const redirectToOriginalPageFromLanding = () => {
  const user = getUser();
  if (user) {
    if (user.userType === "Admin") {
      window.location.href = "/admin/dashboard";
    }
    if (user.userType === "Seller") {
      window.location.href = "/seller/dashboard";
    }
    if (user.userType === "Customer") {
      window.location.href = "/customer";
    }
  }
};

export const getCategoryId = (category) => {
  if (category === "Breakfast") {
    return "60c906ce35453e14cd3f4ee3";
  } else if (category === "Lunch") {
    return "60ccfb4516659e249450ed49";
  } else if (category === "Snack") {
    return "60ccfea78d901732e097e2ee";
  } else if (category === "Dinner") {
    return "60cf33b093112a14d5da3897";
  }
};

export const sessionId = () => {
  let user = getUser();
  return user ? user.id : "";
};

export const setPincode = (code) => {
  localStorage.setItem("pincode", code);
};

export const getPincode = () => {
  return localStorage.getItem("pincode");
};

export const orderTimeFormat = (date) => {
  return moment(date).format("dddd, MMMM Do YYYY, h:mm a");
};
