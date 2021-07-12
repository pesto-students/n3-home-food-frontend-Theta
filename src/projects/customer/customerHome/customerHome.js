import React, { useEffect, useState, useCallback } from "react";
import { Carousel, Col, Layout, Row, Typography, notification } from "antd";

import Image from "components/image/image";
import CustomerNavbar from "components/customerNavbar/customerNavbar";
import CustomTabs from "components/Tabs/Tabs";
import { getCategoryId, getPincode, getUser } from "utils/helpers";
import SellerItems from "landingScreen/sellerItems";
import { getSeller, getCategorySeller,getSellerByPage } from "../utils/api";
import { bannerImage } from "utils/constant";

const { Content } = Layout;
const { Title } = Typography;
const imagesUrls = bannerImage;

const CustomerHome = () => {
  const [seller, setSeller] = useState([]);
  const [loadSeller, setLoadSeller] = useState(false);
  const [pincode, setPincode] = useState(false);
  const [tabSelected, setTabSelected] = useState('All');
  const [page, setPage] = useState(2);

  const user = getUser() ? getUser().userType : null;
  useEffect(() => {
    if (user === "Seller") window.location.href = "/seller/dashboard";
    if (user === "Admin") window.location.href = "/admin/dashboard";
    if (user === null) window.location.href = "/";
  }, [user]);

  useEffect(()=> {
    console.log(seller)
  },[seller])

  const getSellersByPincode = useCallback(async () => {
    setLoadSeller(false);
    try {
     
      let response = await getSellerByPage(pincode,1,'All')
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

  const getAllSellerByCategory = async (category) => {
    setLoadSeller(false);
    if (category !== "All") {
      try {
        let response = await getCategorySeller(
          getCategoryId(category),
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

  
  const fetchMoreSellers = useCallback(async () => {
    // setLoadSeller(false);
    setPage(page+1)
    try {
      let response = await getSellerByPage(pincode,page,tabSelected);
      if (response.status === 200) {
        let updatedSeller = []
        response.data.forEach(element => {
          updatedSeller.push(element)
        } )
          setSeller(seller => [...seller , ...updatedSeller]);
        //  setLoadSeller(true);
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

  const updatePincode = (code) => {
    setPincode(code);
  };

  useEffect(() => {
    setPincode(getPincode());
    getSellersByPincode();
  }, [getSellersByPincode]);

  const getCurrentTab = (tab) => {
    getAllSellerByCategory(tab);
    setTabSelected(tab)
    setPage(2)
  };

  useEffect(() => {
  }, [tabSelected]);

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
              <Title level={4}>Category</Title>
            </Col>
            <Col md={9} sm={24} xs={24} className="keep-items-left">
              <CustomTabs
                currentTab={getCurrentTab}
                list={["All", "Breakfast", "Lunch", "Snack", "Dinner"]}
              />
            </Col>
          </Row>
          <SellerItems loading={loadSeller} seller={seller} fetchMoreSellers={fetchMoreSellers}/>
        </div>
      </Content>
    </Layout>
  );
};

export default CustomerHome;
