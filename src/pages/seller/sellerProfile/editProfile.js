import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Modal, Row, Upload } from "antd";
import "antd/dist/antd.css";
import React, { useState } from "react";

// const openNotificationWithIcon = (type, message) => {
//   notification[type]({
//     message: message,
//   });
// };

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

const CollectionCreateForm = ({ profile, visible, onCreate, onCancel }) => {
  console.log(profile, "kaka");
  const [form] = Form.useForm();
  const fileList = [
    {
      uid: "-1",
      status: "done",
      url: profile.image,
      thumbUrl: profile.image,
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
          name: profile.name,
          address: profile.adress,
          phone: profile.phone,
          idProof: profile.idProof,
          pincode: profile.pincode,
          email: profile.email,
          image: profile.image,
          description: profile.description,
        }}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please Enter User Name" }]}
            >
              <Input placeholder="Please Enter User Name" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="display_name"
              label="Display Name"
              rules={[{ required: true, message: "Please Enter Display Name" }]}
            >
              <Input
                style={{ width: "100%" }}
                placeholder="Please Enter Display Name"
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="pincode"
              label="Pincode"
              rules={[{ required: true, message: "Please Enter Pincode" }]}
            >
              <Input
                style={{ width: "100%" }}
                placeholder="Please Enter Pincode"
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="phone"
              label="Mobile Number"
              rules={[
                { required: true, message: "Please Enter Mobile Number" },
              ]}
            >
              <Input
                style={{ width: "100%" }}
                placeholder="Please enter Mobile Number"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="idProof"
              label="Aadhaar Card"
              rules={[{ required: true, message: "Please Enter Aadhaar Card" }]}
            >
              <Input
                style={{ width: "100%" }}
                placeholder="Please Enter Aadhaar Card"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="email"
              label="Email (optional)"
              rules={[{ required: false, message: "Please Enter Email" }]}
            >
              <Input
                style={{ width: "100%" }}
                placeholder="Please Enter Email"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="address"
              label="Address"
              rules={[
                {
                  required: true,
                  message: "Please Enter Address",
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="Please Enter Address" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="image"
          label="Profile Image"
          valuePropName="image"
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
      </Form>
    </Modal>
  );
};

export const EditProfile = ({ profile }) => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log(values);
    //   const data = new FormData();
    //   if (typeof values.productImage === "undefined") {
    //     data.append("image", props.product.image);
    //   } else {
    //     data.append("image", values.productImage[0].originFileObj);
    //   }
    //   data.append("name", values.productName);
    //   data.append("description", values.description);
    //   data.append("max_price", values.maxPrice);
    //   data.append("category", values.productCategory);
    //   console.log("file,", data);
    //   axios
    //     .put(`${baseUrl}/products/${props.product.id}`, data)
    //     .then((result) => {
    //       if (result.status === 200) {
    //         openNotificationWithIcon("success", "Product Edited");
    //         props.callback();
    //       } else {
    //         openNotificationWithIcon("error", "Could Not Edited Product");
    //       }
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     })
    //     .finally(() => {});
    //   setVisible(false);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Edit
      </Button>
      <CollectionCreateForm
        profile={profile}
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};
