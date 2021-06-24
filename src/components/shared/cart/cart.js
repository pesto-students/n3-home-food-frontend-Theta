import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Col, Row, Typography } from "antd";
import "antd/dist/antd.css";
import { React, useState } from "react";
import axios from "../../../utils/axios";
import { baseUrl, rupeeSign } from "../../../utils/constant";
import "./cart.css";
let userId = "60d47bea991e8422112938f7";

const Cart = ({ alreadyInCart, reloadCart }) => {
  const [isLoading, setIsLoding] = useState(false);

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
        productId: dish.productId,
        quantity: currentProduct[0].quantity,
        userId: userId,
      };
      console.log(cartItem, currentProduct[0]);
    } else {
      cartItem = {
        productId: dish.productId,
        quantity: 1,
        userId: userId,
      };
    }

    updateCart(cartItem);
  };

  const updateCart = (cartItem) => {
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
        <ShoppingCartOutlined className="empty-cart-icon" />;
      </Row>
    );
  }

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
                        Add
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
          <span className="bold">Sub Total</span>
          <span className="bold">
            {rupeeSign}
            {alreadyInCart.subTotal}
          </span>
        </Row>

        <Row className="checkout">
          <Button type="primary" block>
            Checkout
          </Button>
        </Row>
      </Row>
    </>
  );
};

export default Cart;
