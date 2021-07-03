import axios from "utils/axios";

export const getAdminGraphDetails = async () => {
  let response = await axios
    .get(`/orders/get-total-revenue`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};

export const getAllOrderCount = async () => {
  let response = await axios
    .get(`/orders/allcount`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};

export const getAdminCategoryChartDetails = async () => {
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

export const getAllPendingProduct = async () => {
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
export const getAllApprovedProduct = async () => {
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

export const adminDeleteProduct = async (id) => {
  let response = await axios
    .delete(`/products/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};

export const getAllRejectedSeller = async () => {
  let response = await axios
    .get(`/sellers/get/rejected`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};

export const getAllApproveSeller = async () => {
  let response = await axios
    .get(`/sellers`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};

export const getAllPendingSeller = async () => {
  let response = await axios
    .get(`/sellers/get/pending`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};

export const approveSellerById = async (id) => {
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
