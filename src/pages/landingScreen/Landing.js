import { Carousel, Col, Layout, Row, Typography } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import { React, useEffect, useState } from "react";
import Image from "../../components/shared/image/image";
import Navbar from "../../components/shared/navbar/navbar";
import CustomTabs from "../../components/shared/Tabs/Tabs";
import { baseUrlAdmin } from "../../utils/constant";
import {  redirectToOriginalPageFromLanding } from "../../utils/helpers";
import CustomerLogin from "./customerLogin";

import "./landing.css";
import SellerItems from "./sellerItems";

const { Content } = Layout;
const { Title } = Typography;
const imagesUrls = [
  "https://image.shutterstock.com/image-photo/fresh-green-food-cooking-concept-600w-1615988773.jpg",
  "https://image.shutterstock.com/image-photo/organic-clean-vegetables-assorted-cooking-600w-334204937.jpg",
  "https://image.shutterstock.com/z/stock-vector-delicious-fluffy-pancake-in-frying-pan-fresh-fruit-and-honey-toppings-in-d-illustration-food-ad-1120833698.jpg",
];

const LandingPage = () => {
  const [seller, setSeller] = useState([]);
  const [loadSeller, setLoadSeller] = useState(false);

  useEffect(() => {
    redirectToOriginalPageFromLanding()
    axios
      .get(`${baseUrlAdmin}/sellers`)
      .then((result) => {
        setSeller(result.data);
        setLoadSeller(true);
      })
      .catch((err) => console.error(err));
  }, []);

  const getCurrentTab = (tab) => {
    console.log(tab);
  };

  return (
    <Layout className="layout">
      <Navbar />
      <Content>
        <Row>
          <Col md={24}>
            <Carousel autoplay>
              {imagesUrls.map((image, index) => {
                return (
                  <Image key={index} height="500px" width="100%" url={image} />
                );
              })}
            </Carousel>
          </Col>
        </Row>

        <div className="category-and-seller-container">
          <Row className="category-conatiner">
            <Col md={15} sm={24} xs={24}>
              <Title level={4}>Category</Title>
            </Col>
            <Col md={9} sm={24} xs={24} className="keep-items-left">
              <CustomTabs
                currentTab={getCurrentTab}
                list={["Breakfast", "Lunch", "Snack", "Dinner"]}
              />
            </Col>
          </Row>
          <CustomerLogin/>
          <SellerItems loading={loadSeller} seller={seller}/>
        </div>
      </Content>
    </Layout>
  );
};

export default LandingPage;
