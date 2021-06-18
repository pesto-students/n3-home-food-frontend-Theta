import { React } from "react";
import { Col, Row, Card, Typography, Rate } from "antd";
import Image from "../../../components/shared/image/image";

const { Title } = Typography;

const SellerProfile = () => {
  return (
    <Card>
      <Row>
        <Col md={6}>
          <Image
            height={150}
            width={150}
            radius={"100%"}
            url={
              "https://image.shutterstock.com/image-photo/fresh-green-food-cooking-concept-600w-1615988773.jpg"
            }
          />
        </Col>
        <Col md={18}>
          <Title level={2}>Kapil sharma</Title>
          <Title level={5}>I am selling thes all products I am selling thes all productsI am selling thes all productsI am selling thes all productsI am selling thes all products</Title>
          <Title level={5}>Contact Number : 9891872089</Title>
          <Title level={5}>Pin Code : 9891872089</Title>
          <Rate className="move-from-top" disabled defaultValue={2}></Rate>
        </Col>
      </Row>
    </Card>
  );
};

export default SellerProfile;
