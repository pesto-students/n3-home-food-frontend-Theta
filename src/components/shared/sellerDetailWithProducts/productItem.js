import { Button, Col, Row, Typography } from "antd";
import "antd/dist/antd.css";
import { React, useState } from "react";
import axios from "../../../utils/axios";
import { baseUrl, rupeeSign } from "../../../utils/constant";
import Image from "../image/image";
import "./sellerDetailWithProducts.css";
let userId = "60d47bea991e8422112938f7";

const ProductItems = ({ products, savedCartItem, reloadCart }) => {
  console.log(products, "akao");
  const { Title } = Typography;
  const [isLoading, setIsLoding] = useState(false);

  const addItems = (dish, method) => {
    setIsLoding(true);
    let currentProduct = savedCartItem.filter(
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
      let current = savedCartItem.filter(
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

  return (
    <>
      <Row>
        {products.map((dish, key) => {
          return (
            <Col sm={24} xs={24} md={24} key={key} className="product-row">
              <Row>
                <Col md={2}>
                  <Image url={dish.image} height="40" width="40"></Image>
                </Col>
                <Col md={22}>
                  <Title level={4}>
                    {dish.name} <span>(Only {dish.quantity} Left)</span>
                  </Title>
                  <Title level={5}>{dish.description}</Title>
                  <Row justify="space-between" align="middle">
                    <p level={5}>
                      {rupeeSign} {dish.price}
                    </p>

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
      </Row>
    </>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     cartItems: state.myCart,
//   };
// };

// export default connect(mapStateToProps)(ProductItems);
export default ProductItems;
