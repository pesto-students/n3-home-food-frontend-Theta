import "antd/dist/antd.css";
import { React } from "react";
import { Card, Row, Col, Rate, Tag } from "antd";
import Title from "antd/lib/typography/Title";
import { rupeeSign } from "../../../utils/constant";
import moment from "moment";
import { useTranslation } from "react-i18next";

const PastOrders = ({ orders }) => {
  const { t } = useTranslation();
  return (
    <>
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
                    {moment(item.dateOrdered).format(
                      "dddd, MMMM Do YYYY, h:mm:ss a"
                    )}
                  </Title>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={24}>
                <Title level={5}>
                  {" "}
                  {t("seller.order.orderNo")}- {item._id}
                </Title>
              </Col>
              <Col md={24}>
                <Title level={5}>
                  {" "}
                  {t("seller.order.contactNumber")}- {item.user.phone}
                </Title>
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
                <Title level={5}>
                  {item.orderItems.items.map((dish, key) => {
                    return `${dish.productId.name} - (${dish.quantity})`;
                  })}
                </Title>
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
