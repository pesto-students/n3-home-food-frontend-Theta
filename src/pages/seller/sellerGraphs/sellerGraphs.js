import { React } from "react";
import "antd/dist/antd.css";
import LineChart from "../../../components/shared/lineChart/lineChart";
import { Row } from "antd";
import PieChart from "../../../components/shared/pieChart/pieChart";
import './sellerGraphs.css'
function SellerGraphs() {
  return (
    <div>
      <Row>
        <Row className="dashboard-card-background">
hey
        </Row>
        <Row>

        </Row>
      </Row>
      <Row>
      <div id="chart">
        <LineChart />
      </div>
      </Row>
      <Row>
      <div id="chart">
        <PieChart />
      </div>
      </Row>
    </div>
  );
}

export default SellerGraphs;
