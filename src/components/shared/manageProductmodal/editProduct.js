import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  notification,
  Upload
} from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import React, { useState } from "react";
import { baseUrl } from "../../../utils/constant";

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
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const normFile = (e) => {
  console.log("Upload event:", e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

const CollectionCreateForm = ({
  product,
  visible,
  onCreate,
  onCancel,
  fromFor,
}) => {
  const [form] = Form.useForm();
  const fileList = [
    {
      uid: "-1",
      status: "done",
      url: product.image,
      thumbUrl: product.image,
    },
  ];
  return (
    <Modal
      visible={visible}
      title="Edit Product"
      okText="Edit"
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
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          productName: product.name,
          description: product.description,
          maxPrice: product.max_price,
        }}
      >
        <Form.Item
          name="productName"
          label="Product Name"
          rules={[
            { min: 5, message: "Product Name must be minimum 5 characters." },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
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
          <Input type="textarea" />
        </Form.Item>

        <Form.Item
          name="productImage"
          label="Product Image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra=""
        >
          <Upload
            {...props}
            name="logo"
            maxCount={1}
            listType="picture"
            defaultFileList={[...fileList]}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        {fromFor === "admin" ? (
          <Form.Item name="maxPrice" label="Max Price (₹)">
            <InputNumber min={1} placeholder="₹" />
          </Form.Item>
        ) : (
          <Form.Item
            name="maxPrice"
            label="Price (₹)"
            rules={[
              {
                required: true,
                message: "Please Enter Price!",
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

export const EditProductModal = (props) => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    const data = new FormData();

    if (typeof values.productImage === "undefined") {
      data.append("image", props.product.image);
    } else {
      data.append("image", values.productImage[0].originFileObj);
    }

    data.append("name", values.productName);
    data.append("description", values.description);
    data.append("max_price", values.maxPrice);
    data.append("category", values.productCategory);

    console.log("file,", data);
    axios
      .put(`${baseUrl}/products/${props.product.id}`, data)
      .then((result) => {
        if (result.status === 200) {
          openNotificationWithIcon("success", "Product Edited");
          props.callback();
        } else {
          openNotificationWithIcon("error", "Could Not Edited Product");
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {});
    setVisible(false);
  };

  return (
    <div>
      <div
        onClick={() => {
          setVisible(true);
        }}
      >
        Edit
      </div>
      <CollectionCreateForm
        product={props.product}
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
