import { Card, Col, DatePicker, Row } from "antd";
 import { antdCss } from 'utils/constant'
import { React, useEffect, useState } from "react";
import LineChart from "../../../components/shared/lineChart/lineChart";
import PieChart from "../../../components/shared/pieChart/pieChart";
import axios from "utils/axios";
import { baseUrl } from "utils/constant";
import "./adminDashboard.css"

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

  const getGraphDetails = () => {
    let lineGraphDataMock = ["revenue"];
    axios
      .get(`${baseUrl}/orders/get-total-revenue`)
      .then((result) => {
        result.data.forEach((element) => {
          lineGraphDataMock.push(element.totalPrice);
        });
        setLineGraphData(lineGraphDataMock);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getAdminDetails = () => {
    axios
      .get(`${baseUrl}/orders/allcount`)
      .then((result) => {
        result.data
          ? setadminData(result.data)
          : setadminData(0);
      })

      .catch((err) => {
        console.error(err);
      });
  };

  const getPieChartDetails = () => {
    axios
      .get(`${baseUrl}/orders/orders-category-wise`)

      .then((result) => {
        result.data.categoryWiseOrder.length
          ? setPieGraphData(result.data.categoryWiseOrder)
          : setPieGraphData(0);
      })

      .catch((err) => {
        console.error(err);
      });
  };

  const onChange = (value, dateString) => {
    console.log("Formatted Selected Time: ", dateString);
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
