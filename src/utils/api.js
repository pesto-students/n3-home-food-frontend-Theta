import axios from "./axios";

export const getAllSellerByPincode = async (pincode) => {
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

export const getAllSellerByCategory = async (category, code) => {
  let response = await axios
    .get(`sellers/get/SellersByCategory?categoryId=${category}&pincode=${code}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};
