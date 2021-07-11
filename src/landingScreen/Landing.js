import { Carousel, Col, Layout, Row, Typography, notification } from "antd";

import { React, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Image from "components/image/image";
import Navbar from "components/navbar/navbar";
import CustomTabs from "components/Tabs/Tabs";
import {
  getCategoryId,
  getPincode,
  redirectToOriginalPageFromLanding,
} from "utils/helpers";
import "./landing.css";
import SellerItems from "./sellerItems";
import { getAllSellerByPincode, getAllSellerByCategory } from "utils/api";
import { bannerImage } from "utils/constant";

const { Content } = Layout;
const { Title } = Typography;
const imagesUrls = bannerImage;

const LandingPage = () => {
  const { t } = useTranslation();
  const [seller, setSeller] = useState([]);
  const [loadSeller, setLoadSeller] = useState(true);
  const [pincode, setPincode] = useState("");

  const getSellers = async (code) => {
    setLoadSeller(false);
    try {
      const response = await getAllSellerByPincode(code);
      if (response.status === 200) {
        setSeller(response.data);
        setLoadSeller(true);
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.response
          ? error.response.data
          : "Something went wrong",
        placement: "topLeft",
      });
    }
  };

  const getCategorySeller = async (category) => {
    if (category !== "All") {
      try {
        setLoadSeller(false);
        const response = await getAllSellerByCategory(
          getCategoryId(category),
          pincode
        );
        if (response.status === 200) {
          setSeller(response.data);
          setLoadSeller(true);
        }
      } catch (error) {
        console.log(error);
        notification.error({
          message: "Error",
          description: error.response,
          placement: "topLeft",
        });
      }
    } else {
      getSellers(pincode);
    }
  };

  useEffect(() => {
    redirectToOriginalPageFromLanding();
    getSellers(getPincode());
    setPincode(getPincode());
  }, []);

  const getSellerByPincode = (code) => {
    setPincode(code);
    getSellers(code);
  };

  const getCurrentTab = (tab) => {
    getCategorySeller(tab);
    //setCurrentTabValue(tab)
  };

  return (
    <Layout className="layout">
      <Navbar callBack={getSellerByPincode} />
      <Content>
        <Row className="banner" justify="center">
          <Col md={22}>
            <Carousel autoplay>
              {imagesUrls.map((image, index) => {
                return (
                  <Image key={index} height="300px" width="100%" url={image} />
                );
              })}
            </Carousel>
          </Col>
        </Row>

        <div className="category-and-seller-container">
          <Row className="category-conatiner">
            <Col md={15} sm={24} xs={24}>
              <Title level={4}>{t("Landing.Sellers")}</Title>
            </Col>
            <Col md={9} sm={24} xs={24} className="keep-items-left">
              <CustomTabs
                currentTab={getCurrentTab}
                list={["All", "Breakfast", "Lunch", "Snack", "Dinner"]}
              />
            </Col>
          </Row>
          <SellerItems loading={loadSeller} seller={seller} />
        </div>
      </Content>
    </Layout>
  );
};

export default LandingPage;
