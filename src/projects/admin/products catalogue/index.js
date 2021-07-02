import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Tabs } from "antd";
import AllProducts from "./allProducts/allProducts";
import ProductApproval from "./product Approval/productApproval";
import { baseUrl } from "utils/constant";
import axios from "utils/axios";
import TabTag from "components/tag/tag";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const ProductCatalogue = () => {
  const [approveProducts, setApproveProducts] = useState([]);
  const [pendingproducts, setPendingproducts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const allPending = () => {
    axios
      .get(`${baseUrl}/products/get/pending`)
      .then((result) => {
        setPendingproducts(result.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  const allApproved = () => {
    axios
      .get(`${baseUrl}/products/get/approved`)
      .then((result) => {
        setApproveProducts(result.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
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
