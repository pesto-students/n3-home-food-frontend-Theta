import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Input,
  Menu,
  Row,
  Form,
  Skeleton,
  Typography,
} from "antd";
import "antd/dist/antd.css";
import axios from "../../../../utils/axios";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "../../../../components/shared/image/image";
import item from "../../../../images/south-indian.jpg";
import { baseUrl } from "../../../../utils/constant";
import { sessionId } from "../../../../utils/helpers";

const MyProducts = ({ products, isLoading, callback }) => {
  const { Title } = Typography;
  const [myProducts, setMyProducts] = useState([...products]);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [currentProductId, setCurrentProductId] = useState("");

  const fetchMoreData = () => {
    // axios
    // .get("`${baseUrl}/products/get/approved")
    // .then((result) => {
    //   setproducts(products.concat(result.data));
    // })
    // .catch((err) => console.error(err))
    // .finally(() => setIsLoading(false));
  };

  const editProduct = () => {
    let product = {
      productid: currentProductId,
      product_price: price,
      product_quantity: quantity,
    };
    axios
      .put(`/sellers/update-product-quantitiy/${sessionId()}`, { ...product })
      .then((result) => {
        //setMyProducts(products.concat(result.data));
      })
      .catch((err) => console.error(err));
  };

  const editableProduct = (key) => {
    products[key].edit = true;
    setQuantity(products[key].quantity);
    setPrice(products[key].price);
    setCurrentProductId(products[key].productId);
    setMyProducts([...products]);
  };

  const deleteProduct = (key) => {
    const item = products[key];
    axios
      .put(`${baseUrl}/${item._id}`, { product: item._id })
      .then((result) => {
        products.splice(key, 1);
        setMyProducts([...products]);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Skeleton loading={isLoading} active>
        <InfiniteScroll
          dataLength={products.length}
          next={fetchMoreData}
          hasMore={true}
          loader={
            <Row className="m-2 mt-4" justify="center">
              <p>Loading ...</p>
            </Row>
          }
        >
          {myProducts.map((product, i) => (
            <Card key={i} hoverable>
              <Row justify="end">
                <Menu style={{ width: "20px" }} mode="horizontal">
                  <Menu.Item
                    key="edit"
                    onClick={() => editableProduct(i)}
                    icon={<EditOutlined />}
                  >
                    Edit
                  </Menu.Item>
                  <Menu.Item
                    key="delete"
                    onClick={() => deleteProduct(i)}
                    s
                    icon={<DeleteOutlined />}
                  >
                    Delete
                  </Menu.Item>
                </Menu>
              </Row>

              <Form onFinish={editProduct}>
                <div className="container">
                  <div className="row">
                    <div className="product-cointaner">
                      <Image url={item} height="100" width="150"></Image>
                    </div>
                    <div className="product-details ">
                      <Title level={4}>
                        {product.name ? product.name : "Static for now"}
                      </Title>

                      <Row gutter={[16, 14]}>
                        <Col md={24}>
                          {product.edit ? (
                            <Form.Item
                              label="Quantity"
                              rules={[
                                {
                                  required: true,
                                  message: "Enter quantity",
                                },
                              ]}
                            >
                              <Input
                                placeholder="Quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                              />
                            </Form.Item>
                          ) : (
                            <span>Plates: {product.quantity} </span>
                          )}
                        </Col>
                        <Col md={24}>
                          {product.edit ? (
                            <Form.Item
                              label="Price"
                              rules={[
                                {
                                  required: true,
                                  message: "Enter Price ₹",
                                },
                              ]}
                            >
                              <Input
                                placeholder="Price ₹"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                              />
                            </Form.Item>
                          ) : (
                            <span>Price: ₹ {product.price} </span>
                          )}
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>

                <Row justify="end">
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                </Row>
              </Form>
            </Card>
          ))}
        </InfiniteScroll>

        {/* <div className="pagination-container">
            <Pagination defaultCurrent={6} total={100} />
          </div> */}
      </Skeleton>
    </>
  );
};

export default MyProducts;
