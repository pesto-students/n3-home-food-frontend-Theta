import axios from "utils/axios";
import { getCategoryId } from "utils/helpers";

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

export const getSellerByPage = async (pincode, page, tabSelected) => {
  let response
  if (tabSelected !== "All") {
    response = await axios
    .get(`sellers/get/SellersByCategoryFilter?categoryId=${getCategoryId(tabSelected)}&pincode=${pincode}&page=${page}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  } else {
     response = await axios
    .get(`/sellers/pincode/${pincode}?page=${page}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  }


  return response;
};

export const getCategorySeller = async (category, code) => {
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
