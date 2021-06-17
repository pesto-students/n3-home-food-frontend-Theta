import React from "react";
import "antd/dist/antd.css";
import { Card,Rate } from "antd";
import Image from "../image/image";
import './seller.css'

const { Meta } = Card;


const SellerCard= ({detail}) =>{
    return <Card
    hoverable
    style={{ width: '100%',margin:'0px' }}
    cover={
      <Image
        height="150px"
        width="100%"
        url={"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/ndbykjavkxko09lutd18"}
      />
    }
  >
   
    <Meta title= "THE FLAVOR OF HOME--34 mins₹ 200 for two" description= "Punjabi, Snacks, Beverages" />
    <Rate className="move-from-top" disabled defaultValue={2} ></Rate>
  </Card> 
}

export default SellerCard
