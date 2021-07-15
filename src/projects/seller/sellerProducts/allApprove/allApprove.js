import { Card, Row, Skeleton, Tag, Typography } from "antd";

import React from "react";
import Image from "components/image/image";
import DataNotFound from "components/dataNotFound/dataNotFound";
import { useTranslation } from "react-i18next";

const AllApprove = ({ products, isLoading }) => {
  const { t } = useTranslation();

  const { Title } = Typography;

  return (
    <>
      <div>
        <Skeleton loading={isLoading} active>
          {products.length > 0 ? (
            products.map((product, i) => (
              <Card key={i} hoverable>
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
                      <Title level={4}>{product.name}</Title>
                      <p>{product.description}</p>
                      <span>
                        {" "}
                        {t("seller.profile.MaxAmount")}: ₹ {product.max_price}
                      </span>
                      <Row>
                        {" "}
                        <Tag color="warning">{product.status}</Tag>
                      </Row>
                    </div>
                  </div>
                </div>
              </Card>
            ))
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

export default AllApprove;
