import {
  Button,
  Col, Form, Input, Row
} from "antd";
import "antd/dist/antd.css";
import { React } from "react";
import { connect, useDispatch } from "react-redux";

import "./sellerRegistration.css"
import CustomerLogin from "../../landingScreen/customerLogin";
import { setIsCustomerLoginDrawerOpen } from "../../../store/actions";

function SellerRegistration() {
  const Dispatch = useDispatch();

  const toggleDrawer = () => {
    Dispatch(setIsCustomerLoginDrawerOpen(true))
  };

  return (
    <>
    <Row style={{height:'100vh'}}>
      <Col md={16} className="left-container">
            <div className="left-container-content">
            <h1>Partner with us</h1>
            <p>What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has?</p>
            </div>
      </Col>
      <Col md={8}>

      <div className="right-container">
        <h4 align="center">Register</h4>
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter user name" }]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={24}>
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

           <CustomerLogin type="Seller"/>
          <Row gutter={[13,13]} justify="end">
            <Button block type="primary" htmlType="submit">
              Submit
            </Button>
            <Button onClick={toggleDrawer} block type="primary">
              Login
            </Button>
          </Row>
        </Form>
      </div>
      </Col>
    </Row>
    </>
  );
}


const mapStateToProps = state => {
  return {
    title: state
  };
};
export default connect(mapStateToProps)(SellerRegistration);
