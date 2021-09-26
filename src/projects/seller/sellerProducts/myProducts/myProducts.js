import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Input,
  notification,
  Select,
  Dropdown,
  Menu,
  Row,
  Tag,
  Form,
  Skeleton,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import Image from "components/image/image";
import { sessionId, getCategoryId } from "utils/helpers";
import { catchError } from "utils/helpers";
import { useTranslation } from "react-i18next";

import DataNotFound from "components/dataNotFound/dataNotFound";
import { updateProduct, deleteMyProduct } from "projects/seller/utils/api";

const MyProducts = ({ products, isLoading, callback }) => {
  const { t } = useTranslation();
  const { Option } = Select;
  const { Title } = Typography;
  const [myProducts, setMyProducts] = useState([...products]);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [currentProductId, setCurrentProductId] = useState("");
  // const [ishasMore, setIshasMore] = useState(false);

  const [SelectedCategory, setSelectedCategory] = useState([]);

  useEffect(() => {
    setMyProducts([...products]);
  }, [products]);

  const editProduct = async () => {
    if (SelectedCategory.length === 0) {
      notification.error({
        message: `Notification`,
        description: "Please select category",
        placement: "topRight",
      });
      return;
    }

    const product = {
      productid: currentProductId,
      product_price: price,
      category: SelectedCategory,
      product_quantity: quantity,
    };
    try {
      const response = await updateProduct(sessionId(), product);
      if (response.status === 200) {
        notification.success({
          message: `Notification`,
          description: "Product updated successfully",
          placement: "topRight",
        });
        callback();
      }
    } catch (error) {
      catchError(error);
    }
  };

  const editableProduct = (key) => {
    products[key].edit = true;
    setQuantity(products[key].quantity);
    setPrice(products[key].price);
    setCurrentProductId(products[key].productId);
    setSelectedCategory(
      products[key].productCategory.map((category) => category.id)
    );
    setMyProducts([...products]);
  };

  const deleteProduct = async (key) => {
    const item = products[key];

    try {
      const response = await deleteMyProduct(sessionId(), {
        productId: item._id,
      });
      if (response.status === 200) {
        notification.success({
          message: `Notification`,
          description: "Product successfully deleted",
          placement: "topRight",
        });
        products.splice(key, 1);
        setMyProducts([...products]);
        callback();
      }
    } catch (error) {
      catchError(error);
    }
  };

  const changeCategory = (categoryies) => {
    setSelectedCategory(categoryies);
  };

  return (
    <>
      <Skeleton loading={isLoading} active>
        {myProducts.length > 0 ? (
          myProducts.map((product, i) => (
            <Card key={i} hoverable>
              <Row justify="end">
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item
                        key="edit"
                        onClick={() => editableProduct(i)}
                        icon={<EditOutlined />}
                      >
                        {t("seller.profile.editText")}
                      </Menu.Item>
                      <Menu.Item
                        key="delete"
                        onClick={() => deleteProduct(i)}
                        s
                        icon={<DeleteOutlined />}
                      >
                        {t("seller.profile.deleteText")}
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <MoreOutlined />
                </Dropdown>
              </Row>

              <Form layout="vertical" onFinish={editProduct}>
                <div className="container">
                  <div className="row">
                    <div className="product-cointaner">
                      <Image
                        url={product.image}
                        height="100"
                        width="150"
                      ></Image>
                    </div>
                    <div className="product-details ">
                      <Title level={4}>
                        {product.name ? product.name : "Static for now"}
                      </Title>
                      <p>{product.description}</p>

                      <Row style={{ marginBottom: 20 }}>
                        {product.edit ? (
                          <Form.Item
                            name="productCategory"
                            label="Product Category"
                            rules={[
                              {
                                required: false,
                                message: "Please Select Product Category!",
                              },
                            ]}
                          >
                            <Select
                              mode="multiple"
                              style={{ width: 200 }}
                              defaultValue={SelectedCategory}
                              onChange={changeCategory}
                              placeholder="Please select a Category"
                            >
                              <Option value={getCategoryId("Breakfast")}>
                                Breakfast
                              </Option>
                              <Option value={getCategoryId("Lunch")}>
                                Lunch
                              </Option>
                              <Option value={getCategoryId("Snack")}>
                                Snack
                              </Option>
                              <Option value={getCategoryId("Dinner")}>
                                Dinner
                              </Option>
                            </Select>
                          </Form.Item>
                        ) : (
                          product.productCategory.map((category) => {
                            return (
                              <Tag color="processing">{category.name}</Tag>
                            );
                          })
                        )}
                      </Row>

                      <Row>
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
                            <span>
                              {" "}
                              {t("seller.profile.Plates")}: {product.quantity}{" "}
                            </span>
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
                            <span>
                              {" "}
                              {t("seller.profile.Price")}: ₹ {product.price}{" "}
                            </span>
                          )}
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>

                <Row justify="end">
                  {product.edit && (
                    <Button type="primary" htmlType="submit">
                      Save
                    </Button>
                  )}
                </Row>
              </Form>
            </Card>
          ))
        ) : (
          <Row className="m-2 mt-4" justify="center">
            <DataNotFound text="No Data Found!" />
          </Row>
        )}

        {/* <div className="pagination-container">
            <Pagination defaultCurrent={6} total={100} />
          </div> */}
      </Skeleton>
    </>
  );
};

export default MyProducts;
