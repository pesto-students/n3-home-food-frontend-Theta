import { Button, Form, Input, notification } from "antd";
import "antd/dist/antd.css";
import React, { useState } from "react";
import firebase from "../../../utils/firebase";
import "./login.css";
import { loginUser } from "./utility";



const Login = () => {
  const [hasMoile, sethasMobile] = useState(false);
  const [buttonLoding, setButtonLoding] = useState(false);
  

  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
        },
        defaultCountry: "IN",
      }
    );
  };



  const onSignInSubmit = ({ phone }) => {

    setButtonLoding(true)
    configureCaptcha();
    const phoneNumber = "+91" + phone;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        sethasMobile(true);
        setButtonLoding(false)

        window.confirmationResult = confirmationResult;
        notification.success({
          message: "Verifying",
          description: "OTP has been sent. Please Enter OTP ",
          placement: "topLeft",
        });
        // ...
      })
      .catch((error) => {
        console.log(error)
        // Error; SMS not sent
        // ...
        setButtonLoding(false)

        notification.error({
          message: "Error",
          description: "SMS not sent",
          placement: "topLeft",
        });
      });
  };
  const onSubmitOTP = ({ otp }) => {
    setButtonLoding(true)
    const code = otp;
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        setButtonLoding(false)
        const user = result.user;
        loginUser({phone:user.phoneNumber,customerType:'Admin'})
        notification.success({
          message: "Verified",
          description: "Successfully Login",
          placement: "topLeft",
        });
        // ...
      })
      .catch((error) => {
        setButtonLoding(false)

        notification.error({
          message: "Error",
          description: "OTP not verified",
          placement: "topLeft",
        });
      });
  };

 

  

  return (
    <div>
      <div id="sign-in-button"></div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onSignInSubmit}
      >
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
       {!hasMoile &&
        <Button
          type="primary"
          loading={buttonLoding}
          block
          htmlType="submit"
          className="login-form-button"
        >
           SEND OTP
        </Button>
      }
      </Form>

      {hasMoile &&
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onSubmitOTP}
      >
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
            loading={buttonLoding}
            block
            htmlType="submit"
            className="login-form-button"
          >
            Verify OTP
          </Button>
        </Form.Item>

      </Form>
}
    </div>
  );
};
export default Login;
