import React from 'react';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import AllProducts from './allProducts/allProducts';
import ProductApproval from './product Approval/productApproval';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const ProductCatalogue = () => (
  <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="All Products" key="1">
    <AllProducts />
    </TabPane>
    <TabPane tab="Product Approval" key="2">
    <ProductApproval />
    </TabPane>

  </Tabs>
);

export default ProductCatalogue