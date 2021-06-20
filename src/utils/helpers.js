
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
  } 
};
