import { Col, Row } from "antd";
import "antd/dist/antd.css";
import React, { useState } from "react";
import CustomTabs from "../../../components/shared/Tabs/Tabs";
import AllProducts from "./allProduct/allProducts";

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
        {currentTab === "My Products" && <h1>All my</h1>}
        {currentTab === "My Products" && <h1>All my</h1>}

      </Col>
    </Row>
  );
};

export default SellerProducts;
