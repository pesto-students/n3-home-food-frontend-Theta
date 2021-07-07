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
import moment from "moment";
import {
  ShoppingCartOutlined,
  MoneyCollectOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  FilterOutlined,
} from "@ant-design/icons";

const { RangePicker } = DatePicker;

function AdminDashboard() {
  const [lineGraphData, setLineGraphData] = useState();
  const [adminData, setadminData] = useState({});
  const [pieGraphData, setPieGraphData] = useState();
  // const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    let startDate = moment().subtract(1, "day").format("YYYY-MM-DD");
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
        console.log(dataSource);
        setLineGraphData(dataSource);
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

  const getOrderDetailsCateogryWise = async (dateString) => {
    try {
      const response = await getAdminCategoryChartDetails(dateString);
      if (response.status === 200) {
        let categoryArray = [];
        // response.data
        //   ? setCategoryData(response.data.orderItems)
        //   : setCategoryData(0);
        // console.log(response.data[1])
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

        setPieGraphData([
          ["Lunch", lunch],
          ["Breakfast", breakfast],
          ["Snacks", snacks],
          ["Dinner", dinner],
        ]);
      }
    } catch (error) {}
  };

  const onChange = (value, dateString) => {
    console.log("value", dateString);
    getGraphDetails(dateString);
    getOrderDetailsCateogryWise(dateString);
  };

  return (
    <div>
      <Row>
        <h2>Dashboard</h2>
      </Row>

      <Row className="number-cards" justify="center">
        <Card
          hoverable={true}
          className="card-detailed small-box bg-info position"
        >
          <div className="main-items">
            <h2 className="count">{adminData.orderCount}</h2>
            <ShoppingCartOutlined className="card-icon" />
          </div>
          <h5 className="status-name">Total Orders</h5>
        </Card>

        <Card
          hoverable={true}
          className="card-detailed small-box bg-info position"
        >
          <div className="main-items">
            <h2 className="count">{adminData.orderTotal}</h2>
            <MoneyCollectOutlined className="card-icon" />
          </div>
          <h5 className="status-name">Total Income</h5>
        </Card>

        <Card
          hoverable={true}
          className="card-detailed small-box bg-info position"
        >
          <div className="main-items">
            <h2 className="count">{adminData.sellerCount}</h2>
            <UsergroupAddOutlined className="card-icon" />
          </div>
          <h5 className="status-name">Total Sellers</h5>
        </Card>

        <Card
          hoverable={true}
          className="card-detailed small-box bg-info position"
        >
          <div className="main-items">
            <h2 className="count">{adminData.userCount}</h2>
            <UserAddOutlined className="card-icon" />
          </div>
          <h5 className="status-name">Total Customers</h5>
        </Card>
      </Row>

      <Row justify="center" className="m-2">
        <FilterOutlined className="funnel" />{" "}
        <RangePicker onChange={onChange} />
      </Row>
      <Row justify="center" className="m-4">
        <Col id="chart" span={12}>
          <Card hoverable={true}>
            {lineGraphData && <LineChart dataSource={lineGraphData} />}
            {!lineGraphData && <span>No Data Found </span>}
          </Card>
        </Col>
        <Col span={12}>
          <Card hoverable={true}>
            <div id="chart">
              {pieGraphData && <PieChart dataSource={pieGraphData} />}
              {!pieGraphData && <span>No Data Found </span>}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default AdminDashboard;
