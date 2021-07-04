import axios from "utils/axios";

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

export const getAllCurrentOrder = async () => {
  let response = await axios
    .get(`/orders/`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};

export const getUserCart = async (id) => {
  let response = await axios
    .get(`/cart/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};

export const putRateToOrder = async (id, rate) => {
  let response = await axios
    .put(`/orders/rate/${id}`, rate)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};
