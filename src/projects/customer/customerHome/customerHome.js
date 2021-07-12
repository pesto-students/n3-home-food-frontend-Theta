import React, { useEffect, useState, useCallback } from "react";
import {
  Carousel,
  Col,
  Layout,
  Row,
  Typography,
  notification,
  Tabs,
} from "antd";
import { useTranslation } from "react-i18next";

import Image from "components/image/image";
import CustomerNavbar from "components/customerNavbar/customerNavbar";
import { getCategoryId, getPincode, getUser } from "utils/helpers";
import SellerItems from "landingScreen/sellerItems";
import { getSeller, getCategorySeller } from "../utils/api";
import { bannerImage } from "utils/constant";

const { Content } = Layout;
const { Title } = Typography;
const imagesUrls = bannerImage;
const categoryList = ["All", "Breakfast", "Lunch", "Snack", "Dinner"];
const { TabPane } = Tabs;

const CustomerHome = () => {
  const { t } = useTranslation();

  const [seller, setSeller] = useState([]);
  const [loadSeller, setLoadSeller] = useState(false);
  const [pincode, setPincode] = useState(false);

  const user = getUser() ? getUser().userType : null;
  useEffect(() => {
    if (user === "Seller") window.location.href = "/seller/dashboard";
    if (user === "Admin") window.location.href = "/admin/dashboard";
    if (user === null) window.location.href = "/";
  }, [user]);

  const getSellersByPincode = useCallback(async () => {
    setLoadSeller(false);
    try {
      let response = await getSeller(pincode);
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
  }, [pincode]);

  const getAllSellerByCategory = async (categoryKey) => {
    setLoadSeller(false);
    if (categoryKey !== "0") {
      try {
        let response = await getCategorySeller(
          getCategoryId(categoryList[Number(categoryKey)]),
          pincode
        );
        if (response.status === 200) {
          setSeller(response.data);
          setLoadSeller(true);
        }
      } catch (error) {
        notification.error({
          message: "Error",
          description: error.response,
          placement: "topLeft",
        });
      }
    } else {
      getSellersByPincode(pincode);
    }
  };

  const updatePincode = (code) => {
    setPincode(code);
  };

  useEffect(() => {
    setPincode(getPincode());
    getSellersByPincode();
  }, [getSellersByPincode]);

  const getCurrentTab = (tab) => {
    getAllSellerByCategory(tab);
  };

  return (
    <Layout className="layout">
      <CustomerNavbar updatePincode={updatePincode} />
      <Content>
        <Row justify="center">
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
              <Tabs onChange={getCurrentTab}>
                <TabPane tab={t("Landing.All")} key="0" />
                <TabPane tab={t("Landing.breakfast")} key="1" />
                <TabPane tab={t("Landing.lunch")} key="2" />
                <TabPane tab={t("Landing.snacks")} key="3" />
                <TabPane tab={t("Landing.dinner")} key="4" />
              </Tabs>
            </Col>
          </Row>
          <SellerItems loading={loadSeller} seller={seller} />
        </div>
      </Content>
    </Layout>
  );
};

export default CustomerHome;
