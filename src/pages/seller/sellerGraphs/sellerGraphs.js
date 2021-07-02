import { Card, Col, DatePicker, Row } from "antd";
import "antd/dist/antd.css";
import { React, useEffect, useState } from "react";
import LineChart from "../../../components/shared/lineChart/lineChart";
import PieChart from "../../../components/shared/pieChart/pieChart";
import axios from "../../../utils/axios";
import { baseUrl } from "../../../utils/constant";
import "./sellerGraphs.css";

const { RangePicker } = DatePicker;

function SellerGraphs() {
  const [lineGraphData, setLineGraphData] = useState(["sample", 30, 200, 100]);


  const getGraphDetails = () => {
    let lineGraphDataMock = ["sample"];
    axios
      .get(`${baseUrl}/orders/get-revenue-seller/60d8771f867ff965d12a670c`)
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

  const onChange = (value, dateString) => {
    console.log("Formatted Selected Time: ", dateString);
    getGraphDetails();
  };

  return (
    <div>
      <Row className="dashboard-card-background"></Row>

      <Row className="number-cards" justify="center">
        <Card hoverable={true} className="card-detailed">
          <div>
            <h5>Total Orders</h5>
            <h5>5</h5>
          </div>
        </Card>
        <Card hoverable={true} className="card-detailed">
          <h5>Total Income</h5>
          <h5>200</h5>
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
          <PieChart />
        </div>
      </Row>
    </div>
  );
}

export default SellerGraphs;
