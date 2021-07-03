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

export const getUserCart = async () => {
  let response = await axios
    .get(`/cart/`)
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

export const orderDelived = async (id) => {
  let response = await axios
    .put(`/orders/approve-order/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};

export const getAllCurrentOrderSeller = async (sessionId) => {
  let response = await axios
    .get(`/orders/get/${sessionId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};

export const getAllPastOrderSeller = async (sessionId) => {
  let response = await axios
    .get(`/orders/get-approved/${sessionId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};

export const getGraphDetailSeller = async (sessionId) => {
  let response = await axios
    .get(`/orders/get-revenue-seller/${sessionId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};

export const getSellerDetailsWallet = async (sessionId) => {
  let response = await axios
    .get(`/orders/seller-wallet/${sessionId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};

export const getSellerPieChartData = async () => {
  let response = await axios
    .get(`/orders/orders-category-wise`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};
