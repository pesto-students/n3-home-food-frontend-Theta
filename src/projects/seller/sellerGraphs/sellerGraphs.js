import { Card, Col, DatePicker, Row } from "antd";
import "antd/dist/antd.css";
import { React, useEffect, useState } from "react";
import LineChart from "../../../components/shared/lineChart/lineChart";
import PieChart from "../../../components/shared/pieChart/pieChart";
import axios from "utils/axios";
import { baseUrl } from "utils/constant";
import "./sellerGraphs.css";
import { useTranslation } from "react-i18next";
import { sessionId } from "utils/helpers";

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

  const getGraphDetails = () => {
    let lineGraphDataMock = ["revenue"];
    axios
      .get(`${baseUrl}/orders/get-revenue-seller/${sessionId()}`)
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

  const getSellerDetails = () => {
    axios
      .get(`${baseUrl}/orders/seller-wallet/${sessionId()}`)

      .then((result) => {
        result.data.Orders.length
          ? setorderCountData(result.data.Orders.length)
          : setorderCountData(0);
        setrevenueData(result.data.totalPrice);
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
            <h5>{t("seller.dashboard.totalOrder")}</h5>
            <h5>{orderCountData}</h5>
          </div>
        </Card>
        <Card hoverable={true} className="card-detailed">
          <h5>{t("seller.dashboard.totalIncome")}</h5>
          <h5>{revenueData}</h5>
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
