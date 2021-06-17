import React from 'react';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
// import AllProducts from './allProducts/allProducts';
// import ProductApproval from './product Approval/productApproval';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const sellerManagment = () => (
  <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="Approved" key="1">
    {/* <AllProducts /> */}
    </TabPane>
    <TabPane tab="Rejected" key="2">
    {/* <ProductApproval /> */}
    </TabPane>
    <TabPane tab="Pending" key="3">
    {/* <ProductApproval /> */}
    </TabPane>

  </Tabs>
);

export default sellerManagment