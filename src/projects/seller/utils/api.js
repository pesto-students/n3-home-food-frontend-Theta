import axios from "utils/axios";

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

export const editProfile = async (id, profileData) => {
  let response = await axios
    .put(`/sellers/edit/${id}`, profileData)
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
export const getSellerProfile = async (sessionId) => {
  let response = await axios
    .get(`/sellers/${sessionId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};

export const getGraphDetailSeller = async (dateString,sessionId) => {
  let response = await axios
    .get(`/orders/get-revenue-seller/${sessionId}?startDate=${dateString[0]}&endDate=${dateString[1]}`)
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

export const getSellerPieChartData = async (dateString,sessionId) => {
  //  sessionId = "60e1667429c1630022088549"
  let response = await axios
    .get(`/orders/categories-seller/${sessionId}?startDate=${dateString[0]}&endDate=${dateString[1]}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};

export const getSellerApprovedProduct = async () => {
  let response = await axios
    .get(`/products/get/pending`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};

export const getAllProduct = async () => {
  let response = await axios
    .get(`/products/get/approved`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};

export const getSellerListedProduct = async (sessionId) => {
  let response = await axios
    .get(`/sellers/get/getproducts?sellerid=${sessionId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};

export const setAddProductIntoMyProduct = async (sessionId, product) => {
  let response = await axios
    .put(`/sellers/${sessionId}`, product)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};

export const updateProduct = async (sessionId, product) => {
  let response = await axios
    .put(`/sellers/update-product-quantitiy/${sessionId}`, product)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};

export const deleteMyProduct = async (sessionId, product) => {
  let response = await axios
    .put(`/sellers/delete-product/${sessionId}`, product)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};

export const registerSeller = async (seller) => {
  let response = await axios
    .post(`/sellers/register`, seller)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};
