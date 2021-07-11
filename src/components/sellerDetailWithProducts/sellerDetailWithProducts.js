import { React, useEffect, useState, useCallback } from "react";
import { Row, Col, Typography, Rate, Card } from "antd";
import "./sellerDetailWithProducts.css";
import CustomerNavbar from "../customerNavbar/customerNavbar";
import Image from "../image/image";
import CustomTabs from "../Tabs/Tabs";
import ProductItems from "./productItem";
import SpinnerLoader from "../spinnerLoader/spinnerLoader";
import Cart from "../cart/cart";
import { getUser, sessionId, setPincode } from "utils/helpers";
import { withRouter } from "react-router-dom";
import Navbar from "../navbar/navbar";
import { useTranslation } from "react-i18next";
import DataNotFound from "components/dataNotFound/dataNotFound";
import { fetchSellerProfile, fetchCart } from "../utils/api";

const SellerDetailWithProducts = ({ match }) => {
  const { t } = useTranslation();
  const sellerId = match.params.id;
  const { Title } = Typography;
  const [isLoading, setIsLoading] = useState(true);
  const [isCartLoad, setIsCartLoad] = useState(false);
  const [allProduct, setAllProduct] = useState(false);
  const [profile, setProfile] = useState({});
  const [alreadyInCart, setAlreadyInCart] = useState({
    items: [],
  });

  const getCurrentTab = (tab) => {
    if (tab === "All") {
      setAllProduct([...profile.myProducts]);
      return;
    }
    let items = profile.myProducts.filter(
      (item) => item.productCategory.filter((n) => n.name === tab).length > 0
    );
    setAllProduct([...items]);
  };

  const getSellerProfile = useCallback(async () => {
    const response = await fetchSellerProfile(sellerId);
    if (response.status === 200) {
      setProfile(response.data[0]);
      setAllProduct(response.data[0].myProducts);
      setIsLoading(false);
    }
  }, [sellerId]);

  const getCart = () => {
    if (sessionId()) {
      const response = fetchCart(sessionId()).catch((e) => {
        setIsCartLoad(true);
        let cart = {
          items: [],
          subTotal: 0,
        };
        setAlreadyInCart(cart);
      });
      setAlreadyInCart(response.data);
      setIsCartLoad(true);
    } else {
      setIsCartLoad(true);
    }
  };

  useEffect(() => {
    getSellerProfile();
    getCart();
  }, [getSellerProfile]);

  const uddatePincode = (code) => {
    setPincode(code);
  };

  return (
    <>
      {getUser() ? (
        <CustomerNavbar updatePincode={uddatePincode}></CustomerNavbar>
      ) : (
        <Navbar callBack={uddatePincode} />
      )}
      {isLoading === true ? (
        <Row justify="center">
          <SpinnerLoader />
        </Row>
      ) : (
        <Row>
          <Col md={24}>
            <div className="seller-banner">
              <Row className="image-and-detail">
                <Col md={6} sm={24} xs={24}>
                  <Image url={profile.image} height="100%" width="100%"></Image>
                </Col>
                <Col md={16} sm={24} xs={24} className="seller-details">
                  <Title level={1}>{profile.name}</Title>
                  <Title level={5}>{profile.description}</Title>
                  <Rate defaultValue={profile.rating}></Rate>
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
              <Col md={6} sm={2} xs={2}></Col>
              <Col md={12} sm={22} xs={22}>
                <Title level={3} className="product-text">
                  {t("Cart.Products")}
                </Title>

                {allProduct.length === 0 && (
                  <DataNotFound text="Items Not Found"></DataNotFound>
                )}

                {isCartLoad && (
                  <ProductItems
                    products={allProduct}
                    reloadCart={getCart}
                    savedCartItem={alreadyInCart.items}
                    sellerId={sellerId}
                  />
                )}
              </Col>
              <Col md={6} xs={24} sm={24}>
                <Card>
                  <Title className="product-text" level={3}>
                    {t("Cart.Cart")}
                  </Title>
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
