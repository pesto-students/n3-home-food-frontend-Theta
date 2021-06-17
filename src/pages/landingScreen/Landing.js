import { Carousel, Col, Layout, Row, Typography } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import { React, useEffect, useState } from "react";
import Image from "../../components/shared/image/image";
import Navbar from "../../components/shared/navbar/navbar";
import SellerCard from "../../components/shared/sellerCard/sellerCard";
import CustomTabs from "../../components/shared/Tabs/Tabs";
import "./landing.css";
const { Header, Content } = Layout;

const {Title} = Typography
const imagesUrls = [
    "https://image.shutterstock.com/image-photo/fresh-green-food-cooking-concept-600w-1615988773.jpg",
   "https://image.shutterstock.com/image-photo/organic-clean-vegetables-assorted-cooking-600w-334204937.jpg",
  "https://image.shutterstock.com/z/stock-vector-delicious-fluffy-pancake-in-frying-pan-fresh-fruit-and-honey-toppings-in-d-illustration-food-ad-1120833698.jpg"]

const LandingPage = () => {

const [seller,setSeller] = useState([])
const [loadSeller,setLoadSeller] = useState(false)


useEffect(() => {
  axios
    .get("http://localhost:8080/api/v1/sellers")
    .then((result) => {
      setSeller(result.data)
      setLoadSeller(true)
    })
    .catch((err) => console.error(err))
}, []);

const getCurrentTab = (tab) =>{
   console.log(tab)
}


  return (
    <Layout className="layout">
        <Navbar/>
      <Content>
        <Row>
          <Col span={24}>
            <Carousel autoplay>
              {imagesUrls.map((image,index)=>{
                return  <Image
                key={index}
                height="500px"
                width="100%"
                url={image}
              />
              })}
             
            </Carousel>
          </Col>
        </Row>

        <div className="category-and-seller-container">
        <Row className="category-conatiner">
              <Col span={15}>
                 <Title level={4}>Category</Title>
              </Col>
              <Col span={9} className="keep-items-left">
                    <CustomTabs
                     currentTab={getCurrentTab}
                     list={['Breakfast','Lunch','Snack','Dinner']}
                    />
              </Col>
        </Row>

        <Row gutter={[20,20]}>
          {seller.map((detail,index) => {
            return (
              <Col span={6} key={index}>
                <SellerCard detail={detail} />
              </Col>
            );
          })}
        </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default LandingPage;
