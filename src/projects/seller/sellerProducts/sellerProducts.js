import { Tabs, notification } from "antd";

import React, { useEffect, useState } from "react";
import AllApprove from "./allApprove/allApprove";
import AllProducts from "./allProduct/allProducts";
import MyProducts from "./myProducts/myProducts";
import { sessionId } from "utils/helpers";
import { useTranslation } from "react-i18next";
import TabTag from "components/tag/tag";
import {
  getSellerApprovedProduct,
  getAllProduct,
  getSellerListedProduct,
} from "../utils/api";

const SellerProducts = () => {
  const { t } = useTranslation();
  const { TabPane } = Tabs;
  const [allProducts, setAllProducts] = useState([]);
  const [myProducts, setMyProducts] = useState([]);
  const [allApprove, setAllApprove] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getApproved = async () => {
    try {
      const response = await getSellerApprovedProduct();
      if (response.status === 200) {
        setAllApprove(response.data);
        setIsLoading(false);
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

  const getAllProducts = async () => {
    try {
      const response = await getAllProduct();
      if (response.status === 200) {
        setAllProducts(response.data);
        setIsLoading(false);
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

  const getMyProducts = async () => {
    try {
      const response = await getSellerListedProduct(sessionId());
      if (response.status === 200) {
        setMyProducts(response.data[0].myProducts);
        setIsLoading(false);
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
        tab={
          <TabTag
            count={allProducts.length}
            text={t("seller.product.allProducts")}
          />
        }
        key="1"
      >
        <AllProducts
          products={allProducts}
          isLoading={isLoading}
          callback={allProductCallback}
        />{" "}
      </TabPane>
      <TabPane
        tab={
          <TabTag
            count={myProducts.length}
            text={t("seller.product.myProducts")}
          />
        }
        key="2"
      >
        <MyProducts
          products={myProducts}
          isLoading={isLoading}
          callback={getMyProducts}
        />
      </TabPane>
      <TabPane
        tab={
          <TabTag
            count={allApprove.length}
            text={t("seller.product.allApprove")}
          />
        }
        key="3"
      >
        <AllApprove products={allApprove} isLoading={isLoading} />
      </TabPane>
    </Tabs>
  );
};

export default SellerProducts;
