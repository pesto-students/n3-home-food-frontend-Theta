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
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "components/image/image";
import { AddProductSellerModal } from "components/manageProductmodal/addProduct";
import item from "images/south-indian.jpg";
import { getCategoryId, sessionId } from "utils/helpers";
import SpinnerLoader from "components/spinnerLoader/spinnerLoader";
import { useTranslation } from "react-i18next";
import DataNotFound from "components/dataNotFound/dataNotFound";
import { setAddProductIntoMyProduct } from "projects/seller/utils/api";

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

  const addToMyProduct = async () => {
    if (selectedCategory.length === 0) {
      notification.error({
        message: `Notification`,
        description: "Please Select Category",
        placement: "topRight",
      });
      return;
    }

    let obj = {
      products: [currentProduct._id],
      category: selectedCategory,
    };

    try {
      const response = await setAddProductIntoMyProduct(sessionId(), obj);
      if (response.status === 200) {
        setIsCategoryModal(false);
        notification.success({
          message: `Notification`,
          description: "This product is added to your my product",
          placement: "topRight",
        });
        callback();
      }
    } catch (error) {
      notification.error({
        message: `Notification`,
        description: "Something went wrong",
        placement: "topRight",
      });
    }
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
          {products.length > 0 ? (
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
          ) : (
            <Row className="m-2 mt-4" justify="center">
              <DataNotFound text="No Data Found!" />
            </Row>
          )}
        </Skeleton>
      </div>
    </>
  );
};

export default AllProducts;
