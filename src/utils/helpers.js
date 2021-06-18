
export const setUser = (user) => {
  return localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const redirectToOriginalPageFromLanding = () => {
  const user = getUser();
  if (user) {
    if (user.user_type === "Admin") {
      window.location.href = "/admin/dashboard";
    }
    if (user.user_type === "Seller") {
       window.location.href = "/seller/dashboard";
    }
  } 
};
