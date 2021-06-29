import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import SellerApproval from './Seller Approval/sellerApproval';
import RejectedSellers from './rejectedSeller /rejectedSellers';
import PendingSellers from './pendingSellers/pendingSellers';
import axios from '../../../utils/axios';
import { baseUrl } from '../../../utils/constant';
// import AllProducts from './allProducts/allProducts';
// import ProductApproval from './product Approval/productApproval';



const SellerManagment = () => {
  
  const { TabPane } = Tabs;
  const [isLoading, setIsLoading] = useState(true);

  const [approveSellerItems, setApproveSellersItems] = useState([]);
  const [rejectedSellersItems, setRejectedSellersItems] = useState([]);
  const [pendingSellersItems, setPendingSellersItems] = useState([]);
  

  const callback = (key) => {
    console.log(key);
  }


  const rejectedSeller = () =>{
    axios
    .get(`${baseUrl}/sellers/get/rejected`)
    .then((result) => {
      setRejectedSellersItems(result.data);
    })
    .catch((err) => console.error(err))
    .finally(() => setIsLoading(false));
  }

  const approveSeller = () =>{
    axios
    .get(`${baseUrl}/sellers`)
    .then((result) => {
      setApproveSellersItems(result.data);
    })
    .catch((err) => console.error(err))
    .finally(() => setIsLoading(false));
  }

  const pendingSeller = () =>{
    axios
    .get(`${baseUrl}/sellers/get/pending`)
    .then((result) => {
      setPendingSellersItems(result.data);
    })
    .catch((err) => console.error(err))
    .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    approveSeller()
    rejectedSeller()
    pendingSeller()
   
  }, []);

  


  return <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab={`Approved (${approveSellerItems.length})`} key="1">
    <SellerApproval sellers={approveSellerItems}  isLoading={isLoading} callback={approveSeller}/>
    </TabPane>
    <TabPane tab={`Rejected (${rejectedSellersItems.length})`} key="2">
   <RejectedSellers sellers={rejectedSellersItems} isLoading={isLoading} />
    </TabPane>
    <TabPane tab={`Pending (${pendingSellersItems.length})`} key="3">
    <PendingSellers sellers={pendingSellersItems} callback={pendingSeller} isLoading={isLoading} />
    </TabPane>

  </Tabs>
}

export default SellerManagment







