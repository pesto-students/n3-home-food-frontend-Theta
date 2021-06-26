import { Tabs } from "antd";
import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
// import axios from "../../../utils/axios";
import CurrentOrders from "./currentOrder";
import PastOrders from "./pastOrder";
import TabTag from "../../../components/shared/tag/tag";

const SellerProducts = () => {
  const { TabPane } = Tabs;

  const [currentOrdersItem, setCurrentOrdersItem] = useState([]);
  const [pastOrdersItem, setPastOrdersItem] = useState([]);

  useEffect(() => {
    setCurrentOrdersItem([]);
    setPastOrdersItem([]);
  }, []);

  return (
    <Tabs defaultActiveKey="1">
      <TabPane
        tab={<TabTag count={currentOrdersItem.length} text="Current Orders " />}
        key="1"
      >
        <CurrentOrders />
      </TabPane>
      <TabPane
        tab={<TabTag count={pastOrdersItem.length} text="Past Orders" />}
        key="2"
      >
        <PastOrders />
      </TabPane>
    </Tabs>
  );
};

export default SellerProducts;
