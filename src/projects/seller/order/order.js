import { Tabs, Row } from "antd";
import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
// import axios from "utils/axios";
import CurrentOrders from "./currentOrder";
import PastOrders from "./pastOrder";
import TabTag from "components/tag/tag";
import { sessionId } from "utils/helpers";
import axios from "utils/axios";
import SpinnerLoader from "components/spinnerLoader/spinnerLoader";
import { useTranslation } from "react-i18next";

const SellerProducts = () => {
  const { t } = useTranslation();
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
      .get(`/orders/get-approved/${sessionId()}`)
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
        tab={
          <TabTag
            count={currentOrdersItem.length}
            text={t("seller.order.currentOrder")}
          />
        }
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
        tab={
          <TabTag
            count={pastOrdersItem.length}
            text={t("seller.order.pastOrder")}
          />
        }
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
