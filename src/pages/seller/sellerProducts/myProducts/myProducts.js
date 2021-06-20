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
import axios from "axios";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "../../../../components/shared/image/image";
import item from "../../../../images/south-indian.jpg";
import { baseUrlSeller } from "../../../../utils/constant";

const MyProducts = ({ products, isLoading, callback }) => {
  const { Title } = Typography;
  const [myProducts, setMyProducts] = useState([...products]);

  const fetchMoreData = () => {
    // axios
    // .get("`${baseUrlAdmin}/products/get/approved")
    // .then((result) => {
    //   setproducts(products.concat(result.data));
    // })
    // .catch((err) => console.error(err))
    // .finally(() => setIsLoading(false));
  };

  const editProduct = (item) => {
    console.log(item);
    axios
      .put(`/sellers/update-product-quantitiy/60c9f9b635f0f7183a9a7497`, item)
      .then((result) => {
        //setMyProducts(products.concat(result.data));
      })
      .catch((err) => console.error(err));
  };

  const editableProduct = (key) => {
    products[key].edit = true;
    setMyProducts([...products]);
  };

  const deleteProduct = (key) => {
    const item = products[key];
    axios
      .put(`${baseUrlSeller}/${item._id}`, { product: item._id })
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
                      <span className="seller-name">
                        {product.name ? product.name : "Static for now"}
                      </span>
                      <span className="cost">
                        <Row gutter={[16, 14]}>
                          <Col md={24}>
                            <Form.Item style={{display:'none'}} name="productid">
                              <Input defaultValue={product.productId} />
                            </Form.Item>

                            {product.edit ? (
                              <Form.Item
                                name="product_quantity"
                                rules={[
                                  {
                                    required: false,
                                    message: "Enter quantity",
                                  },
                                ]}
                              >
                                <Input
                                  placeholder="Quantity"
                                  value={product.quantity}
                                  defaultValue={product.quantity}
                                />
                              </Form.Item>
                            ) : (
                              <Title level={5}>
                                Plates: {product.quantity}{" "}
                              </Title>
                            )}
                          </Col>
                          <Col md={24}>
                            {product.edit ? (
                              <Form.Item
                                name="product_price"
                                rules={[
                                  {
                                    required: false,
                                    message: "Enter Price ₹",
                                  },
                                ]}
                              >
                                <Input
                                  placeholder="Price ₹"
                                  defaultValue={product.price}
                                />
                              </Form.Item>
                            ) : (
                              <Title level={5}>Price: ₹ {product.price} </Title>
                            )}
                          </Col>
                        </Row>
                      </span>
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
