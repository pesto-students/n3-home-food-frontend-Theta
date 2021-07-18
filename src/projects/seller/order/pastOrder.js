import React from "react";

import { Card, Row, Col, Rate, Tag, Typography } from "antd";
import { rupeeSign } from "utils/constant";
import DataNotFound from "components/dataNotFound/dataNotFound";
import { useTranslation } from "react-i18next";
import { orderTimeFormat } from "utils/helpers";

const PastOrders = ({ orders, fetchMoreProducts }) => {
  const { t } = useTranslation();
  const { Text, Title } = Typography;

  if (orders.length === 0) {
    return (
      <Row className="m-2 mt-4" justify="center">
        <DataNotFound text="No Data Found!" />
      </Row>
    );
  }

  return (
    <>
      {orders.map((item, key) => {
        return (
          <Card key={key}>
            <Row justify="space-betwee">
              <Col md={12}>
                <Text>
                  {t("seller.order.deliveryType")} :{" "}
                  <Tag color="processing">{item.DeliveryType}</Tag>
                </Text>
              </Col>
              <Col md={12}>
                <Row justify="end">
                  <Text>
                    {t("seller.order.receivedOn")}
                    {"  "}
                    {orderTimeFormat(item.dateOrdered)}
                  </Text>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={24}>
                <Text>
                  {" "}
                  {t("seller.order.orderNo")}- {item._id}
                </Text>
              </Col>
              <Col md={24}>
                <Text>
                  {" "}
                  {t("seller.order.contactNumber")}- {item.user.phone}
                </Text>
              </Col>
            </Row>
            <Row justify="end">
              {item.rating === 0 ? (
                <p>No Rating given</p>
              ) : (
                <Rate
                  className="move-from-top"
                  disabled
                  defaultValue={item.rating}
                />
              )}
            </Row>
            <hr></hr>
            <Row justify="space-betwee">
              <Col md={12}>
                <Text>
                  {item.orderItems.items.map((dish, key) => {
                    return `${dish.productId.name} - (${dish.quantity})`;
                  })}
                </Text>
              </Col>
              <Col md={12}>
                <Row justify="end">
                  <Title level={5}>
                    {t("seller.order.totalText")}: {rupeeSign} {item.totalPrice}
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
