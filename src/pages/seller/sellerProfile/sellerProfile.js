import { React, useState } from "react";
import {
  Col,
  Row,
  Card,
  Form,
  Input,
  Button,
  Typography,
  Rate,
  Modal,
} from "antd";
import Image from "../../../components/shared/image/image";

const { Title } = Typography;

const SellerProfile = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [sellerProfile, setSellerProfile] = useState([
    {
      backKeyName: "name",
      name: "Name",
      value: "",
    },
    {
      backKeyName: "display_name",
      name: "Display Name",
      value: "",
    },
    {
      backKeyName: "phone",
      name: "phone",
      value: "",
    },
    {
      backKeyName: "description",
      name: "Description",
      value: "",
    },
    {
      backKeyName: "address",
      name: "Address",
      value: "",
    },
    {
      backKeyName: "email",
      name: "Email",
      value: "",
    },
  ]);

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
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please Enter User Name" }]}
              >
                <Input placeholder="Please Enter User Name" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="display_name"
                label="Display Name"
                rules={[
                  { required: true, message: "Please Enter Display Name" },
                ]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="Please Enter Display Name"
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="phone"
                label="Mobile Number"
                rules={[
                  { required: true, message: "Please Enter Mobile Number" },
                ]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="Please enter Mobile Number"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="idProof"
                label="Aadhaar Card"
                rules={[
                  { required: true, message: "Please Enter Aadhaar Card" },
                ]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="Please Enter Aadhaar Card"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="email"
                label="Email (optional)"
                rules={[{ required: false, message: "Please Enter Email" }]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="Please Enter Email"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="adress"
                label="Address"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Address",
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="Please Enter Address" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
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
