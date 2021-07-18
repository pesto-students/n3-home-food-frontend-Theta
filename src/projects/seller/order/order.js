import { Row, Tabs } from "antd";
import SpinnerLoader from "components/spinnerLoader/spinnerLoader";
import TabTag from "components/tag/tag";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { sessionId, catchError } from "utils/helpers";
import { getAllCurrentOrderSeller, getAllPastOrderSeller } from "../utils/api";
import CurrentOrders from "./currentOrder";
import PastOrders from "./pastOrder";

const SellerProducts = () => {
  const { t } = useTranslation();
  const { TabPane } = Tabs;

  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(2);
  const [CurrentOrderPage, setCurrentOrderPage] = useState(2);

  const [currentOrdersItem, setCurrentOrdersItem] = useState([]);
  const [pastOrdersItem, setPastOrdersItem] = useState([]);

  const getAllCurrentOrder = async (page) => {
    try {
      const response = await getAllCurrentOrderSeller(sessionId(), page);
      if (response.status === 200) {
        setCurrentOrdersItem(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      catchError(error);
    }
  };

  const getAllPastOrder = async (page) => {
    try {
      const response = await getAllPastOrderSeller(sessionId(), page);
      if (response.status === 200) {
        setPastOrdersItem(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      catchError(error);
    }
  };

  const fetchMoreProducts = () => {
    setPage(page + 1);
    getAllPastOrder(page);
  };

  const fetchMoreActiveOrders = () => {
    setCurrentOrderPage(CurrentOrderPage + 1);
    getAllCurrentOrder(CurrentOrderPage);
  };

  useEffect(() => {
    getAllCurrentOrder(1);
    getAllPastOrder(1);
  }, []);

  const refreshOrder = () => {
    getAllCurrentOrder(1);
    getAllPastOrder(1);
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
          <CurrentOrders
            callBack={refreshOrder}
            orders={currentOrdersItem}
            fetchMoreProducts={fetchMoreActiveOrders}
          />
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
          <PastOrders
            orders={pastOrdersItem}
            fetchMoreProducts={fetchMoreProducts}
          />
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
