import "antd/dist/antd.css";
import { React, useEffect, useState } from "react";
import { Row, Col, Typography, Rate, Card } from "antd";
import "./sellerDetailWithProducts.css";
import CustomerNavbar from "../customerNavbar/customerNavbar";
import Image from "../image/image";
import CustomTabs from "../Tabs/Tabs";
import ProductItems from "./productItem";
import { baseUrl, rupeeSign } from "../../../utils/constant";
import axios from "../../../utils/axios";
import SpinnerLoader from "../spinnerLoader/spinnerLoader";
import Cart from "../cart/cart";
import { sessionId } from "../../../utils/helpers";
import { withRouter } from "react-router-dom";

const SellerDetailWithProducts = (props) => {
  const sellerId = props.match.params.id;
  const { Title } = Typography;
  const [isLoading, setIsLoading] = useState(true);
  const [isCartLoad, setIsCartLoad] = useState(false);

  const [profile, setProfile] = useState({});
  const [alreadyInCart, setAlreadyInCart] = useState({
    items: [],
  });

  const getCurrentTab = (tab) => {
    //setCurrentTabValue(tab)
  };

  const getSellerProfile = () => {
    axios
      .get(`${baseUrl}/sellers/get/getproducts?sellerid=${sellerId}`)
      .then((result) => {
        setProfile(result.data[0]);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  };

  const getCart = () => {
    axios
      .get(`${baseUrl}/cart/${sessionId()}`)
      .then((result) => {
        setAlreadyInCart(result.data);
        setIsCartLoad(true);
      })
      .catch((err) => {
        setIsCartLoad(true);
        let m = {
          items: [],
          subTotal: 0,
        };
        setAlreadyInCart(m);

        console.error(err);
      });
  };

  useEffect(() => {
    getSellerProfile();
    getCart();
  }, []);

  return (
    <>
      <CustomerNavbar></CustomerNavbar>
      {isLoading === true ? (
        <Row justify="center">
          <SpinnerLoader />
        </Row>
      ) : (
        <Row>
          <Col md={24}>
            <div className="seller-banner">
              <Row gutter={["30"]} className="row">
                <Col md={6}>
                  <Image url="" height="250" width="100%"></Image>
                </Col>
                <Col md={18}>
                  <Title level={1}>{profile.name}</Title>
                  <Title level={5}>{profile.description}</Title>
                  <Rate defaultValue={profile.rating}></Rate>
                  <Title className="margin-10" level={5}>
                    Max Amount : {rupeeSign} {profile.max_amount}
                  </Title>
                </Col>
              </Row>
            </div>

            <Row justify="center" className="margin-10">
              <div className="category-tabs">
                <CustomTabs
                  currentTab={getCurrentTab}
                  list={["All", "Breakfast", "Lunch", "Snack", "Dinner"]}
                />
              </div>
            </Row>

            <Row>
              <Col md={6}></Col>
              <Col md={12}>
                <Title level={3} className="product-text">
                  Products
                </Title>

                {isCartLoad && (
                  <ProductItems
                    products={profile.myProducts}
                    reloadCart={getCart}
                    savedCartItem={alreadyInCart.items}
                  />
                )}
              </Col>
              <Col md={6}>
                <Card>
                  <Title level={3}>Cart</Title>
                  <hr />
                  {isCartLoad && (
                    <Cart reloadCart={getCart} alreadyInCart={alreadyInCart} />
                  )}
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </>
  );
};

export default withRouter(SellerDetailWithProducts);
