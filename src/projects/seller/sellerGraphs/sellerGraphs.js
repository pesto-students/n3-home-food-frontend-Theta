import { MoneyCollectOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Card, Col, DatePicker, Row } from "antd";
import Image from "components/image/image";
import LineChart from "components/lineChart/lineChart";
import PieChart from "components/pieChart/pieChart";
import noGraph from "images/no_graph.png";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { rupeeSign } from "utils/constant";
import { sessionId, catchError } from "utils/helpers";
import {
  getGraphDetailSeller,
  getSellerDetailsWallet,
  getSellerPieChartData,
} from "../utils/api";
import { useTranslation } from "react-i18next";

import "./sellerGraphs.css";

const { RangePicker } = DatePicker;

function SellerGraphs() {
  const { t } = useTranslation();
  const [lineGraphData, setLineGraphData] = useState();
  const [revenueData, setrevenueData] = useState();
  const [orderCountData, setorderCountData] = useState();
  const [pieGraphData, setPieGraphData] = useState();
  const dateFormat = "YYYY/MM/DD";

  useEffect(() => {
    let startDate = moment().subtract(7, "day").format("YYYY-MM-DD");
    let endDate = moment().format("YYYY-MM-DD");
    getSellerDetails();
    getGraphDetails([startDate, endDate]);
    getPieChartDetails([startDate, endDate]);
  }, []);

  useEffect(() => {}, [pieGraphData, lineGraphData]);

  const getGraphDetails = async (dateString) => {
    let lineGraphDataMock = ["revenue"];
    let dateGraphData = ["x"];
    try {
      const response = await getGraphDetailSeller(dateString, sessionId());
      if (response.status === 200) {
        response.data.forEach((element) => {
          lineGraphDataMock.push(element.totalPrice);
          dateGraphData.push(element._id);
        });
        let dataSource = [dateGraphData, lineGraphDataMock];

        setLineGraphData(dataSource);
        // (lineGraphDataMock.length > 1 )
        //   ? setLineGraphData(dataSource)
        //   : setLineGraphData()
      }
    } catch (error) {
      catchError(error);
    }
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
    } catch (error) {
      catchError(error);
    }
  };

  const getPieChartDetails = async (dateString) => {
    try {
      const response = await getSellerPieChartData(dateString, sessionId());
      if (response.status === 200) {
        let categoryArray = [];
        response.data.forEach((order) => {
          order.categories.forEach((ordercat) => {
            ordercat.orderItems.items.forEach((element) => {
              element.productId.category.forEach((item) => {
                //  categoryArray.push({date:order.date ,category: item.name})
                categoryArray.push(item.name);
              });
            });
          });
        });

        let lunch = 0;
        let dinner = 0;
        let snacks = 0;
        let breakfast = 0;
        categoryArray.forEach((element) => {
          if (element === "Lunch") {
            lunch++;
          } else if (element === "Breakfast") {
            breakfast++;
          } else if (element === "Snacks") {
            snacks++;
          } else if (element === "Dinner") {
            dinner++;
          }
        });

        !(lunch === 0 && breakfast === 0 && dinner === 0 && snacks === 0)
          ? setPieGraphData([
              ["Lunch", lunch],
              ["Breakfast", breakfast],
              ["Snacks", snacks],
              ["Dinner", dinner],
            ])
          : setPieGraphData();
      }
    } catch (error) {
      catchError(error);
    }
  };

  const onChange = (value, dateString) => {
    getGraphDetails(dateString);
    getPieChartDetails(dateString);
  };

  return (
    <div>
      <Row className="number-cards" justify="end">
        <Card hoverable={true} className="small-box">
          <Row className="stat-card">
            <Col span={8} className="icon-container">
              <ShoppingCartOutlined className="icon" />{" "}
            </Col>
            <Col span={16}>
              <div className="card-details">
                <h6 className="stat-title">
                  {" "}
                  {t("seller.dashboard.totalOrder")}
                </h6>
                <h4 className="stat-count">
                  {orderCountData ? orderCountData : 0}
                </h4>
              </div>
            </Col>
          </Row>
        </Card>

        <Card hoverable={true} className="small-box">
          <Row className="stat-card">
            <Col span={8} className="icon-container">
              <MoneyCollectOutlined className="icon" />{" "}
            </Col>
            <Col span={16}>
              <div className="card-details">
                <h6 className="stat-title">
                  {t("seller.dashboard.totalIncome")}
                </h6>
                <h4 className="stat-count">
                  {" "}
                  {rupeeSign}
                  {revenueData ? revenueData : 0}
                </h4>
              </div>
            </Col>
          </Row>
        </Card>
        <div className="date-picker-custom">
          <RangePicker
            defaultValue={[moment(), moment().subtract(7, "day")]}
            format={dateFormat}
            onChange={onChange}
          />
        </div>
      </Row>

      <Row justify="center" className="m-4">
        <Col md={8} sm={24} xs={24}>
          <Card hoverable={true}>
            <div id="chart">
              {pieGraphData && <PieChart dataSource={pieGraphData} />}
              {!pieGraphData && (
                <>
                  <h5>{t("Header.Categories Sold")}</h5>
                  <Image height="150" width="150" url={noGraph}></Image>
                </>
              )}
            </div>
          </Card>
        </Col>

        <Col id="chart" md={16} sm={24} xs={24}>
          <Card hoverable={true}>
            {lineGraphData && <LineChart dataSource={lineGraphData} />}
            {!lineGraphData && (
              <>
                <h5>{t("Header.MyIncome")}</h5>
                <Image height="150" width="150" url={noGraph}></Image>
              </>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default SellerGraphs;
