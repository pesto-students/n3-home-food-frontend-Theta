import {
  Button,
  Card,
  notification,
  Modal,
  Select,
  Row,
  Skeleton,
  Typography,
} from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "../../../../components/shared/image/image";
import { AddProductSellerModal } from "../../../../components/shared/manageProductmodal/addProduct";
import item from "images/south-indian.jpg";
import { baseUrl } from "utils/constant";
import { getCategoryId, sessionId } from "utils/helpers";
import SpinnerLoader from "../../../../components/shared/spinnerLoader/spinnerLoader";
import { useTranslation } from "react-i18next";

const AllProducts = ({ products, isLoading, callback }) => {
  const { t } = useTranslation();
  const { Title } = Typography;
  const { Option } = Select;

  const [isCategoryModal, setIsCategoryModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const [selectedCategory, setSelectedCategory] = useState([]);

  const fetchMoreData = () => {
    // axios
    // .get("`${baseUrl}/products/get/approved")
    // .then((result) => {
    //   setproducts(products.concat(result.data));
    // })
    // .catch((err) => console.error(err))
    // .finally(() => setIsLoading(false));
  };

  const addToMyProduct = () => {
    if (selectedCategory.length === 0) {
      notification.error({
        message: `Notification`,
        description: "Please Select Category",
        placement: "topRight",
      });
      return;
    }
    axios
      .put(`${baseUrl}/sellers/${sessionId()}`, {
        products: [currentProduct._id],
        category: selectedCategory,
      })
      .then((result) => {
        setIsCategoryModal(false);
        notification.success({
          message: `Notification`,
          description: "This product is added to your my product",
          placement: "topRight",
        });
        callback();
      })
      .catch((err) => {
        notification.error({
          message: `Notification`,
          description: "Something went wrong",
          placement: "topRight",
        });
      });
    // .finally(() => setIsLoading(false));
  };

  const handdleCloseCategoryModal = () => {
    setIsCategoryModal(false);
  };

  const handdleOpenCategoryModal = (product) => {
    setIsCategoryModal(true);
    setCurrentProduct(product);
  };

  const handleChange = (value) => {
    setSelectedCategory(value);
  };

  return (
    <>
      <div>
        <AddProductSellerModal callback={callback} />

        <Modal
          title={currentProduct.name}
          visible={isCategoryModal}
          onOk={addToMyProduct}
          onCancel={handdleCloseCategoryModal}
        >
          <p>Add Category</p>
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select Category"
            defaultValue={[]}
            onChange={handleChange}
          >
            <Option key={getCategoryId("Breakfast")}>Breakfast</Option>
            <Option key={getCategoryId("Lunch")}>Lunch</Option>
            <Option key={getCategoryId("Snacks")}>Snacks</Option>
            <Option key={getCategoryId("Dinner")}>Dinner</Option>
          </Select>
        </Modal>

        <Skeleton loading={isLoading} active>
          <InfiniteScroll
            dataLength={products.length}
            next={fetchMoreData}
            hasMore={true}
            loader={
              <Row className="m-2 mt-4" justify="center">
                <SpinnerLoader />
              </Row>
            }
          >
            {products.map((product, i) => (
              <Card key={i} hoverable>
                <div className="container">
                  <div className="row">
                    <div className="product-cointaner">
                      <Image url={item} height="100" width="150"></Image>
                    </div>
                    <div className="product-details ">
                      <Title level={4}>{product.name}</Title>
                      <span>Max Amount ₹{product.max_price}</span>
                    </div>
                  </div>
                </div>
                <Row justify="end">
                  <Button
                    type="primary"
                    onClick={() => handdleOpenCategoryModal(product)}
                  >
                    {t("seller.product.addButton")}
                  </Button>
                </Row>
              </Card>
            ))}
          </InfiniteScroll>
        </Skeleton>
      </div>
    </>
  );
};

export default AllProducts;
