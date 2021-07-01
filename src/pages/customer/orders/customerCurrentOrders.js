import { Card, Col, notification, Rate, Row, Tag } from "antd";
import "antd/dist/antd.css";
import Title from "antd/lib/typography/Title";
import moment from "moment";
import React from "react";
import axios from "../../../utils/axios";
import { rupeeSign } from "../../../utils/constant";
import { useTranslation } from "react-i18next";

const CustomerCurrentOrders = ({ orders, callBack }) => {
  const { t } = useTranslation();

  const rateOrder = (rate, order) => {
    console.log(order);
    axios
      .put(`/orders/rate/${order.id}`, { rating: rate })
      .then((result) => {
        notification.success({
          message: `Notification`,
          description: `Order reviewed with ${rate} stars`,
          placement: "topRight",
        });
        callBack();
      })
      .catch((err) => console.error(err));
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
                  {t('MyOrders.Delivery Type')} :{" "}
                    <Tag color="processing">{item.DeliveryType}</Tag>
                  </Title>
                </Col>
                <Col md={12}>
                  <Row justify="end">
                    <Title level={5}>
                    {t('MyOrders.Received on')} {" "}
                      {moment(item.dateOrdered).format(
                        "dddd, MMMM Do YYYY, h:mm:ss a"
                      )}
                    </Title>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col md={24}>
                  <Title level={5}> {t('MyOrders.Order No')} - {item._id}</Title>
                </Col>
                <Col md={24}>
                  <Title level={5}>{t('MyOrders.Contact Number')} - {item.user.phone}</Title>
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
                    {t('MyOrders.Total')} : {rupeeSign} {item.totalPrice}
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
