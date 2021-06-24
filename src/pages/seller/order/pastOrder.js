import "antd/dist/antd.css";
import { React } from "react";
import { Card, Row, Col, Rate } from "antd";
import Title from "antd/lib/typography/Title";

const PastOrders = () => {
  return (
    <>
      <Card>
        <Row justify="space-betwee">
          <Col md={12}>
            <Title level={5}>Gulab jamun</Title>
          </Col>
          <Col md={12}>
            <Row justify="end">
              <Title level={5}>Ordered on 9th june 2020, 4:53 PM</Title>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={24}>
            <Title level={5}>Order No - 53433</Title>
          </Col>
          <Col md={24}>
            <Title level={5}>Contact Number - 9891872022</Title>
          </Col>
        </Row>
        <Row justify="end">
          <Rate className="move-from-top" disabled defaultValue={2} />
        </Row>
        <hr></hr>
        <Row justify="space-betwee">
          <Col md={12}>
            <Title level={5}>
              Alphonso Mango Chilli Sorbet x 1, Death By Chocolate x 1
            </Title>
          </Col>
          <Col md={12}>
            <Row justify="end">
              <Title level={5}>Total: 500 Rs</Title>
            </Row>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default PastOrders;
