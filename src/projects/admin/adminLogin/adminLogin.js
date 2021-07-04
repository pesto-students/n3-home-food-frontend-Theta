import { Col, Row } from "antd";

import { React } from "react";
import { connect } from "react-redux";
import Login from "components/login/login";
import "./adminLogin.css";

function AdminLogin() {
  return (
    <>
      <Row style={{ height: "100vh" }}>
        <Col md={16} className="left-container">
          <div className="left-container-content">
            <h1>Manage all the seller in your area</h1>
            <p>
              You can manage the seller of your area also you can control the
              product of seller and more
            </p>
          </div>
        </Col>
        <Col md={8}>
          <div className="right-container">
            <p>Login</p>
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
