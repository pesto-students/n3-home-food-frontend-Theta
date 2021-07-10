import axios from "utils/axios";

export const fetchSellerProfile = async (id) => {
  let response = await axios
    .get(`/sellers/get/getproducts?sellerid=${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};

export const fetchCart = async (id) => {
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

export const updateCartItem = async (data) => {
  let response = await axios
    .post(`/cart`, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};

export const reassignProduct = async (productId, data) => {
  let response = await axios
    .put(`/products/product-reassign/${productId}`, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};

export const getApproveProduct = async () => {
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

export const rejectSeller = async (id) => {
  let response = await axios
    .put(`/sellers/reject/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};

export const approveSeller = async (id) => {
  let response = await axios
    .put(`/sellers/approve/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};
