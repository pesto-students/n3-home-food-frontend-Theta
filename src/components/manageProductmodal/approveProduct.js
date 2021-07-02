import { Button, Form, InputNumber, Modal, notification } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import React, { useState } from "react";

import { baseUrl } from "utils/constant";

const openNotificationWithIcon = (type, message) => {
  notification[type]({
    message: message,
  });
};

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Approve Product"
      okText="Approve"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {});
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="maxPrice"
          label="Max Price"
          rules={[
            {
              required: true,
              message: "Please input the Max Price!",
            },
          ]}
        >
          <InputNumber min={1} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export const AppoveProductModal = (props) => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    axios
      .put(`${baseUrl}/products/product-approval/${props.productId}`, {
        max_price: values.maxPrice,
      })
      .then((result) => {
        if (result.status === 200) {
          openNotificationWithIcon("success", "Product Approved");
          props.callback();
        } else {
          openNotificationWithIcon("error", "Could Not Approve Product");
        }
      })
      .catch((err) => {
        console.error(err);
        openNotificationWithIcon("error", "Could Not Add Product");
      })
      .finally(() => {});
    setVisible(false);
  };

  return (
    <div>
      <div style={{ display: "flex", flexFlow: "row-reverse", margin: "10px" }}>
        <Button
          type="primary"
          onClick={() => {
            setVisible(true);
          }}
        >
          Approve
        </Button>
      </div>

      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};
