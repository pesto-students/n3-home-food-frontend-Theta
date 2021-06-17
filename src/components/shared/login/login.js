import { Button, Card, Form, Input, Typography } from "antd";
import "antd/dist/antd.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAsAdminLoggedIn } from "../../../store/actions";
import "./login.css";
import { submitLogin } from "./utility";



const Login = () => {
  const { Title } = Typography;
  const [loading, setLoading] = useState(false);



  const dispatch = useDispatch();
  // const history = useHistory();

  const endLoading = () => {
    setLoading(false);
  };

  const sendDetails = (value) => {
    setLoading(true);
    submitLogin(value, onComplete(value));
  };

  const onComplete = () => {
    dispatch(setAsAdminLoggedIn());
    // dispatch(setLogInAdminInfo(data));
    endLoading()
  };

 

  

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
            <Input placeholder="Phone" />
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
            <Input placeholder="OTP" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              block
              htmlType="submit"
              className="login-form-button"
            >
              {loading ? " wait..." : " SEND OTP"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
