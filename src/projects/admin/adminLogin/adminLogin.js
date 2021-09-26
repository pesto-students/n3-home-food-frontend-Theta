import { Col, Row } from "antd";

import { React } from "react";
import { connect } from "react-redux";
import Login from "components/login/login";
import "./adminLogin.css";
import { useTranslation } from "react-i18next";

function AdminLogin() {
  const { t } = useTranslation();
  return (
    <>
      <Row style={{ height: "100vh" }}>
        <Col md={16} className="left-container">
          <div className="left-container-content">
            <h1>{t("Admin.headLine")}</h1>
            <p>{t("Admin.headDescription")}</p>
          </div>
        </Col>
        <Col md={8}>
          <div className="right-container">
            <p>{t("Landing.Login")}</p>
            <Login userType="Admin" />
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
export default connect(mapStateToProps)(AdminLogin);
