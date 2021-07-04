import React, { useEffect, useState } from "react";
import { Card, Col, DatePicker, Row } from "antd";

import LineChart from "components/lineChart/lineChart";
import PieChart from "components/pieChart/pieChart";
import "./sellerGraphs.css";
import { useTranslation } from "react-i18next";
import { sessionId } from "utils/helpers";
import {
  getGraphDetailSeller,
  getSellerDetailsWallet,
  getSellerPieChartData,
} from "../utils/api";
import { rupeeSign } from "utils/constant";

const { RangePicker } = DatePicker;

function SellerGraphs() {
  const { t } = useTranslation();
  const [lineGraphData, setLineGraphData] = useState(["revenue", 30, 200, 100]);
  const [revenueData, setrevenueData] = useState();
  const [orderCountData, setorderCountData] = useState();
  const [pieGraphData, setPieGraphData] = useState([
    ["data1", 30],
    ["data2", 120],
  ]);

  useEffect(() => {
    getSellerDetails();
  }, []);

  const getGraphDetails = async () => {
    try {
      let lineGraphDataMock = ["revenue"];
      const response = await getGraphDetailSeller(sessionId());
      if (response.status === 200) {
        response.data.forEach((element) => {
          lineGraphDataMock.push(element.totalPrice);
        });
        setLineGraphData(lineGraphDataMock);
      }
    } catch (error) {}
  };

  const getSellerDetails = async () => {
    try {
      const response = await getSellerDetailsWallet(sessionId());
      if (response.status === 200) {
        response.data.Orders.length
          ? setorderCountData(response.data.Orders.length)
          : setorderCountData(0);
        setrevenueData(response.data.totalPrice);
      }
    } catch (error) {}
  };

  const getPieChartDetails = async () => {
    try {
      const response = await getSellerPieChartData();
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
            <h5>{t("seller.dashboard.totalOrder")}</h5>
            <h5>{orderCountData ? orderCountData : 0}</h5>
          </div>
        </Card>
        <Card hoverable={true} className="card-detailed">
          <h5>{t("seller.dashboard.totalIncome")}</h5>
          <h5>
            {rupeeSign}
            {revenueData ? revenueData : 0}
          </h5>
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

export default SellerGraphs;
