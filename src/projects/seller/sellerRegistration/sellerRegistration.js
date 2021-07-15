import { Button, notification, Col, Form, Input, Row } from "antd";

import { React } from "react";
import { connect, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import "./sellerRegistration.css";
import CustomerLogin from "landingScreen/customerLogin";
import { setIsCustomerLoginDrawerOpen } from "store/actions";
import { registerSeller } from "../utils/api";
import { catchError } from "utils/helpers";

function SellerRegistration() {
  const { t } = useTranslation();

  const Dispatch = useDispatch();

  const toggleDrawer = () => {
    Dispatch(setIsCustomerLoginDrawerOpen(true));
  };

  const newAccount = async (form) => {
    try {
      const response = await registerSeller(form);
      if (response.status === 400) {
        notification.error({
          message: "Error",
          description: response.data,
          placement: "topLeft",
        });
        return;
      }
      if (response.status === 200) {
        notification.success({
          message: "Great",
          description: "Successfully Register login with your mobile number",
          placement: "topLeft",
        });
        setTimeout(() => {
          toggleDrawer();
        }, [2000]);
      }
    } catch (error) {
      catchError(error);
    }
  };

  return (
    <>
      <Row style={{ height: "100vh" }}>
        <Col md={16} className="left-container">
          <div className="left-container-content">
            <h1> {t("seller.registerForm.partnerText")}</h1>
            <p>{t("seller.registerForm.description")}</p>
          </div>
        </Col>
        <Col md={8}>
          <div className="right-container">
            <h4 align="center">{t("seller.registerForm.register")}</h4>
            <Form layout="vertical" hideRequiredMark onFinish={newAccount}>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="name"
                    label={t("seller.registerForm.name")}
                    rules={[
                      {
                        required: true,
                        message: t(
                          "seller.registerForm.nameValidationAndPlaceholder"
                        ),
                      },
                    ]}
                  >
                    <Input
                      placeholder={t(
                        "seller.registerForm.nameValidationAndPlaceholder"
                      )}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="display_name"
                    label={t("seller.registerForm.displayName")}
                    rules={[
                      {
                        required: true,
                        message: t(
                          "seller.registerForm.displayNameValidationAndPlaceholder"
                        ),
                      },
                    ]}
                  >
                    <Input
                      style={{ width: "100%" }}
                      placeholder={t(
                        "seller.registerForm.displayNameValidationAndPlaceholder"
                      )}
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    name="phone"
                    label={t("seller.registerForm.mobileNumber")}
                    rules={[
                      {
                        required: true,
                        message: t(
                          "seller.registerForm.mobileNumberValidationAndPlaceholder"
                        ),
                      },
                    ]}
                  >
                    <Input
                      style={{ width: "100%" }}
                      placeholder={t(
                        "seller.registerForm.mobileNumberValidationAndPlaceholder"
                      )}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="idProof"
                    label={t("seller.registerForm.idProof")}
                    rules={[
                      {
                        required: true,
                        message: t(
                          "seller.registerForm.idProofValidationAndPlaceholder"
                        ),
                      },
                    ]}
                  >
                    <Input
                      style={{ width: "100%" }}
                      placeholder={t(
                        "seller.registerForm.idProofValidationAndPlaceholder"
                      )}
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="email"
                    label={t("seller.registerForm.email")}
                    rules={[
                      {
                        required: false,
                        message: t(
                          "seller.registerForm.emailValidationAndPlaceholder"
                        ),
                      },
                    ]}
                  >
                    <Input
                      style={{ width: "100%" }}
                      placeholder={t(
                        "seller.registerForm.emailValidationAndPlaceholder"
                      )}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="adress"
                    label={t("seller.registerForm.address")}
                    rules={[
                      {
                        required: true,
                        message: t(
                          "seller.registerForm.addressValidationAndPlaceholder"
                        ),
                      },
                    ]}
                  >
                    <Input.TextArea
                      rows={4}
                      placeholder={t(
                        "seller.registerForm.addressValidationAndPlaceholder"
                      )}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <CustomerLogin type="Seller" />
              <Row gutter={[13, 13]}>
                <Button block type="primary" htmlType="submit">
                  {t("seller.registerForm.submit")}
                </Button>
              </Row>
              <Row gutter={24} className="mt-3">
                <Col span={6}></Col>
                <Col span={12}>
                  {/* <Link onClick={toggleDrawer} block type="primary">
                    <span> {t("seller.registerForm.loginText")}</span>
                  </Link> */}
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    title: state,
  };
};
export default connect(mapStateToProps)(SellerRegistration);
