import axios from "./axios";

export const getSeller = async (pincode) => {
  let response = await axios
    .get(`/sellers/pincode/${pincode}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};

export const getCategorySeller = async (category) => {
  let response = await axios
    .get(`sellers/get/SellersByCategory?categoryId=${category}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};
