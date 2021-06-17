import React from "react";
import "antd/dist/antd.css";
import { Card } from "antd";
import Image from "../image/image";

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
   
    <Meta title= {detail.name} description= {detail.name} />
  </Card>
}

export default SellerCard
