import {
  Button,
  Card,
  Col, Form, Input, Row
} from "antd";
import "antd/dist/antd.css";
import { React } from "react";


function SellerRegistration() {
  return (
    <Row justify="center" align="middle">
      <Card style={{ width: "50%" }}>
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter user name" }]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="display_name"
                label="Display Name"
                rules={[
                  { required: true, message: "Please enter display name" },
                ]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="Please enter display name"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="adhar_card"
                label="Adhar Card"
                rules={[{ required: true, message: "Please enter adhar card" }]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="Please enter adhar card"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="mobile"
                label="Mobile Number"
                rules={[
                  { required: true, message: "Please enter mobile number" },
                ]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="Please enter mobile number"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "please enter url description",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="please enter url description"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="end">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Row>
        </Form>
      </Card>
    </Row>
  );
}

export default SellerRegistration;
