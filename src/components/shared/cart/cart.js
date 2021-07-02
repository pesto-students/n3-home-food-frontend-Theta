import React, { useEffect, useState } from "react";

import { Button, Col, Row } from "antd";
// import "antd/dist/antd.css";
import axios from "../../../utils/axios";
// import { baseUrl, rupeeSign } from "../../../utils/constant";
// import { LINKS, STRINGS } from '../../../utils/constants';
import { baseUrl, rupeeSign } from 'utils/constant';

import "./cart.css";
import emptyCardImage from "../../../images/empty_cart.jpg";
import Image from "../../shared/image/image";
import { sessionId } from "utils/helpers";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Cart = ({ alreadyInCart, reloadCart, ...props }) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoding] = useState(false);

  let userId = sessionId();

  useEffect(() => {}, [alreadyInCart]);
  const addItems = (dish, method) => {
    setIsLoding(true);
    let currentProduct = alreadyInCart.items.filter(
      (item) => item.productId === dish.productId
    );

    console.log("cart", currentProduct[0]);

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
        userId: userId,
        price: currentProduct[0].price,
      };
    } else {
      cartItem = {
        productId: dish.productId,
        quantity: 1,
        userId: userId,
        price: currentProduct[0].price,
      };
    }

    updateCart(cartItem);
  };

  const updateCart = (cartItem) => {
    console.log("cartitem-update", cartItem);
    axios
      .post(`${baseUrl}/cart`, cartItem)
      .then((result) => {
        setIsLoding(false);
        reloadCart();
      })
      .catch((err) => console.error(err));
  };

  const getQuantity = (currentItem) => {
    try {
      let current = alreadyInCart.items.filter(
        (item) => item.productId === currentItem.productId
      );
      if (current.length > 0) {
        return current[0].quantity;
      }
      return 0;
    } catch (e) {
      return 0;
    }
  };

  if (alreadyInCart.items.length === 0) {
    return (
      <Row justify="center">
        <Image height="150" width="150" url={emptyCardImage}></Image>
      </Row>
    );
  }

  const onCheckout = () => {
    props.history.push("/checkout");
  };

  return (
    <>
      <Row>
        {alreadyInCart.items.map((dish, key) => {
          return (
            <Col sm={24} xs={24} md={24} key={key} className="product-row">
              <Row>
                <Col md={22}>
                  <Row justify="space-between">
                    <span> Panner ({dish.quantity})</span>
                    <span>
                      {rupeeSign} {dish.price}
                    </span>
                  </Row>

                  <Row justify="space-between" align="middle">
                    {getQuantity(dish) === 0 ? (
                      <Button
                        loading={isLoading}
                        onClick={() => addItems(dish, "add")}
                      >
                        {t("Cart.Add")}
                      </Button>
                    ) : (
                      <div>
                        <Button
                          loading={isLoading}
                          onClick={() => addItems(dish, "sub")}
                        >
                          -
                        </Button>
                        <Button>{getQuantity(dish)}</Button>
                        <Button
                          loading={isLoading}
                          onClick={() => addItems(dish, "add")}
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

        <hr></hr>
        <Row justify="space-between" className="sub-total">
          <span className="bold">{t("Cart.Sub Total")}</span>
          <span className="bold">
            {rupeeSign}
            {alreadyInCart.subTotal}
          </span>
        </Row>

        <Row className="checkout">
          <Button type="primary" block onClick={onCheckout}>
            {t("Cart.Checkout")}
          </Button>
        </Row>
      </Row>
    </>
  );
};

export default withRouter(Cart);
