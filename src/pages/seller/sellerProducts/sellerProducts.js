import { Col, Row } from "antd";
import "antd/dist/antd.css";
import React, { useState } from "react";
import CustomTabs from "../../../components/shared/Tabs/Tabs";
import AllProducts from "./allProduct/allProducts";
import MyProducts from "./myProducts/myProducts";
import AllApprove from "./allApprove/allApprove";

const SellerProducts = () => {
  const [currentTab, setCurrentTab] = useState("All Products");

  function callback(key) {
    setCurrentTab(key);
  }
  return (
    <Row>
      <Col md={24}>
        <CustomTabs
          currentTab={callback}
          list={["All Products", "My Products","Product Approval"]}
        />
      </Col>
      <Col md={24}>
        {currentTab === "All Products" && <AllProducts/>}
        {currentTab === "My Products" &&  <MyProducts/>}
        {currentTab === "Product Approval" &&  <AllApprove/>}

      </Col>
    </Row>
  );
};

export default SellerProducts;
