import "antd/dist/antd.css";
import { React } from "react";
import { Card, Row, Col, Rate, Tag } from "antd";
import Title from "antd/lib/typography/Title";
import { rupeeSign } from "../../../utils/constant";

const PastOrders = ({ orders }) => {
  return (
    <>
      {orders.map((item, key) => {
        return (
          <Card key={key}>
            <Row justify="space-betwee">
              <Col md={12}>
                <Title level={5}>
                  Delivery Type :{" "}
                  <Tag color="processing">{item.DeliveryType}</Tag>
                </Title>
              </Col>
              <Col md={12}>
                <Row justify="end">
                  <Title level={5}>Received on {item.dateOrdered}</Title>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={24}>
                <Title level={5}>Order No - {item._id}</Title>
              </Col>
              <Col md={24}>
                <Title level={5}>Contact Number - {item.user.phone}</Title>
              </Col>
            </Row>
            <Row justify="end">
              <Rate className="move-from-top" disabled defaultValue={2} />
            </Row>
            <hr></hr>
            <Row justify="space-betwee">
              <Col md={12}>
                <Title level={5}>
                  {item.orderItems.items.map((dish, key) => {
                    return `${dish.productId.name} - (${dish.quantity})`;
                  })}
                </Title>
              </Col>
              <Col md={12}>
                <Row justify="end">
                  <Title level={5}>
                    Total: {rupeeSign} {item.totalPrice}
                  </Title>
                </Row>
              </Col>
            </Row>
          </Card>
        );
      })}
    </>
  );
};

export default PastOrders;
