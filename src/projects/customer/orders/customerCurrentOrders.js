import { Card, Col, notification, Rate, Row, Tag, Typography } from "antd";

import React from "react";
import { rupeeSign } from "utils/constant";
import { useTranslation } from "react-i18next";
import { putRateToOrder } from "../utils/api";
import { orderTimeFormat } from "utils/helpers";

const CustomerCurrentOrders = ({ orders, callBack }) => {
  const { t } = useTranslation();
  const { Text, Title } = Typography;

  const rateOrder = async (rate, order) => {
    try {
      const response = await putRateToOrder(order.id, { rating: rate });
      if (response.status === 200) {
        notification.success({
          message: `Notification`,
          description: `Order reviewed with ${rate} stars`,
          placement: "topRight",
        });
        callBack();
      }
    } catch (error) {}
  };

  return (
    <>
      {orders.map((item, key) => {
        return (
          <Card key={key} className="order-card" hoverable={true}>
            <Row className="order-row-header" justify="space-betwee">
              <Col md={12}>
                <Text>
                  {t("MyOrders.Delivery Type")} :{" "}
                  <Tag color="processing">{item.DeliveryType}</Tag>
                </Text>
              </Col>
              <Col md={12}>
                <Row justify="end">
                  <Text>
                    {t("MyOrders.Received on")}{" "}
                    {orderTimeFormat(item.dateOrdered)}
                  </Text>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={24}>
                <Text>
                  {" "}
                  {t("MyOrders.Order No")} - {item._id}
                </Text>
              </Col>
              <Col md={24}>
                <Text>
                  {t("MyOrders.Contact Number")} - {item.phone}
                </Text>
              </Col>
            </Row>
            <Row justify="end">
              {item.status === "Pending" ? (
                <Tag>{item.status}</Tag>
              ) : (
                <Rate
                  className="move-from-top"
                  onChange={(e) => rateOrder(e, item)}
                  defaultValue={item.rating}
                />
              )}
            </Row>
            <hr></hr>
            <Row justify="space-betwee">
              <Col md={12}>
                <Text>
                  {item.orderItems.items.map((dish) => {
                    return `${dish.productId.name} - (${dish.quantity})`;
                  })}
                </Text>
              </Col>
              <Col md={12}>
                <Row justify="end">
                  <Title level={5}>
                    {t("MyOrders.Total")} : {rupeeSign} {item.totalPrice}
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

export default CustomerCurrentOrders;
