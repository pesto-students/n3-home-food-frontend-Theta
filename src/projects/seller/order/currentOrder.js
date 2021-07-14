import { Button, Card, Col, notification, Row, Tag } from "antd";

import Title from "antd/lib/typography/Title";
import React from "react";
import { useTranslation } from "react-i18next";
import { orderDelived } from "../utils/api";
import { rupeeSign } from "utils/constant";
import DataNotFound from "components/dataNotFound/dataNotFound";
import { orderTimeFormat } from "utils/helpers";
import InfiniteScroll from "react-infinite-scroll-component";

const CurrentOrders = ({ orders, callBack, fetchMoreProducts }) => {
  const { t } = useTranslation();

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
    } catch (error) {}
  };

  if (orders.length === 0) {
    return (
      <Row className="m-2 mt-4" justify="center">
        <DataNotFound text="No Data Found!" />
      </Row>
    );
  }

  const fetchMoreData = () => {
    fetchMoreProducts();
  };
  return (
    <>
      <InfiniteScroll
        dataLength={orders.length}
        next={fetchMoreData}
        hasMore={true}
      >
        {orders.map((item, key) => {
          return (
            <Card key={key}>
              <Row justify="space-betwee">
                <Col md={12}>
                  <Title level={5}>
                    {t("seller.order.deliveryType")} :{" "}
                    <Tag color="processing">{item.DeliveryType}</Tag>
                  </Title>
                </Col>
                <Col md={12}>
                  <Row justify="end">
                    <Title level={5}>
                      {t("seller.order.receivedOn")}
                      {"  "}
                      {orderTimeFormat(item.dateOrdered)}
                    </Title>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col md={24}>
                  <Title level={5}>
                    {t("seller.order.orderNo")} - {item._id}
                  </Title>
                </Col>
                <Col md={24}>
                  <Title level={5}>
                    {t("seller.order.contactNumber")}- {item.user.phone}
                  </Title>
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
                  <Title level={5}>
                    {item.orderItems.items.map((dish) => {
                      return `${dish.productId.name} - (${dish.quantity})`;
                    })}
                  </Title>
                </Col>
                <Col md={12}>
                  <Row justify="end">
                    <Title level={5}>
                      {t("seller.order.totalText")}: {rupeeSign}{" "}
                      {item.totalPrice}
                    </Title>
                  </Row>
                </Col>
              </Row>
            </Card>
          );
        })}
      </InfiniteScroll>
    </>
  );
};

export default CurrentOrders;
