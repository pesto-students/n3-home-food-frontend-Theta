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
      <Meta
        style={{ marginTop: 10 }}
        title={detail.display_name}
        description={detail.phone}
      />
      {detail.rating > 0 ? (
        <Rate
          className="move-from-top"
          disabled
          allowHalf={true}
          defaultValue={detail.rating}
        ></Rate>
      ) : (
        <p className="no-rating">No Rating</p>
      )}
    </Card>
  );
};

export default SellerCard;
