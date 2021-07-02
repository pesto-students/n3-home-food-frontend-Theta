import { Col, Row } from "antd";
import "antd/dist/antd.css";
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
              What is Lorem Ipsum Lorem Ipsum is simply dummy text of the
              printing and typesetting industry Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s when an
              unknown printer took a galley of type and scrambled it to make a
              type specimen book it has?
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
