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
import { ShoppingCartOutlined, MoneyCollectOutlined} from "@ant-design/icons";
import moment from "moment";

const { RangePicker } = DatePicker;

function SellerGraphs() {
  const { t } = useTranslation();
  const [lineGraphData, setLineGraphData] = useState();
  const [revenueData, setrevenueData] = useState();
  const [orderCountData, setorderCountData] = useState();
  const [pieGraphData, setPieGraphData] = useState();

  useEffect(() => {
    let startDate = moment().subtract(1, 'day').format('YYYY-MM-DD')
    let endDate = moment().format('YYYY-MM-DD')
    getSellerDetails();
    getGraphDetails([startDate,endDate])
    getPieChartDetails([startDate,endDate])
  }, []);

  
  const getGraphDetails = async (dateString) => {
    let lineGraphDataMock = ["revenue"];
    let dateGraphData = ['x']
    try {
      const response = await getGraphDetailSeller(dateString,sessionId());
      if (response.status === 200) {
        response.data.forEach((element) => {
          lineGraphDataMock.push(element.totalPrice);
          dateGraphData.push(element._id);

        });
        let dataSource = [dateGraphData , lineGraphDataMock]
        console.log(dataSource)
        setLineGraphData(dataSource);
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

  const getPieChartDetails = async (dateString) => {
    try {
      const response = await getSellerPieChartData(dateString);
      if (response.status === 200) {
        let categoryArray = [];
        response.data
          ? setPieGraphData(response.data.orderItems)
          : setPieGraphData(0);
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
        ])
      }
    } catch (error) {}
  };

  const onChange = (value, dateString) => {
    getGraphDetails(dateString);
    getPieChartDetails(dateString);
  };

  return (
    <div>
      <Row><h2>Dashboard</h2></Row>


      <Row className="number-cards" justify="center">
      <Card hoverable={true} className="card-detailed small-box bg-info position">
        <div className="main-items">
        <h2 className='count' >{orderCountData ? orderCountData : 0}</h2>
        <ShoppingCartOutlined className='card-icon'/>
        </div>
        <h5  className="status-name">{t("seller.dashboard.totalOrder")}</h5>
      </Card>

      <Card hoverable={true} className="card-detailed small-box bg-info position">
        <div className="main-items">
        <h2 className='count' >   {rupeeSign}
            {revenueData ? revenueData : 0}</h2>
        <MoneyCollectOutlined className='card-icon'/>
        </div>
        <h5  className="status-name">{t("seller.dashboard.totalIncome")}</h5>
      </Card>


      </Row>

      <Row justify="center" className='m-2'>
        <RangePicker onChange={onChange} />
      </Row>
      <Row justify="center" className='m-4'>
        <Col id="chart" span={12}>
        <Card hoverable={true}>
        {lineGraphData &&   <LineChart dataSource={lineGraphData} /> }
         {!lineGraphData && <span >No Data Found </span> }
        </Card>
        </Col>
        <Col span={12}>
        <Card hoverable={true}>
        <div id="chart">
         {pieGraphData && <PieChart dataSource={pieGraphData} /> }
         {!pieGraphData && <span >No Data Found </span> }
        </div>
        </Card>
        </Col>
      </Row>

    </div>
  
  );
}

export default SellerGraphs;
