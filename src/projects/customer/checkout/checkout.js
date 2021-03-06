import { CreditCardOutlined, SolutionOutlined } from "@ant-design/icons";
import { Card, Radio, Space, Steps } from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";
import { Translation } from "react-i18next";
import Cart from "components/cart/cart";
import CustomerNavbar from "components/customerNavbar/customerNavbar";
import { getUser, sessionId, setPincode } from "utils/helpers";
import Payment from "../payment";
import "./checkout.css";
import { getUserCart } from "../utils/api";

const { Step } = Steps;

export class Checkout extends React.Component {
  state = {
    current: 1,
    value: "Take-Away",
    alreadyInCart: { items: [] },
    isCartLoad: false,
  };

  componentDidMount = () => {
    const user = getUser() ? getUser().userType : null;

    if (user === "Seller") window.location.href = "/seller/dashboard";
    if (user === "Admin") window.location.href = "/admin/dashboard";
    if (user === null) window.location.href = "/";
    this.getCart();
  };

  getCart = async () => {
    try {
      const response = await getUserCart(sessionId());
      if (response.status === 200) {
        this.setState({ isCartLoad: true });
        this.setState({ alreadyInCart: response.data }, () => {});
      }
    } catch (error) {
      this.setState({ isCartLoad: true });
      let cart = {
        items: [],
        subTotal: 0,
      };
      this.setState({ alreadyInCart: cart });
    }
  };

  onDeliveryChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  onChange = (current) => {
    this.setState({ current });
  };

  render() {
    const { current } = this.state;
    const { value } = this.state;
    // const { alreadyInCart } = this.state;

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

    const changePincode = (code) => {
      setPincode(code);
    };

    return (
      <>
        <Translation>
          {(t, { i18n }) => (
            <>
              <CustomerNavbar updatePincode={changePincode} />
              <div className="payment-cointaner">
                <Steps
                  direction="vertical"
                  onChange={this.onChange}
                  current={current}
                >
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
                      showCheckout={false}
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
