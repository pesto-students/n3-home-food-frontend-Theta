import { Tabs } from "antd";
import TabTag from "components/tag/tag";
import React, { useEffect, useState } from "react";
import {
  getAllApproveSeller,
  getAllPendingSeller,
  getAllRejectedSeller,
} from "../utils/api";
import PendingSellers from "./pendingSellers/pendingSellers";
import RejectedSellers from "./rejectedSeller /rejectedSellers";
import SellerApproval from "./Seller Approval/sellerApproval";
import { catchError } from "utils/helpers";

const SellerManagment = () => {
  const { TabPane } = Tabs;
  const [isLoading, setIsLoading] = useState(true);

  const [approveSellerItems, setApproveSellersItems] = useState([]);
  const [rejectedSellersItems, setRejectedSellersItems] = useState([]);
  const [pendingSellersItems, setPendingSellersItems] = useState([]);
  const [page] = useState(2);

  const callback = (key) => {};

  const rejectedSeller = async () => {
    try {
      const response = await getAllRejectedSeller();
      if (response.status === 200) {
        setRejectedSellersItems(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      catchError(error);
    }
  };

  const approveSeller = async (page) => {
    try {
      const response = await getAllApproveSeller();
      if (response.status === 200) {
        setApproveSellersItems(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      catchError(error);
    }
  };

  const pendingSeller = async () => {
    try {
      const response = await getAllPendingSeller();
      if (response.status === 200) {
        setPendingSellersItems(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      catchError(error);
    }
  };

  const fetchMoreSellers = () => {
    approveSeller(page);
  };

  const fetchAllSeller = () => {
    approveSeller(1);
    rejectedSeller();
    pendingSeller();
  };

  useEffect(() => {
    approveSeller(1);
    rejectedSeller();
    pendingSeller();
  }, []);

  return (
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane
        tab={<TabTag count={approveSellerItems.length} text="Approved" />}
        key="1"
      >
        <SellerApproval
          sellers={approveSellerItems}
          isLoading={isLoading}
          callback={fetchAllSeller}
          fetchMoreSellers={fetchMoreSellers}
        />
      </TabPane>
      <TabPane
        tab={<TabTag count={rejectedSellersItems.length} text="Rejected" />}
        key="2"
      >
        <RejectedSellers sellers={rejectedSellersItems} isLoading={isLoading} />
      </TabPane>
      <TabPane
        tab={<TabTag count={pendingSellersItems.length} text="Pending" />}
        key="3"
      >
        <PendingSellers
          sellers={pendingSellersItems}
          callback={fetchAllSeller}
          isLoading={isLoading}
        />
      </TabPane>
    </Tabs>
  );
};

export default SellerManagment;
