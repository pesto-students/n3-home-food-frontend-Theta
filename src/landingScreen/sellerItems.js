import { Row, Col } from "antd";
import SellerCard from "components/sellerCard/sellerCard";
import ServiceNotFound from "components/serviceNotFound/serviceNotFound";
import SpinnerLoader from "components/spinnerLoader/spinnerLoader";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import './sellerItems.css'
import { useState } from "react";
const SellerItems = ({ loading, seller ,fetchMoreSellers}) => {

  const fetchMoreData = () => {
    fetchMoreSellers()
  };

  if (loading) {
    if (seller.length === 0) {
      return (
        <Row justify="center">
          <ServiceNotFound />
        </Row>
      );
    }
    return (
      <InfiniteScroll
        dataLength={seller.length}
        next={fetchMoreData}
        hasMore={true}
      >
        <Row gutter={[20, 20]}>
          {seller.map((detail, index) => {
            return (
              <Col md={6} sm={24} xs={24} key={index}>
                <Link to={`/seller-detail/${detail._id}`}>
                  <SellerCard detail={detail} />
                </Link>
              </Col>
            );
          })}
        </Row>
      </InfiniteScroll>
    );
  }
  if (!loading) {
    return (
      <Row justify="center">
        <SpinnerLoader />
      </Row>
    );
  }
};

export default SellerItems;
