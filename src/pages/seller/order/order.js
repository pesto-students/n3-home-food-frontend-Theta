import { Tabs, Row } from "antd";
import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
// import axios from "../../../utils/axios";
import CurrentOrders from "./currentOrder";
import PastOrders from "./pastOrder";
import TabTag from "../../../components/shared/tag/tag";
import { sessionId } from "../../../utils/helpers";
import axios from "../../../utils/axios";
import SpinnerLoader from "../../../components/shared/spinnerLoader/spinnerLoader";

const SellerProducts = () => {
  const { TabPane } = Tabs;

  const [isLoading, setIsLoading] = useState(true);

  const [currentOrdersItem, setCurrentOrdersItem] = useState([]);
  const [pastOrdersItem, setPastOrdersItem] = useState([]);

  const getAllCurrentOrder = () => {
    axios
      .get(`/orders/get/${sessionId()}`)
      .then((result) => {
        setCurrentOrdersItem(result.data);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  };

  const getAllPastOrder = () => {
    axios
      .get(`/orders/get/${sessionId()}`)
      .then((result) => {
        setIsLoading(false);
        setPastOrdersItem(result.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getAllCurrentOrder();
    getAllPastOrder();
  }, []);

  const refreshOrder = () => {
    getAllCurrentOrder();
    getAllPastOrder();
  };

  return (
    <Tabs defaultActiveKey="1">
      <TabPane
        tab={<TabTag count={currentOrdersItem.length} text="Current Orders " />}
        key="1"
      >
        {!isLoading ? (
          <CurrentOrders callBack={refreshOrder} orders={currentOrdersItem} />
        ) : (
          <Row justify="center">
            <SpinnerLoader />
          </Row>
        )}
      </TabPane>
      <TabPane
        tab={<TabTag count={pastOrdersItem.length} text="Past Orders" />}
        key="2"
      >
        {!isLoading ? (
          <PastOrders orders={pastOrdersItem} />
        ) : (
          <Row justify="center">
            <SpinnerLoader />
          </Row>
        )}
      </TabPane>
    </Tabs>
  );
};

export default SellerProducts;
