import {
  Carousel,
  Col,

  Layout,


  notification, Row, Tabs,


  Typography
} from "antd";
import Image from "components/image/image";
import Navbar from "components/navbar/navbar";
import { React, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getAllSellerByCategory, getSellerByPage } from "utils/api";
import { bannerImage } from "utils/constant";
import {
  getCategoryId,
  getPincode,
  redirectToOriginalPageFromLanding
} from "utils/helpers";
import "./landing.css";
import SellerItems from "./sellerItems";


const { Content } = Layout;
const { Title } = Typography;
const categoryList = ["All", "Breakfast", "Lunch", "Snack", "Dinner"];
const { TabPane } = Tabs;

const imagesUrls = bannerImage;

const LandingPage = () => {
  const { t } = useTranslation();
  const [seller, setSeller] = useState([]);
  const [loadSeller, setLoadSeller] = useState(true);
  const [pincode, setPincode] = useState("");
  const [page, setPage] = useState(2);
  const [tabSelected, setTabSelected] = useState('All');

  const getSellers = async (code) => {
    try {
      const response = await getSellerByPage(code,1,'All')
     // const response = await getAllSellerByPincode(code);
      if (response.status === 200) {
        setSeller(response.data);
        setLoadSeller(true);
      }
    } catch (error) {
      setLoadSeller(false);

      notification.error({
        message: "Error",
        description: error.response
          ? error.response.data
          : "Something went wrong",
        placement: "topLeft",
      });
    }
  };

  const getCategorySeller = async (categoryKey) => {
    if (categoryKey !== "0") {
      try {
        setLoadSeller(false);
        const response = await getAllSellerByCategory(
          getCategoryId(categoryList[Number(categoryKey)]),
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

  const fetchMoreSellers = useCallback(async () => {
    setPage(page+1)
    try {
      let response = await getSellerByPage(pincode,page,tabSelected);
      console.log('updated seller',response)

      if (response.status === 200) {
        let updatedSeller = []
        response.data.forEach(element => {
          updatedSeller.push(element)
        } )
          setSeller(seller => [...seller , ...updatedSeller]);
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
  }, [pincode,tabSelected,page]);

  const getCurrentTab = (tab) => {
    getCategorySeller(tab);
    //setCurrentTabValue(tab)
    setTabSelected(tab)
    setPage(2)
  };


  useEffect(() => {
  }, [tabSelected]);
  
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
              <Tabs onChange={getCurrentTab}>
                <TabPane tab={t("Landing.All")} key="0" />
                <TabPane tab={t("Landing.breakfast")} key="1" />
                <TabPane tab={t("Landing.lunch")} key="2" />
                <TabPane tab={t("Landing.snacks")} key="3" />
                <TabPane tab={t("Landing.dinner")} key="4" />
              </Tabs>
            </Col>
          </Row>
          <SellerItems loading={loadSeller} seller={seller} fetchMoreSellers={fetchMoreSellers}/>
        </div>
      </Content>
    </Layout>
  );
};

export default LandingPage;
