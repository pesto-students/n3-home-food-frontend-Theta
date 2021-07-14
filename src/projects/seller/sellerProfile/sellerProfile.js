import React, { useEffect, useState } from "react";
import { Card, Col, Rate, Row, Typography } from "antd";
import Image from "components/image/image";
import SpinnerLoader from "components/spinnerLoader/spinnerLoader";
import { rupeeSign } from "utils/constant";
import { sessionId } from "utils/helpers";
import { EditProfile } from "./editProfile";
import { getSellerProfile, getSellerWallet } from "../utils/api";
import { WalletOutlined } from "@ant-design/icons";

const { Title } = Typography;

const SellerProfile = () => {
  const [isloading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [wallet, setWallet] = useState(0);

  const getProfile = async () => {
    try {
      const response = await getSellerProfile(sessionId());
      if (response.status === 200) {
        setProfile(response.data);
        setIsLoading(false);
      }
    } catch (error) {}
  };

  const getWallet = async () => {
    try {
      const response = await getSellerWallet(sessionId());
      if (response.status === 200) {
        setWallet(response.data.totalPrice);
      }
    } catch (error) {
      setWallet(0);
    }
  };

  useEffect(() => {
    getProfile();
    getWallet();
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
                url={profile.image}
              />
            </Col>
            <Col md={18}>
              <Row justify="space-between" align="middle">
                <Title level={2}>{profile.display_name}</Title>
                <h4>
                  <WalletOutlined />
                  {"  "}
                  {rupeeSign} {wallet}
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
            <EditProfile callBack={getProfile} profile={profile} />
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
