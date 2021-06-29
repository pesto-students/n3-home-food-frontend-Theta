import "antd/dist/antd.css";
import React, { useState } from "react";
import { Card, Row, Tag, Col, Button, notification } from "antd";
import Title from "antd/lib/typography/Title";
import { rupeeSign } from "../../../utils/constant";
import axios from "../../../utils/axios";
import { sessionId } from "../../../utils/helpers";

const CurrentOrders = ({ orders, callBack }) => {
  const [isLoading, setIsLoading] = useState(false);

  const delived = () => {
    setIsLoading(true);
    axios
      .post(`/orders/get/${sessionId()}`)
      .then((result) => {
        notification.success({
          message: `Notification`,
          description: "Order has been successfully delivered",
          placement: "topRight",
        });
        setIsLoading(false);
        callBack();
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

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
              <Button type="primary" loading={isLoading} onClick={delived}>
                Deliver
              </Button>
            </Row>
            <hr></hr>
            <Row justify="space-betwee">
              <Col md={12}>
                <Title level={5}>
                  {item.orderItems.items.map((dish) => {
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

export default CurrentOrders;
