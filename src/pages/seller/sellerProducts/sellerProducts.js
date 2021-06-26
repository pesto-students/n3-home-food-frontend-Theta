import { Tabs } from "antd";
import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import AllApprove from "./allApprove/allApprove";
import AllProducts from "./allProduct/allProducts";
import MyProducts from "./myProducts/myProducts";
import { sessionId } from "../../../utils/helpers";
import TabTag from "../../../components/shared/tag/tag";

const SellerProducts = () => {
  const { TabPane } = Tabs;
  const [allProducts, setAllProducts] = useState([]);
  const [myProducts, setMyProducts] = useState([]);
  const [allApprove, setAllApprove] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getApproved = () => {
    axios
      .get(`/products/get/pending`)
      .then((result) => {
        setAllApprove(result.data);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  };

  const getAllProducts = () => {
    axios
      .get(`/products/get/approved`)
      .then((result) => {
        setAllProducts(result.data);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  };

  const getMyProducts = () => {
    axios
      .get(`/sellers/get/getproducts?sellerid=${sessionId()}`)
      .then((result) => {
        setMyProducts(result.data[0].myProducts);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getApproved();
    getAllProducts();
    getMyProducts();
  }, []);

  const allProductCallback = () => {
    getApproved();
    getMyProducts();
  };

  useEffect(() => {}, [allProducts, myProducts, allApprove]);

  return (
    <Tabs defaultActiveKey="1">
      <TabPane
        tab={<TabTag count={allProducts.length} text="All Products " />}
        key="1"
      >
        <AllProducts
          products={allProducts}
          isLoading={isLoading}
          callback={allProductCallback}
        />{" "}
      </TabPane>
      <TabPane
        tab={<TabTag count={myProducts.length} text="My Products" />}
        key="2"
      >
        <MyProducts
          products={myProducts}
          isLoading={isLoading}
          callback={getMyProducts}
        />
      </TabPane>
      <TabPane
        tab={<TabTag count={allApprove.length} text="All Approve" />}
        key="3"
      >
        <AllApprove products={allApprove} isLoading={isLoading} />
      </TabPane>
    </Tabs>
  );
};

export default SellerProducts;
