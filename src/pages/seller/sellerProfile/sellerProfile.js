import { Card, Col, Rate, Row, Typography } from "antd";
import { React, useEffect, useState } from "react";
import Image from "../../../components/shared/image/image";
import SpinnerLoader from "../../../components/shared/spinnerLoader/spinnerLoader";
import axios from "../../../utils/axios";
import { baseUrl, rupeeSign } from "../../../utils/constant";
import { sessionId } from "../../../utils/helpers";
import { EditProfile } from "./editProfile";
import { WalletOutlined } from "@ant-design/icons";

const { Title } = Typography;

const SellerProfile = () => {
  const [isloading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    axios
      .get(`${baseUrl}/sellers/${sessionId()}`)
      .then((result) => {
        setProfile(result.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      {!isloading ? (
        <Card>
          <Row>
            <Col md={5}>
              <Image
                height={150}
                width={150}
                radius={"100%"}
                url={
                  "https://image.shutterstock.com/image-photo/fresh-green-food-cooking-concept-600w-1615988773.jpg"
                }
              />
            </Col>
            <Col md={18}>
              <Row justify="space-between" align="middle">
                <Title level={2}>{profile.display_name}</Title>
                <h4>
                  <WalletOutlined />
                  {"  "}
                  {rupeeSign} 500
                </h4>
              </Row>
              <Title level={4}>{profile.name}</Title>
              <Title level={5}>
                {profile.description ? profile.description : "No description"}
              </Title>
              <Title level={5}>Contact Number : {profile.phone}</Title>
              <Title level={5}>Email : {profile.email}</Title>
              <Title level={5}>Pin Code : {profile.pincode}</Title>
              <Title level={5}>Address : {profile.adress}</Title>
              <Rate
                className="move-from-top"
                disabled
                allowHalf={true}
                defaultValue={profile.rating}
              />
            </Col>
          </Row>
          <Row justify="end">
            <EditProfile profile={profile} />
          </Row>
        </Card>
      ) : (
        <Row justify="center" align="middle" style={{ height: 400 }}>
          <SpinnerLoader />
        </Row>
      )}
    </>
  );
};

export default SellerProfile;
