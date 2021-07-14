import { Tabs } from "antd";
import TabTag from "components/tag/tag";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { sessionId } from "utils/helpers";
import {
  getAllProduct, getSellerApprovedProduct,

  getSellerListedProduct
} from "../utils/api";
import AllApprove from "./allApprove/allApprove";
import AllProducts from "./allProduct/allProducts";
import MyProducts from "./myProducts/myProducts";


const SellerProducts = () => {
  const { t } = useTranslation();
  const { TabPane } = Tabs;
  const [allProducts, setAllProducts] = useState([]);
  const [myProducts, setMyProducts] = useState([]);
  const [allApprove, setAllApprove] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(2);

  const getApproved = async (page) => {
    try {
      const response = await getSellerApprovedProduct(page);
      if (response.status === 200) {
        let updatedProducts = [];
        response.data.forEach((element) => {
          updatedProducts.push(element);
        });
        setAllApprove((allApprove) => [...allApprove, ...updatedProducts]);
        setIsLoading(false);
      }
    } catch (error) {}
  };

  const getAllProducts = async (page) => {
    try {
      const response = await getAllProduct(page);
      if (response.status === 200) {
        let updatedProducts = [];
        response.data.forEach((element) => {
          updatedProducts.push(element);
        });
        setAllProducts((allProducts) => [...allProducts, ...updatedProducts]);
        setIsLoading(false);
      }
    } catch (error) {}
  };

  const getMyProducts = async () => {
    try {
      const response = await getSellerListedProduct(sessionId());
      if (response.status === 200) {
        setMyProducts(response.data[0].myProducts);
        setIsLoading(false);
      }
    } catch (error) {}
  };

  const fetchMoreProducts = () => {
    setPage(page + 1);
    getAllProducts(page);
  };

  useEffect(() => {
    getApproved(1);
    getAllProducts(1);
    getMyProducts();
  }, []);

  const allProductCallback = () => {
    getApproved();
    getMyProducts();
  };

  useEffect(() => {}, [allProducts, myProducts, allApprove]);

  const callback = () => {};
  return (
    <Tabs defaultActiveKey="1" onChange={callback}>
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
          fetchMoreProducts={fetchMoreProducts}
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
