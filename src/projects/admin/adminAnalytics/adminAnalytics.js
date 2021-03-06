import {
  MoneyCollectOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Card, Col, DatePicker, Row } from "antd";
import Image from "components/image/image";
import LineChart from "components/lineChart/lineChart";
import PieChart from "components/pieChart/pieChart";
import noGraph from "images/no_graph.png";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  getAdminCategoryChartDetails,
  getAdminGraphDetails,
  getAllOrderCount,
} from "../utils/api";
import { catchError } from "utils/helpers";
import "./adminDashboard.css";

const { RangePicker } = DatePicker;

function AdminDashboard() {
  const [lineGraphData, setLineGraphData] = useState();
  const [adminData, setadminData] = useState({});
  const [pieGraphData, setPieGraphData] = useState();
  // const [categoryData, setCategoryData] = useState([]);
  const dateFormat = "YYYY/MM/DD";

  useEffect(() => {
    let startDate = moment().subtract(7, "day").format("YYYY-MM-DD");
    let endDate = moment().format("YYYY-MM-DD");
    getAdminDetails();
    getGraphDetails([startDate, endDate]);
    getOrderDetailsCateogryWise([startDate, endDate]);
  }, []);

  const getGraphDetails = async (dateString) => {
    let lineGraphDataMock = ["revenue"];
    let dateGraphData = ["x"];
    try {
      const response = await getAdminGraphDetails(dateString);
      if (response.status === 200) {
        response.data.forEach((element) => {
          lineGraphDataMock.push(element.totalPrice);
          dateGraphData.push(element._id);
        });
        let dataSource = [dateGraphData, lineGraphDataMock];
        setLineGraphData(dataSource);
      }
    } catch (error) {
      catchError(error);
    }
  };

  const getAdminDetails = async () => {
    try {
      const response = await getAllOrderCount();
      if (response.status === 200) {
        response.data ? setadminData(response.data) : setadminData(0);
      }
    } catch (error) {
      catchError(error);
    }
  };

  const getOrderDetailsCateogryWise = async (dateString) => {
    try {
      const response = await getAdminCategoryChartDetails(dateString);
      if (response.status === 200) {
        let categoryArray = [];
        response.data.forEach((order) => {
          order.categories.forEach((ordercat) => {
            ordercat.orderItems.items.forEach((element) => {
              element.productId.category.forEach((item) => {
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

        setPieGraphData([
          ["Lunch", lunch],
          ["Breakfast", breakfast],
          ["Snacks", snacks],
          ["Dinner", dinner],
        ]);
      }
    } catch (error) {
      catchError(error);
    }
  };

  const onChange = (value, dateString) => {
    getGraphDetails(dateString);
    getOrderDetailsCateogryWise(dateString);
  };

  return (
    <div>
      <Row className="number-cards" justify="center">
        <Card hoverable={true} className="small-box">
          <Row className="stat-card">
            <Col span={8} className="icon-container">
              <ShoppingCartOutlined className="icon" />{" "}
            </Col>
            <Col span={16}>
              <div className="card-details">
                <h6 className="stat-title"> Total Orders</h6>
                <h4 className="stat-count">{adminData.orderCount}</h4>
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
                <h6 className="stat-title"> Total Income</h6>
                <h4 className="stat-count">{adminData.orderTotal}</h4>
              </div>
            </Col>
          </Row>
        </Card>

        <Card hoverable={true} className="small-box">
          <Row className="stat-card">
            <Col span={8} className="icon-container">
              <UsergroupAddOutlined className="icon" />{" "}
            </Col>
            <Col span={16}>
              <div className="card-details">
                <h6 className="stat-title"> Total Sellers</h6>
                <h4 className="stat-count">{adminData.sellerCount}</h4>
              </div>
            </Col>
          </Row>
        </Card>

        <Card hoverable={true} className="small-box">
          <Row className="stat-card">
            <Col span={8} className="icon-container">
              <UserAddOutlined className="icon" />{" "}
            </Col>
            <Col span={16}>
              <div className="card-details">
                <h6 className="stat-title"> Total Customers</h6>
                <h4 className="stat-count">{adminData.userCount}</h4>
              </div>
            </Col>
          </Row>
        </Card>
      </Row>

      <Row justify="end" className="m-1">
        <RangePicker
          defaultValue={[moment(), moment().subtract(7, "day")]}
          format={dateFormat}
          onChange={onChange}
        />
      </Row>
      <Row justify="center">
        <Col md={8} sm={24} xs={24}>
          <Card hoverable={true}>
            <div id="chart">
              {pieGraphData && <PieChart dataSource={pieGraphData} />}
              {!pieGraphData && (
                <Image height="150" width="150" url={noGraph}></Image>
              )}
            </div>
          </Card>
        </Col>

        <Col id="chart" md={16} sm={24} xs={24}>
          <Card hoverable={true} className="pt-2 pl-2 pr-2 ">
            {lineGraphData && <LineChart dataSource={lineGraphData} />}
            {!lineGraphData && (
              <Image height="150" width="150" url={noGraph}></Image>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default AdminDashboard;
