import { Button, Card, Col, notification, Row, Tag, Typography } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { orderDelived } from "../utils/api";
import { rupeeSign } from "utils/constant";
import DataNotFound from "components/dataNotFound/dataNotFound";
import { orderTimeFormat, catchError } from "utils/helpers";

const CurrentOrders = ({ orders, callBack, fetchMoreProducts }) => {
  const { t } = useTranslation();
  const { Text, Title } = Typography;

  const delived = async (order) => {
    try {
      const response = await orderDelived(order.id);
      if (response.status === 200) {
        notification.success({
          message: `Notification`,
          description: "Order has been successfully delivered",
          placement: "topRight",
        });
        callBack();
      }
    } catch (error) {
      catchError(error);
    }
  };

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
                <Text level={5}>
                  {t("seller.order.deliveryType")} :{" "}
                  <Tag color="processing">{item.DeliveryType}</Tag>
                </Text>
              </Col>
              <Col md={12}>
                <Row justify="end">
                  <Text level={5}>
                    {t("seller.order.receivedOn")}
                    {"  "}
                    {orderTimeFormat(item.dateOrdered)}
                  </Text>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={24}>
                <Text level={5}>
                  {t("seller.order.orderNo")} - {item._id}
                </Text>
              </Col>
              <Col md={24}>
                <Text level={5}>
                  {t("seller.order.contactNumber")}- {item.user.phone}
                </Text>
              </Col>
            </Row>
            <Row justify="end">
              <Button
                type="primary"
                // loading={isLoading}
                onClick={() => delived(item)}
              >
                {t("seller.order.deliverButton")}
              </Button>
            </Row>
            <hr></hr>
            <Row justify="space-betwee">
              <Col md={12}>
                <Text level={5}>
                  {item.orderItems.items.map((dish) => {
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

export default CurrentOrders;
