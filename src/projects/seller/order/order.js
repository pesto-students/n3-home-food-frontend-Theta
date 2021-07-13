import { Tabs, Row, notification } from "antd";

import React, { useEffect, useState } from "react";
import CurrentOrders from "./currentOrder";
import PastOrders from "./pastOrder";
import TabTag from "components/tag/tag";
import { sessionId } from "utils/helpers";
import SpinnerLoader from "components/spinnerLoader/spinnerLoader";
import { useTranslation } from "react-i18next";
import { getAllCurrentOrderSeller, getAllPastOrderSeller } from "../utils/api";

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
      const response = await getAllCurrentOrderSeller(sessionId(),page);
      if (response.status === 200) {
          let updatedOrders = []
          response.data.forEach(element => {
            updatedOrders.push(element)
          } )
          setCurrentOrdersItem(currentOrdersItem => [...currentOrdersItem , ...updatedOrders]);
          setIsLoading(false);
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.response
          ? error.response.data
          : "Something went wrong",
        placement: "topLeft",
      });
    }
  };

  const getAllPastOrder = async (page) => {
    try {
      const response = await getAllPastOrderSeller(sessionId(),page);
      if (response.status === 200) {
        let updatedOrders = []
        response.data.forEach(element => {
          updatedOrders.push(element)
        } )
        setPastOrdersItem(pastOrdersItem => [...pastOrdersItem , ...updatedOrders]);
        setIsLoading(false);
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.response
          ? error.response.data
          : "Something went wrong",
        placement: "topLeft",
      });
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
          <CurrentOrders callBack={refreshOrder} orders={currentOrdersItem} fetchMoreProducts={fetchMoreActiveOrders} />
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
