import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Col, Layout, Row, Modal, Input, Form } from "antd";
import "antd/dist/antd.css";
import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../images/logo.png";
import { getPincode, setPincode } from "../../../utils/helpers";
import Image from "../image/image";

const { Header } = Layout;

const CustomerNavbar = ({ updatePincode }) => {
  const [isPincdeModal, setIsPincodeModal] = useState(false);
  const [currentPincode, setCurrentPincode] = useState("");

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const submitPincode = (pincode) => {
    let code = pincode.pincode;
    setPincode(code);
    setIsPincodeModal(false);
    setCurrentPincode(code);
    updatePincode(code);
  };

  useEffect(() => {
    let code = getPincode();
    if (code) {
      setIsPincodeModal(false);
      setCurrentPincode(code);
    } else {
      setIsPincodeModal(true);
    }
  }, []);

  // const savePincode = () => {
  //   let form = document.getElementById("myForm").nodeValue;
  //   console.log(form.target);
  // };

  return (
    <Header className="navbar">
      <Modal
        title="Enter Pincode"
        visible={isPincdeModal}
        okText="Save"
        onCancel={() => setIsPincodeModal(false)}
        okButtonProps={{
          form: "category-editor-form",

          key: "submit",
          htmlType: "submit",
        }}
      >
        <Form
          layout="vertical"
          id="category-editor-form"
          hideRequiredMark
          onFinish={submitPincode}
        >
          <Form.Item
            name="pincode"
            label="Pincode"
            rules={[
              {
                required: true,
                message: "Please Enter Pincode",
              },
              {
                max: 10,
                message: "Pincode Maximun 10 characters.",
              },
            ]}
          >
            <Input size="large" placeholder="Pincode" />
          </Form.Item>
        </Form>
      </Modal>

      <Row className="full-width">
        <Col md={10} sm={24} xs={24}>
          <Image height="70px" width="70px" url={logo} />
        </Col>
        <Col md={14} sm={24} xs={24} className="keep-items-left">
          <Link to="/my/orders">
            <Button type="link">Orders</Button>
          </Link>
          <Button type="link" onClick={logout}>
            Logout{" "}
          </Button>

          <Button type="link" onClick={() => setIsPincodeModal(true)}>
            Pincode ({currentPincode})
          </Button>

          <Button type="link">
            <ShoppingCartOutlined className="cart-icon" />
          </Button>
        </Col>
      </Row>
    </Header>
  );
};

export default CustomerNavbar;
