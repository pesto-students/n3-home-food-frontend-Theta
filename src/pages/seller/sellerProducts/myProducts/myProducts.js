import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
    Button,
    Card,
    Col,
    Input,
    Menu,
    Row,
    Skeleton,
    Typography
} from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "../../../../components/shared/image/image";
import item from "../../../../images/south-indian.jpg";
import { baseUrlAdmin, baseUrlSeller } from "../../../../utils/constant";

const MyProducts = () => {
  const { Title } = Typography;
  const [products, setproducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseUrlAdmin}/products/get/approved`)
      .then((result) => {
        setproducts(result.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  const fetchMoreData = () => {
    // axios
    // .get("`${baseUrlAdmin}/products/get/approved")
    // .then((result) => {
    //   setproducts(products.concat(result.data));
    // })
    // .catch((err) => console.error(err))
    // .finally(() => setIsLoading(false));
  };

  const addToMyProduct = (product) => {
    axios
      .put(`${baseUrlSeller}/${product._id}`, { products: [product._id] })
      .then((result) => {
        setproducts(products.concat(result.data));
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  const editProduct = (key)=>{
       products[key].edit = true
       setproducts([...products])
  }
  
  const deleteProduct = (key)=>{
    const item = products[key]
    axios
    .put(`${baseUrlSeller}/${item._id}`, { product: item._id })
    .then((result) => {
        products.splice(key,1)
        setproducts([...products])
    })
    .catch((err) => console.error(err))
    .finally(() => setIsLoading(false));
}

  

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
          {products.map((product, i) => (
            <Card key={i} hoverable>
              <Row justify="end">
                <Menu style={{ width: "20px" }} mode="horizontal">
                  <Menu.Item key="edit" onClick={()=>editProduct(i)} icon={<EditOutlined />}>
                    Edit
                  </Menu.Item>
                  <Menu.Item key="delete" onClick={()=>deleteProduct(i)}s icon={<DeleteOutlined />}>
                    Delete
                  </Menu.Item>
                </Menu>
              </Row>

              <div className="container">
                <div className="row">
                  <div className="product-cointaner">
                    <Image url={item} height="100" width="150"></Image>
                  </div>
                  <div className="product-details ">
                    <span className="seller-name">{product.name}</span>
                    <span className="cost">
                      <Row gutter={[16,14]}>
                        <Col md={24}>
                          {product.edit ? (
                            <Input placeholder="Plates (Rs)" />
                          ) : (
                            <Title level={5}>Plates: 44</Title>
                          )}
                        </Col>
                        <Col md={24}>
                          {product.edit ? (
                            <Input placeholder="Price ₹ " />
                          ) : (
                            <Title level={5}>Price: 76 ₹ </Title>
                          )}
                        </Col>
                      </Row>
                    </span>
                  </div>
                </div>
              </div>
              <Row justify="end">
                <Button type="primary" onClick={() => addToMyProduct(product)}>
                  Save
                </Button>
              </Row>
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
