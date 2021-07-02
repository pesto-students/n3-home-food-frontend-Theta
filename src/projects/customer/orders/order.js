import { Row } from "antd";
import "./order.css";
import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import CustomerNavbar from "../../../components/shared/customerNavbar/customerNavbar";
import SpinnerLoader from "../../../components/shared/spinnerLoader/spinnerLoader";
import axios from "utils/axios";
import CustomerCurrentOrders from "./customerCurrentOrders";

const SellerProducts = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [currentOrdersItem, setCurrentOrdersItem] = useState([]);

  const getAllCurrentOrder = () => {
    axios
      .get(`/orders/`)
      .then((result) => {
        setCurrentOrdersItem(result.data);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getAllCurrentOrder();
  }, []);

  const refreshOrder = () => {
    getAllCurrentOrder();
  };

  return (
    <>
      <CustomerNavbar />

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
