import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  notification,
  Select,
  Upload,
} from "antd";

import axios from "axios";
import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import { baseUrl } from "utils/constant";
import { getCategoryId } from "utils/helpers";

const { Option } = Select;
const openNotificationWithIcon = (type, message) => {
  notification[type]({
    message: message,
  });
};

// image
const props = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

const CollectionCreateForm = ({ visible, onCreate, onCancel, fromFor }) => {
  const { t } = useTranslation();

  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title={t("seller.product.requestForm.addProductText")}
      okText="Add"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            
          });
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
          name="productName"
          label={t("seller.product.requestForm.productName")}
          rules={[
            {
              required: true,
              message: t("seller.product.requestForm.productNameValidation"),
            },
            { min: 5, message: "Product Name must be minimum 5 characters." },
          ]}
        >
          <Input
            placeholder={t("seller.product.requestForm.productNameValidation")}
          />
        </Form.Item>
        {fromFor !== "admin" && (
          <Form.Item
            name="productCategory"
            label={t("seller.product.requestForm.productCategory")}
            rules={[
              {
                required: true,
                message: t(
                  "seller.product.requestForm.productCategoryValidation"
                ),
              },
            ]}
          >
            <Select
              mode="multiple"
              placeholder={t(
                "seller.product.requestForm.productCategoryValidation"
              )}
            >
              <Option value={getCategoryId("Breakfast")}>Breakfast</Option>
              <Option value={getCategoryId("Lunch")}>Lunch</Option>
              <Option value={getCategoryId("Snacks")}>Snacks</Option>
              <Option value={getCategoryId("Dinner")}>Dinner</Option>
            </Select>
          </Form.Item>
        )}
        <Form.Item
          name="description"
          label={t("seller.product.requestForm.description")}
          rules={[
            {
              required: true,
              message: t("seller.product.requestForm.descriptionValidation"),
            },
            {
              min: 5,
              message: "Product Description must be minimum 5 characters.",
            },
            {
              max: 20,
              message: "Product Description must be Maximun 20 characters.",
            },
          ]}
        >
          <Input
            type="textarea"
            placeholder={t("seller.product.requestForm.descriptionValidation")}
          />
        </Form.Item>

        <Form.Item
          name="productImage"
          label="Product Image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra=""
        >
          <Upload {...props} name="logo" maxCount={1}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        {fromFor === "admin" ? (
          <Form.Item
            name="maxPrice"
            label="Max Price (₹)"
            rules={[
              {
                required: true,
                message: "Please input the Max Price!",
              },
            ]}
          >
            <InputNumber min={1} placeholder="₹" />
          </Form.Item>
        ) : (
          <Form.Item
            name="maxPrice"
            label={t("seller.product.requestForm.price")}
            rules={[
              {
                required: true,
                message: t("seller.product.requestForm.priceValidation"),
              },
            ]}
          >
            <InputNumber min={1} placeholder="₹" />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export const AddProductModal = (props) => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    const data = new FormData();
    data.append("image", values.productImage[0].originFileObj);
    data.append("name", values.productName);
    data.append("description", values.description);
    data.append("max_price", values.maxPrice);

    axios
      .post(
        `${baseUrl}/products/admin`,

        data
      )
      .then((result) => {
        if (result.status === 200) {
          openNotificationWithIcon("success", "Product Added");
          props.callback();
        } else {
          openNotificationWithIcon("error", "Could Not Add Product");
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
          Add Product
        </Button>
      </div>

      <CollectionCreateForm
        fromFor="admin"
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export const AddProductSellerModal = (props) => {
  const { t } = useTranslation();

  const [visible, setVisible] = useState(false);
  const onCreate = (values) => {
    try {
      const data = new FormData();
      data.append("image", values.productImage[0].originFileObj);
      data.append("name", values.productName);
      data.append("description", values.description);
      data.append("max_price", values.maxPrice);
      data.append("category", values.productCategory);
      data.append("status", "Pending");

      axios
        .post(`${baseUrl}/products`, data)
        .then((result) => {
          if (result.status === 200) {
            openNotificationWithIcon("success", "Product Reuested");
            props.callback();
          } else {
            openNotificationWithIcon("error", "Could Not Add Product");
          }
        })
        .catch((err) => {
          console.error(err);
          openNotificationWithIcon("error", "Could Not Add Product");
        })
        .finally(() => {});
      setVisible(false);
    } catch (e) {
      openNotificationWithIcon("error", "Something went wrong");
    }
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
          {t("seller.product.requestProductButton")}
        </Button>
      </div>

      <CollectionCreateForm
        fromFor="seller"
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};
