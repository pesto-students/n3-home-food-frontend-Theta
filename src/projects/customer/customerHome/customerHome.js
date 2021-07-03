import  React, {useEffect, useState ,useCallback } from "react";
import { Carousel, Col, Layout, Row, Typography } from "antd";
import "antd/dist/antd.css";
import Image from "components/image/image";
import CustomerNavbar from "components/customerNavbar/customerNavbar";
import CustomTabs from "components/Tabs/Tabs";
import { getCategoryId, getPincode, getUser } from "utils/helpers";
import SellerItems from "landingScreen/sellerItems";
import { getSeller, getCategorySeller } from "utils/api";
import { bannerImage } from "utils/constant";

const { Content } = Layout;
const { Title } = Typography;
const imagesUrls = bannerImage;

const CustomerHome = () => {
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
    } catch (error) {}
  }, [pincode]);

  const getAllSellerByCategory = async (category) => {
    setLoadSeller(false);
    if (category !== "All") {
      try {
        let response = await getCategorySeller(getCategoryId(category));
        if (response.status === 200) {
          setSeller(response.data);
          setLoadSeller(true);
        }
      } catch (error) {}
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
