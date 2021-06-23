import { Tabs } from "antd";
import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import CurrentOrders from "./currentOrder";
import PastOrders from "./pastOrder";

const SellerProducts = () => {

  const { TabPane } = Tabs;


  const [currentOrdersItem, setCurrentOrdersItem] = useState([]);
  const [pastOrdersItem, setPastOrdersItem] = useState([]);


  useEffect(() => {
  }, []);




 
  return (
    <Tabs defaultActiveKey="1">
    <TabPane tab={`Current Orders (${currentOrdersItem.length})`} key="1">
        <CurrentOrders/>
    </TabPane>
    <TabPane tab={`Past Orders (${pastOrdersItem.length})`} key="2">
      <PastOrders/>
    </TabPane>
  
  </Tabs>
  );
 
        
};

export default SellerProducts;
