import React, { useEffect, useState } from "react";

import { Tabs, notification } from "antd";
import AllProducts from "./allProducts/allProducts";
import ProductApproval from "./product Approval/productApproval";
import TabTag from "components/tag/tag";
import { getAllPendingProduct, getAllApprovedProduct } from "../utils/api";

const { TabPane } = Tabs;

function callback(key) {}

const ProductCatalogue = () => {
  const [approveProducts, setApproveProducts] = useState([]);
  const [pendingproducts, setPendingproducts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const allPending = async () => {
    try {
      const response = await getAllPendingProduct();
      if (response.status === 200) {
        setIsLoading(false);
        setPendingproducts(response.data);
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

  const allApproved = async () => {
    try {
      const response = await getAllApprovedProduct();
      if (response.status === 200) {
        setIsLoading(false);
        setApproveProducts(response.data);
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

  useEffect(() => {
    allPending();
    allApproved();
  }, []);

  return (
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane
        tab={<TabTag count={approveProducts.length} text="All Products" />}
        key="1"
      >
        <AllProducts
          isLoading={isLoading}
          products={approveProducts}
          loadAllProducts={allApproved}
        />
      </TabPane>
      <TabPane
        tab={
          <TabTag
            key="2"
            count={pendingproducts.length}
            text="Product Approval "
          />
        }
      >
        <ProductApproval
          isLoading={isLoading}
          products={pendingproducts}
          loadPenindgProducts={allPending}
        />
      </TabPane>
    </Tabs>
  );
};

export default ProductCatalogue;
