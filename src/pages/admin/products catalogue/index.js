import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import AllProducts from './allProducts/allProducts';
import ProductApproval from './product Approval/productApproval';
import { baseUrlAdmin } from '../../../utils/constant';
import axios from '../../../utils/axios';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const ProductCatalogue = () => {
  const [approveProducts, setApproveProducts] = useState([]);
  const [penidngproducts, setPenidngproducts] = useState([]);

  
  const [isLoading, setIsLoading] = useState(true);


  const allPending = () =>{
    axios
    .get(`${baseUrlAdmin}/products/get/pending`)
    .then((result) => {
      setPenidngproducts(result.data);
    })
    .catch((err) => console.error(err))
    .finally(() => setIsLoading(false));
  }

  const allApproved  = () =>{
    axios
    .get(`${baseUrlAdmin}/products/get/approved`)
    .then((result) => {
      setApproveProducts(result.data);
    })
    .catch((err) => console.error(err))
    .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    allPending()
    allApproved()
  }, []);


 return <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab={`All Products (${approveProducts.length})`} key="1">
    <AllProducts isLoading={isLoading} products={approveProducts} loadAllProducts={allApproved} />
    </TabPane>
    <TabPane tab={`Product Approval (${penidngproducts.length})`} key="2">
    <ProductApproval  isLoading={isLoading} products={penidngproducts} loadPenindgProducts={allPending}   />
    </TabPane>

  </Tabs>
}

export default ProductCatalogue