import { Button, Col, Row, Typography, notification, Tag } from "antd";

import { React, useState, useEffect } from "react";
import { rupeeSign } from "utils/constant";
import { sessionId } from "utils/helpers";
import Image from "../image/image";
import "./sellerDetailWithProducts.css";
import { useDispatch } from "react-redux";
import { setSellerIdInCart } from "store/actions/index";
import { useTranslation } from "react-i18next";
import { updateCartItem } from "../utils/api";

const ProductItems = ({ products, savedCartItem, reloadCart, sellerId }) => {
  const Dispatch = useDispatch();
  const { t } = useTranslation();

  const { Title } = Typography;
  const [allProducts, setAllProducts] = useState([...products]);

  useEffect(() => {}, [savedCartItem]);

  useEffect(() => {
    setAllProducts([...products]);
  }, [products]);

  const addItems = (dish, key, method) => {
    if (!sessionId()) {
      notification.error({
        message: t("Message.Notification"),
        description: t("Message.PleaseLogin"),
        placement: "topRight",
      });
      return;
    }

    allProducts[key].isLoading = true;
    setAllProducts([...allProducts]);
    let currentProduct = savedCartItem.filter(
      (item) => item.productId.id === dish.productId
    );
    let cartItem = {};
    if (currentProduct.length > 0) {
      if (method === "add") {
        currentProduct[0].quantity = currentProduct[0].quantity + 1;
      }
      if (method === "sub") {
        currentProduct[0].quantity = currentProduct[0].quantity - 1;
      }

      cartItem = {
        productId: dish.productId,
        quantity: currentProduct[0].quantity,
        userId: sessionId(),
        price: currentProduct[0].price,
      };
    } else {
      cartItem = {
        productId: dish.productId,
        quantity: 1,
        userId: sessionId(),
        price: dish.price,
      };
    }

    updateCart(cartItem, key);
  };

  const updateCart = async (cartItem, key) => {
    const response = await updateCartItem(cartItem);
    if (response.status === 200) {
      allProducts[key].isLoading = false;
      setAllProducts([...allProducts]);
      Dispatch(setSellerIdInCart(sellerId));
      reloadCart();
    }
  };

  const getQuantity = (currentItem) => {
    try {
      let current = savedCartItem.filter(
        (item) => item.productId.id === currentItem.productId
      );
      if (current.length > 0) {
        return current[0].quantity;
      }
      return 0;
    } catch (e) {
      return 0;
    }
  };

  return (
    <Row>
      {allProducts.map((dish, key) => {
        return (
          <Col sm={24} xs={24} md={24} key={key} className="product-row">
            <Row>
              <Col md={6} sm={8} xs={8}>
                <Image url={dish.image} height="95" width="95"></Image>
              </Col>
              <Col md={18} sm={14} xs={14}>
                <Title level={4} className="dish-head">
                  {dish.name}{" "}
                  <span>
                    ({t("ProductItem.Only")} {dish.quantity}{" "}
                    {t("ProductItem.Left")})
                  </span>{" "}
                </Title>

                <Title level={5} className="dish-description">
                  {dish.description}
                </Title>

                <Row className="category-tags">
                  {dish.productCategory.map((category) => {
                    return <Tag color="processing">{category.name}</Tag>;
                  })}
                </Row>
                <Row justify="space-between" align="middle">
                  <p level={5}>
                    {rupeeSign} {dish.price}
                  </p>

                  {getQuantity(dish) === 0 ? (
                    <Button
                      loading={dish.isLoading}
                      onClick={() => addItems(dish, key, "add")}
                    >
                      {t("ProductItem.Add")}
                    </Button>
                  ) : (
                    <div>
                      <Button
                        loading={dish.isLoading}
                        onClick={() => addItems(dish, key, "sub")}
                      >
                        -
                      </Button>
                      <Button>{getQuantity(dish)}</Button>
                      <Button
                        loading={dish.isLoading}
                        onClick={() => addItems(dish, key, "add")}
                      >
                        +
                      </Button>
                    </div>
                  )}
                </Row>
              </Col>
            </Row>
          </Col>
        );
      })}
    </Row>
  );
};

export default ProductItems;
