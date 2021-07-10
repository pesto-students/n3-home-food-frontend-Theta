import { Card, Col, notification, Rate, Row, Tag } from "antd";

import Title from "antd/lib/typography/Title";
import React from "react";
import { rupeeSign } from "utils/constant";
import { useTranslation } from "react-i18next";
import { putRateToOrder } from "../utils/api";
import { orderTimeFormat } from "utils/helpers";

const CustomerCurrentOrders = ({ orders, callBack }) => {
  const { t } = useTranslation();

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
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.response
          ? error.response.data
          : "Something went wrong",
        placement: "topLeft",
      });
    }
  };

  return (
    <>
      {orders.map((item, key) => {
        return (
          <Col md={24}>
            <Card key={key} style={{ width: "100%" }} hoverable={true}>
              <Row justify="space-betwee">
                <Col md={12}>
                  <Title level={5}>
                    {t("MyOrders.Delivery Type")} :{" "}
                    <Tag color="processing">{item.DeliveryType}</Tag>
                  </Title>
                </Col>
                <Col md={12}>
                  <Row justify="end">
                    <Title level={5}>
                      {t("MyOrders.Received on")}{" "}
                      {orderTimeFormat(item.dateOrdered)}
                    </Title>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col md={24}>
                  <Title level={5}>
                    {" "}
                    {t("MyOrders.Order No")} - {item._id}
                  </Title>
                </Col>
                <Col md={24}>
                  <Title level={5}>
                    {t("MyOrders.Contact Number")} - {item.user.phone}
                  </Title>
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
                  <Title level={5}>
                    {item.orderItems.items.map((dish) => {
                      return `${dish.productId.name} - (${dish.quantity})`;
                    })}
                  </Title>
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
          </Col>
        );
      })}
    </>
  );
};

export default CustomerCurrentOrders;
