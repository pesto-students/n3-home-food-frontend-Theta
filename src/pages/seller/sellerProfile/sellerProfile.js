import { React, useState } from "react";
import { Col, Row, Card, Button, Typography, Rate, Modal } from "antd";
import Image from "../../../components/shared/image/image";

const { Title } = Typography;

const SellerProfile = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setLoading(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Modal
        title="Edit Prrofile"
        visible={visible}
        onOk={handleOk}
        confirmLoading={loading}
        onCancel={handleCancel}
      >
        <p>sa</p>
      </Modal>

      <Card>
        <Row>
          <Col md={5}>
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
            <Title level={2}>Display name</Title>
            <Title level={4}>Kapil sharma</Title>
            <Title level={5}>
              I am selling thes all products I am selling thes all productsI am
              selling thes all productsI am selling thes all productsI am
              selling thes all products
            </Title>
            <Title level={5}>Contact Number : 9891872089</Title>
            <Title level={5}>Email : kapilsh38@gmail.com</Title>
            <Title level={5}>Pin Code : 9891872089</Title>
            <Title level={5}>Address : H.no 3431</Title>
            <Rate className="move-from-top" disabled defaultValue={2} />
            <p>1 start</p>
          </Col>
        </Row>
        <Row justify="end">
          <Button type="primary" onClick={showModal}>
            EDIT
          </Button>
        </Row>
      </Card>
    </>
  );
};

export default SellerProfile;
