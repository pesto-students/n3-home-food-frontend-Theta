import React, { useEffect, useState } from "react";

import { Button, Col, Row } from "antd";
import { rupeeSign } from "utils/constant";
import { updateCartItem } from "../utils/api";
import "./cart.css";
import emptyCardImage from "images/empty_cart.jpg";
import Image from "components/image/image";
import { sessionId } from "utils/helpers";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Cart = ({ alreadyInCart, reloadCart, showCheckout, ...props }) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoding] = useState(false);

  let userId = sessionId();

  useEffect(() => {}, [alreadyInCart]);
  const addItems = (dish, method) => {
    setIsLoding(true);
    let currentProduct = alreadyInCart.items.filter(
      (item) => item.productId === dish.productId
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
        productId: dish.productId.id,
        quantity: currentProduct[0].quantity,
        userId: userId,
        price: currentProduct[0].price,
      };
    } else {
      cartItem = {
        productId: dish.productId.id,
        quantity: 1,
        userId: userId,
        price: currentProduct[0].price,
      };
    }

    updateCart(cartItem);
  };

  const updateCart = async (cartItem) => {
    const response = await updateCartItem(cartItem);
    if (response.status === 200) {
      setIsLoding(false);
      reloadCart();
    }
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
                    <span>
                      {" "}
                      {dish.productId.name} ({dish.quantity})
                    </span>
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
          {showCheckout === false ? null : (
            <Button type="primary" block onClick={onCheckout}>
              {t("Cart.Checkout")}
            </Button>
          )}
        </Row>
      </Row>
    </>
  );
};

export default withRouter(Cart);
