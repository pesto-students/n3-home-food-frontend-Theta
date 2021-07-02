import {
  CreditCardOutlined, SolutionOutlined, UserOutlined
} from "@ant-design/icons";
import {
  Card,
  Radio,

  Space, Steps
} from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";
import { Translation } from "react-i18next";
import Cart from "../../../components/shared/cart/cart";
import CustomerNavbar from "../../../components/shared/customerNavbar/customerNavbar";
import axios from "../../../utils/axios";
import { baseUrl } from "../../../utils/constant";
import { sessionId } from "../../../utils/helpers";
import Payment from "../payment";
import "./checkout.css";

const { Step } = Steps;

export class Checkout extends React.Component {
  state = {
    current: 1,
    value: "Take-Away",
    alreadyInCart: { items: [] },
    isCartLoad: false,
  };

  componentDidMount = () => {
    this.getCart();
  };

  getCart = () => {
    axios
      .get(`${baseUrl}/cart/${sessionId()}`)
      .then((result) => {
        this.setState({ isCartLoad: true });
        this.setState({ alreadyInCart: result.data }, () => {
          console.log(this.state.alreadyInCart);
        });
      })
      .catch((err) => {
        this.setState({ isCartLoad: true });
        let cart = {
          items: [],
          subTotal: 0,
        };
        this.setState({ alreadyInCart: cart });

        console.error(err);
      });
  };

  onDeliveryChange = (e) => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  onChange = (current) => {
    console.log("onChange:", current);
    this.setState({ current });
  };

  render() {
    const { current } = this.state;
    const { value } = this.state;
    // const { alreadyInCart } = this.state;

    const Content1 = (
      <Translation>
        {(t, { i18n }) => (
          <Card hoverable>
            <div className="about-row">
              <span> {t("Checkout.Contact No")} - 7741084950</span>
              <span> {t("Checkout.Pincode")} - 560066</span>
            </div>
          </Card>
        )}
      </Translation>
    );

    const deliverMethod = (
      <Translation>
        {(t, { i18n }) => (
          <Card hoverable>
            <Radio.Group onChange={this.onDeliveryChange} value={value}>
              <Space direction="vertical">
                <Radio value={"Take-Away"}>{t("Checkout.Take Away")}</Radio>
                <Radio value={"Dine-In"}> {t("Checkout.Dine In")}</Radio>
              </Space>
            </Radio.Group>
          </Card>
        )}
      </Translation>
    );

    const payment = (
      <Card hoverable>
        <Payment deliveryType={value} />
      </Card>
    );

    return (
      <>
        <Translation>
          {(t, { i18n }) => (
            <>
              <CustomerNavbar />
              <div className="payment-cointaner">
                <Steps
                  direction="vertical"
                  onChange={this.onChange}
                  current={current}
                >
                  <Step
                    title={t("Checkout.personal details")}
                    icon={<UserOutlined />}
                    description={Content1}
                  />
                  <Step
                    title={t("Checkout.Delivery")}
                    icon={<SolutionOutlined />}
                    description={deliverMethod}
                  />
                  <Step
                    title={t("Checkout.Pay")}
                    icon={<CreditCardOutlined />}
                    description={payment}
                  />
                </Steps>
                <Card hoverable style={{ width: "40vw" }}>
                  <Title level={3}>
                    {" "}
                    <p>{t("Checkout.Cart")}</p>
                  </Title>
                  <hr />
                  {this.state.isCartLoad && (
                    <Cart
                      reloadCart={this.getCart}
                      alreadyInCart={this.state.alreadyInCart}
                    />
                  )}
                </Card>
              </div>
            </>
          )}
        </Translation>
      </>
    );
  }
}
