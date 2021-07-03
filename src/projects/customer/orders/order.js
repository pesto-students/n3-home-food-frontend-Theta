import { Row } from "antd";
import "./order.css";
import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import CustomerNavbar from "components/customerNavbar/customerNavbar";
import SpinnerLoader from "components/spinnerLoader/spinnerLoader";
import CustomerCurrentOrders from "./customerCurrentOrders";
import { getAllCurrentOrder } from "utils/api";

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

  useEffect(() => {
    getOrder();
  }, []);

  const refreshOrder = () => {
    getOrder();
  };

  return (
    <>
      <CustomerNavbar updatePincode={() => 0} />

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
