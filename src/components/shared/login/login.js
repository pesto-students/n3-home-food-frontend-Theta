import { Form, Input, Button, Typography, Card } from "antd";
import "antd/dist/antd.css";
import "./login.css"
import { submitLogin } from "./utility";
import { useState } from "react";

const Login = () => {
  const { Title } = Typography;
  const [loading,setLoading] = useState(false)

  const endLoading = () => {
    setLoading(false)
  }
  const sendDetails = (value) => {
    setLoading(true)
    submitLogin(value,endLoading)
  }



  return (
    <div className="login-page">
      <div id="recaptcha-container"></div>
      <Card>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={sendDetails}
        >
            <Title level={4}>Sign in</Title>
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone",
              },
            ]}
          >
            <Input
              
              placeholder="Phone"
            />
          </Form.Item>

          <Form.Item
            name="otp"
            rules={[
              {
                required: false,
                message: "Enter OTP",
              },
            ]}
          >
            <Input   
              placeholder="OTP"
            />
          </Form.Item>

 

          <Form.Item>
            <Button
              type="primary"
              block
              htmlType="submit"
              className="login-form-button"
            >
              {loading ? ' wait...' : ' SEND OTP' }
             
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
