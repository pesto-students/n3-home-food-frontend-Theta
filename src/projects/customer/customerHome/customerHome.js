import { Carousel, Col, Layout, Row, Typography } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import { React, useEffect, useState } from "react";
import Image from "../../../components/shared/image/image";
import CustomerNavbar from "../../../components/shared/customerNavbar/customerNavbar";
import CustomTabs from "../../../components/shared/Tabs/Tabs";
import { baseUrl } from "utils/constant";
import { getCategoryId, getPincode, getUser } from "utils/helpers";
import SellerItems from "../../../landingScreen/sellerItems";

const { Content } = Layout;
const { Title } = Typography;
const imagesUrls = [
  "https://image.shutterstock.com/image-photo/fresh-green-food-cooking-concept-600w-1615988773.jpg",
  "https://image.shutterstock.com/image-photo/organic-clean-vegetables-assorted-cooking-600w-334204937.jpg",
  "https://image.shutterstock.com/z/stock-vector-delicious-fluffy-pancake-in-frying-pan-fresh-fruit-and-honey-toppings-in-d-illustration-food-ad-1120833698.jpg",
];

const CustomerHome = () => {
  const [seller, setSeller] = useState([]);
  const [loadSeller, setLoadSeller] = useState(false);
  const [pincode, setPincode] = useState(false);

  //const [currentTabValue,setCurrentTabValue] = useState("");

  const user = getUser() ? getUser().userType : null;
  useEffect(() => {
    if (user === "Seller") window.location.href = "/seller/dashboard";
    if (user === "Admin") window.location.href = "/admin/dashboard";
    if (user === null) window.location.href = "/";
  }, [user]);

  const getSellers = (pinCode) => {
    setLoadSeller(false);
    axios
      .get(`${baseUrl}/sellers/pincode/${pinCode}`)
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
      getSellers(pincode);
    }
  };

  const updatePincode = (pincode) => {
    setPincode(pincode);
    getSellers(pincode);
  };

  useEffect(() => {
    setPincode(getPincode());

    getSellers();
  }, [pincode]);

  const getCurrentTab = (tab) => {
    getCategorySeller(tab);
  };

  return (
    <Layout className="layout">
      <CustomerNavbar updatePincode={updatePincode} />
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

export default CustomerHome;
