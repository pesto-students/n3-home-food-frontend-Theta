import { Tabs } from "antd";
import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import AllApprove from "./allApprove/allApprove";
import AllProducts from "./allProduct/allProducts";
import MyProducts from "./myProducts/myProducts";

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
    let sellerId = "60c9f9b635f0f7183a9a7497"
    axios
      .get(`/sellers/get/getproducts?sellerid=${sellerId}`)
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



 
  return (

    <Tabs defaultActiveKey="1">
    <TabPane tab={`All Products (${allProducts.length})`} key="1">
    <AllProducts
          products={allProducts}
            isLoading={isLoading}
            callback={getApproved}
          />    </TabPane>
    <TabPane tab={`My Products (${myProducts.length})`} key="2">

           <MyProducts
            products={myProducts}
            isLoading={isLoading}
            callback={getMyProducts}
          />
    </TabPane>
    <TabPane tab={`All Approve (${allApprove.length})`} key="3">
    <AllApprove products={allApprove} isLoading={isLoading} />
    </TabPane>
  </Tabs>
  );
 
        
};

export default SellerProducts;
