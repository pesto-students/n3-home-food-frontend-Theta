import { Row } from "antd";
import "./order.css";

import React, { useEffect, useState } from "react";
import CustomerNavbar from "components/customerNavbar/customerNavbar";
import SpinnerLoader from "components/spinnerLoader/spinnerLoader";
import CustomerCurrentOrders from "./customerCurrentOrders";
import { getAllCurrentOrder } from "../utils/api";
import { getUser, setPincode } from "utils/helpers";

const SellerProducts = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [currentOrdersItem, setCurrentOrdersItem] = useState([]);

  const getOrder = async () => {
    try {
      const response = await getAllCurrentOrder();
      if (response.status === 200) {
        setCurrentOrdersItem(response.data);
        setIsLoading(false);
      }
    } catch (error) {}
  };

  const user = getUser() ? getUser().userType : null;
  useEffect(() => {
    if (user === "Seller") window.location.href = "/seller/dashboard";
    if (user === "Admin") window.location.href = "/admin/dashboard";
    if (user === null) window.location.href = "/";
  }, [user]);

  useEffect(() => {
    getOrder();
  }, []);

  const refreshOrder = () => {
    getOrder();
  };

  const updatePincode = (code) => {
    setPincode(code);
  };

  return (
    <>
      <CustomerNavbar updatePincode={updatePincode} />

      <div className="my-order">
        <h4>My Orders</h4>

        {!isLoading ? (
          <CustomerCurrentOrders
            callBack={refreshOrder}
            orders={currentOrdersItem}
          />
        ) : (
          <Row justify="center" className="mt-20">
            <SpinnerLoader />
          </Row>
        )}
      </div>
    </>
  );
};

export default SellerProducts;
