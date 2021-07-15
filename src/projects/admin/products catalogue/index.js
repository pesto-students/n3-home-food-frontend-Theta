import { Tabs } from "antd";
import TabTag from "components/tag/tag";
import React, { useEffect, useState } from "react";
import { getAllApprovedProduct, getAllPendingProduct } from "../utils/api";
import AllProducts from "./allProducts/allProducts";
import ProductApproval from "./product Approval/productApproval";
import { catchError } from "utils/helpers";

const { TabPane } = Tabs;

function callback(key) {}

const ProductCatalogue = () => {
  const [approveProducts, setApproveProducts] = useState([]);
  const [pendingproducts, setPendingproducts] = useState([]);
  const [Approvepage, setAppovalPage] = useState(2);
  const [isLoading, setIsLoading] = useState(true);

  const allPending = async (page) => {
    try {
      const response = await getAllPendingProduct(page);
      if (response.status === 200) {
        setPendingproducts(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      catchError(error);
    }
  };

  const allApproved = async (page) => {
    try {
      const response = await getAllApprovedProduct(page);
      if (response.status === 200) {
        setApproveProducts(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      catchError(error);
    }
  };

  const fetchMoreAllProducts = () => {
    setAppovalPage(Approvepage + 1);
    allApproved(Approvepage);
  };

  const allTypeofProducts = () => {
    allPending(1);
    allApproved(1);
  };

  useEffect(() => {
    allPending(1);
    allApproved(1);
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
          loadAllProducts={allTypeofProducts}
          fetchMoreAllProducts={fetchMoreAllProducts}
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
          callBack={allTypeofProducts}
          products={pendingproducts}
          loadPenindgProducts={allPending}
        />
      </TabPane>
    </Tabs>
  );
};

export default ProductCatalogue;
