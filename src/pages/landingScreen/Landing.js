import { Carousel, Col, Layout, Row, Typography } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import { React, useEffect, useState } from "react";
import Image from "../../components/shared/image/image";
import Navbar from "../../components/shared/navbar/navbar";
import CustomTabs from "../../components/shared/Tabs/Tabs";
import { baseUrl } from "../../utils/constant";
import {
  getCategoryId,
  redirectToOriginalPageFromLanding,
} from "../../utils/helpers";
import CustomerLogin from "./customerLogin";
import corousel1 from "../../images/courosel.jpg";
import corousel2 from "../../images/courosel-3.jpg";

import "./landing.css";
import SellerItems from "./sellerItems";
import { useTranslation } from "react-i18next";


const { Content } = Layout;
const { Title } = Typography;
const imagesUrls = [
  corousel1,
  corousel2,
  "https://image.shutterstock.com/z/stock-vector-delicious-fluffy-pancake-in-frying-pan-fresh-fruit-and-honey-toppings-in-d-illustration-food-ad-1120833698.jpg",
];

const LandingPage = () => {
  const { t } = useTranslation();
  const [seller, setSeller] = useState([]);
  const [loadSeller, setLoadSeller] = useState(false);
  //const [currentTabValue,setCurrentTabValue] = useState("");

  const getSellers = () => {
    setLoadSeller(false);
    axios
      .get(`${baseUrl}/sellers`)
      .then((result) => {
        setSeller(result.data);
        setLoadSeller(true);
      })
      .catch((err) => console.error(err));
  };

  const getCategorySeller = (category) => {
    if (category !== "All") {
      setLoadSeller(false);
      axios
        .get(
          `${baseUrl}/sellers/get/SellersByCategory?categoryId=${getCategoryId(
            category
          )}`
        )
        .then((result) => {
          setSeller(result.data);
          setLoadSeller(true);
        })
        .catch((err) => console.error(err));
    } else {
      getSellers();
    }
  };

  useEffect(() => {
    redirectToOriginalPageFromLanding();
    getSellers();
  }, []);

  const getCurrentTab = (tab) => {
    getCategorySeller(tab);
    //setCurrentTabValue(tab)
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
              <Title level={4}>{t('Landing.Sellers')}</Title>
            </Col>
            <Col md={9} sm={24} xs={24} className="keep-items-left">
              <CustomTabs
                currentTab={getCurrentTab}
                list={["All", "Breakfast", "Lunch", "Snack", "Dinner"]}
              />
            </Col>
          </Row>
          <CustomerLogin type="Customer" />
          <SellerItems loading={loadSeller} seller={seller} />
        </div>
      </Content>
    </Layout>
  );
};

export default LandingPage;
