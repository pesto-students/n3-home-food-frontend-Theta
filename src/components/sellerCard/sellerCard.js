import React from "react";

import { Card, Rate } from "antd";
import Image from "../image/image";
import "./seller.css";

const { Meta } = Card;

const SellerCard = ({ detail }) => {
  return (
    <Card
      hoverable
      style={{ width: "100%", margin: "0px" }}
      cover={<Image height="150px" width="100%" url={detail.image} />}
    >
      <Meta title={detail.display_name} description={detail.phone} />
      <Rate
        className="move-from-top"
        disabled
        allowHalf={true}
        defaultValue={detail.rating}
      ></Rate>
    </Card>
  );
};

export default SellerCard;
