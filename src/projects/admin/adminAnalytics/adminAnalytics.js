import React, { useEffect, useState } from "react";
import { Card, Col, DatePicker, Row } from "antd";
import LineChart from "components/lineChart/lineChart";
import PieChart from "components/pieChart/pieChart";
import "./adminDashboard.css";
import {
  getAdminGraphDetails,
  getAllOrderCount,
  getAdminCategoryChartDetails,
} from "../utils/api";

const { RangePicker } = DatePicker;

function AdminDashboard() {
  const [lineGraphData, setLineGraphData] = useState(["revenue", 30, 200, 100]);
  const [adminData, setadminData] = useState({});
  const [pieGraphData, setPieGraphData] = useState([
    ["data1", 30],
    ["data2", 120],
  ]);

  useEffect(() => {
    getAdminDetails();
  }, []);

  const getGraphDetails = async () => {
    let lineGraphDataMock = ["revenue"];
    try {
      const response = await getAdminGraphDetails();
      if (response.status === 200) {
        response.data.forEach((element) => {
          lineGraphDataMock.push(element.totalPrice);
        });
        setLineGraphData(lineGraphDataMock);
      }
    } catch (error) {}
  };

  const getAdminDetails = async () => {
    try {
      const response = await getAllOrderCount();
      if (response.status === 200) {
        response.data ? setadminData(response.data) : setadminData(0);
      }
    } catch (error) {}
  };

  const getPieChartDetails = async () => {
    try {
      const response = await getAdminCategoryChartDetails();
      if (response.status === 200) {
        response.data.categoryWiseOrder.length
          ? setPieGraphData(response.data.categoryWiseOrder)
          : setPieGraphData(0);
      }
    } catch (error) {}
  };

  const onChange = (value, dateString) => {
    getGraphDetails();
    getPieChartDetails();
  };

  return (
    <div>
      <Row className="dashboard-card-background"></Row>

      <Row className="number-cards" justify="center">
        <Card hoverable={true} className="card-detailed">
          <div>
            <h5>Total Orders</h5>
            <h5>{adminData.orderCount}</h5>
          </div>
        </Card>
        <Card hoverable={true} className="card-detailed">
          <h5>Total Income</h5>
          <h5>{adminData.orderTotal}</h5>
        </Card>
        <Card hoverable={true} className="card-detailed">
          <div>
            <h5>Total Seller</h5>
            <h5>{adminData.sellerCount}</h5>
          </div>
        </Card>
        <Card hoverable={true} className="card-detailed">
          <div>
            <h5>Total Customer</h5>
            <h5>{adminData.userCount}</h5>
          </div>
        </Card>
      </Row>
      <Row justify="center">
        <RangePicker onChange={onChange} />
      </Row>
      <Row justify="center">
        <Col id="chart">
          <LineChart dataSource={lineGraphData} />
        </Col>
      </Row>
      <Row justify="center">
        <div id="chart">
          <PieChart dataSource={pieGraphData} />
        </div>
      </Row>
    </div>
  );
}

export default AdminDashboard;
