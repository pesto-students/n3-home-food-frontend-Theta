import { Button, Col, Row, Typography, notification, Tag } from "antd";
import "antd/dist/antd.css";
import { React, useState } from "react";
import axios from "../../../utils/axios";
import { baseUrl, rupeeSign } from "../../../utils/constant";
import { sessionId } from "../../../utils/helpers";
import Image from "../image/image";
import "./sellerDetailWithProducts.css";
import { useDispatch } from "react-redux";
import { setSellerIdInCart } from "../../../store/actions/index";

const ProductItems = ({ products, savedCartItem, reloadCart, sellerId }) => {
  const Dispatch = useDispatch();

  const { Title } = Typography;
  const [isLoading, setIsLoding] = useState(false);

  const addItems = (dish, method) => {
    if (!sessionId()) {
      notification.error({
        message: "Notification",
        description: "Please Login to add into cart",
        placement: "topRight",
      });
      return;
    }

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
      console.log("cartItem", currentProduct[0]);

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

    updateCart(cartItem);
  };

  const updateCart = (cartItem) => {
    axios
      .post(`${baseUrl}/cart`, cartItem)
      .then((result) => {
        setIsLoding(false);
        Dispatch(setSellerIdInCart(sellerId));

        reloadCart();
      })
      .catch((err) => console.error(err));
  };

  const getQuantity = (currentItem) => {
    try {
      console.log("savedCartItem", savedCartItem);
      let current = savedCartItem.filter(
        (item) => item.productId === currentItem.productId
      );
      if (current.length > 0) {
        return current[0].quantity;
      }
      console.log("current", currentItem);
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
                  {dish.productCategory.map((category) => {
                    return <Tag color="processing">{category.name}</Tag>;
                  })}
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
