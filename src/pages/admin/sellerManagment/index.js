import React from 'react';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import SellerApproval from './Seller Approval/sellerApproval';
import RejectedSellers from './rejectedSeller /rejectedSellers';
import PendingSellers from './pendingSellers/pendingSellers';
// import AllProducts from './allProducts/allProducts';
// import ProductApproval from './product Approval/productApproval';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const sellerManagment = () => (
  <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="Approved" key="1">
    <SellerApproval />
    </TabPane>
    <TabPane tab="Rejected" key="2">
   <RejectedSellers />
    </TabPane>
    <TabPane tab="Pending" key="3">
    <PendingSellers />
    </TabPane>

  </Tabs>
);

export default sellerManagment