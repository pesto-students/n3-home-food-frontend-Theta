import axios from "utils/axios";
import { setUser } from "utils/helpers";
import { notification } from "antd";

export const loginUser = async (info) => {
  let url;
  if (info.customerType === "Admin") {
    url = "/admin/login";
  } else if (info.customerType === "Seller") {
    url = "/sellers/login";
  } else if (info.customerType === "Customer") {
    url = "users/login";
  }

  let response = await axios
    .post(url, info)
    .then((response) => {
      setUser(response.data);
      if (response.data.userType === "Admin") {
        window.location.href = "/admin/dashboard";
      }
      if (response.data.userType === "Seller") {
        window.location.href = "/seller/dashboard";
      }
      if (response.data.userType === "Customer") {
        window.location.href = "/customer";
      }
      return response;
    })
    .catch((error) => {
      notification.error({
        message: "Error",
        description: error.response.data,
        placement: "topLeft",
      });
      return error.response;
    });
  return response;
};
