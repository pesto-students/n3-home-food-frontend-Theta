import { Row, Col } from "antd";
import SellerCard from "../../components/shared/sellerCard/sellerCard";
import ServiceNotFound from "../../components/shared/serviceNotFound/serviceNotFound";
import SpinnerLoader from "../../components/shared/spinnerLoader/spinnerLoader";
import { Link } from "react-router-dom";

const SellerItems = ({ loading, seller }) => {
  if (loading) {
    if (seller.length === 0) {
      return (
        <Row justify="center">
          <ServiceNotFound />
        </Row>
      );
    }
    return (
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
