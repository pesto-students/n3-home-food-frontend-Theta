import React from 'react';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import AllProducts from './allProducts/allProducts';

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
      Content of Tab Pane 2
    </TabPane>

  </Tabs>
);

export default ProductCatalogue