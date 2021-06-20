import { Col, Row } from "antd";
import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import CustomTabs from "../../../components/shared/Tabs/Tabs";
import axios from "../../../utils/axios";
import AllApprove from "./allApprove/allApprove";
import AllProducts from "./allProduct/allProducts";
import MyProducts from "./myProducts/myProducts";

const SellerProducts = () => {
  const [currentTab, setCurrentTab] = useState("All Products");
  const [allProducts, setAllProducts] = useState([]);
  const [myProducts, setMyProducts] = useState([]);
  const [allApprove, setAllApprove] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function callback(key) {
    setCurrentTab(key);
  }


  const getApproved = () => {
    axios
      .get(`/products/get/approved`)
      .then((result) => {
        setAllApprove(result.data);
        setIsLoading(false)
      })
      .catch((err) => console.error(err))
  };

  
  const getAllProducts = () => {
    axios
      .get(`/products/get/approved`)
      .then((result) => {
        setAllProducts(result.data);
        setIsLoading(false)

      })
      .catch((err) => console.error(err))
  };

  const getMyProducts = () => {
    axios
      .get(`/sellers/get/getproducts?sellerid=60c9f9b635f0f7183a9a7497`)
      .then((result) => {
        
        setMyProducts(result.data[0].myProducts);
        setIsLoading(false)

      })
      .catch((err) => console.error(err))
  };

  useEffect(() => {
    getApproved()
    getAllProducts()
    getMyProducts()
  }, []);


  useEffect(()=>{

  },[allProducts,myProducts,allApprove])

  const tabs = {
    productApprovale: `Product Approval (${allApprove.length})`,
    myProducts: `My Product (${myProducts.length})`,
    allProducts: `All Product (${allApprove.length})`,
  };


 
  return (
    <Row>
      <Col md={24}>
        <CustomTabs
          currentTab={callback}
          list={[tabs.allProducts, tabs.myProducts, tabs.productApprovale]}
        />
      </Col>

      <Col md={24}>
        {currentTab === tabs.allProducts && (
          <AllProducts
          products={allProducts}
            isLoading={isLoading}
            callback={getAllProducts}
          />
        )}
        {currentTab === tabs.myProducts && (
          myProducts.length > 0 ?
          <MyProducts
            products={myProducts}
            isLoading={isLoading}
            callback={getMyProducts}
          />
          :
          null
        )}
        {currentTab === tabs.productApprovale && (
          allApprove.length > 0 ?
          <AllApprove products={allApprove} isLoading={isLoading} />
          :
          null
        )}
      </Col>
    </Row>
  );
 
        
};

export default SellerProducts;
