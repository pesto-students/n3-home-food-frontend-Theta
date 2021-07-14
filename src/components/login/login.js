import { Button, Form, Input, notification } from "antd";

import React, { useState } from "react";
import firebase from "utils/firebase";
import "./login.css";
import { loginUser } from "./utility";
import { useTranslation } from "react-i18next";

const Login = ({ userType }) => {
  const [hasMoile, sethasMobile] = useState(false);
  const [buttonLoding, setButtonLoding] = useState(false);
  const { t } = useTranslation();

  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          onSignInSubmit();
        },
        defaultCountry: "IN",
      }
    );
  };

  const onSignInSubmit = ({ phone }) => {
    // loginUser({ phone: phone, customerType: userType });
    // return;
    setButtonLoding(true);
    configureCaptcha();
    const phoneNumber = "+91" + phone;
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        sethasMobile(true);
        setButtonLoding(false);

        window.confirmationResult = confirmationResult;
        notification.success({
          message: t("Message.Verified"),
          description: t("Message.OTPHasBeenSent"),
          placement: "topLeft",
        });
      })
      .catch((error) => {
        setButtonLoding(false);
        notification.error({
          message: t("Message.Error"),
          description: t("Message.SMS not sent"),
          placement: "topLeft",
        });
      });
  };
  const onSubmitOTP = ({ otp }) => {
    setButtonLoding(true);
    const code = otp;
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        setButtonLoding(false);
        const user = result.user;
        loginUser({ phone: user.phoneNumber.slice(3), customerType: userType });
        notification.success({
          message: t("Message.Verified"),
          description: t("Message.OTPVerified"),
          placement: "topLeft",
        });
        // ...
      })
      .catch((error) => {
        setButtonLoding(false);

        notification.error({
          message: t("Message.Error"),
          description: t("Message.OTP not verified"),
          placement: "topLeft",
        });
      });
  };

  return (
    <div style={{ width: "100%" }}>
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
              message: t("Landing.EnterPhoneValidation"),
            },
          ]}
        >
          <Input placeholder={t("Landing.Phone")} />
        </Form.Item>
        {!hasMoile && (
          <Button
            type="primary"
            loading={buttonLoding}
            block
            htmlType="submit"
            className="login-form-button"
          >
            {t("Landing.SendOtp")}
          </Button>
        )}
      </Form>

      {hasMoile && (
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
                message: t("Landing.EnterOTP"),
              },
            ]}
          >
            <Input placeholder={t("Landing.Otp")} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              loading={buttonLoding}
              block
              htmlType="submit"
              className="login-form-button"
            >
              {t("Landing.VerifyOTP")}
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};
export default Login;
