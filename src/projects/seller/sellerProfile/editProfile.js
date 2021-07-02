import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Modal, Row, Upload } from "antd";
import "antd/dist/antd.css";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "utils/axios";
import { baseUrl } from "utils/constant";
import { sessionId } from "utils/helpers";

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

const CollectionCreateForm = ({ profile, visible, onCreate, onCancel }) => {
  const { t } = useTranslation();
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
      title={t("seller.profile.editProfileModalTitle")}
      okText={t("seller.profile.editText")}
      cancelText={t("seller.product.cancelButton")}
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
          name: profile.name,
          adress: profile.adress,
          phone: profile.phone,
          idProof: profile.idProof,
          pincode: profile.pincode,
          email: profile.email,
          image: profile.image,
          description: profile.description,
          display_name: profile.display_name,
        }}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="name"
              label={t("seller.registerForm.name")}
              rules={[
                {
                  required: true,
                  message: t(
                    "seller.registerForm.nameValidationAndPlaceholder"
                  ),
                },
              ]}
            >
              <Input
                placeholder={t(
                  "seller.registerForm.nameValidationAndPlaceholder"
                )}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="display_name"
              label={t("seller.registerForm.displayName")}
              rules={[
                {
                  required: true,
                  message: t(
                    "seller.registerForm.displayNameValidationAndPlaceholder"
                  ),
                },
              ]}
            >
              <Input
                style={{ width: "100%" }}
                placeholder={t(
                  "seller.registerForm.displayNameValidationAndPlaceholder"
                )}
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
              label={t("seller.registerForm.mobileNumber")}
              rules={[
                {
                  required: true,
                  message: t(
                    "seller.registerForm.mobileNumberValidationAndPlaceholder"
                  ),
                },
              ]}
            >
              <Input
                style={{ width: "100%" }}
                placeholder={t(
                  "seller.registerForm.mobileNumberValidationAndPlaceholder"
                )}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="idProof"
              label={t("seller.registerForm.idProof")}
              rules={[
                {
                  required: true,
                  message: t(
                    "seller.registerForm.idProofValidationAndPlaceholder"
                  ),
                },
              ]}
            >
              <Input
                style={{ width: "100%" }}
                placeholder={t(
                  "seller.registerForm.idProofValidationAndPlaceholder"
                )}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="email"
              label={t("seller.registerForm.email")}
              rules={[
                {
                  required: false,
                  message: t(
                    "seller.registerForm.emailValidationAndPlaceholder"
                  ),
                },
              ]}
            >
              <Input
                style={{ width: "100%" }}
                placeholder={t(
                  "seller.registerForm.emailValidationAndPlaceholder"
                )}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="adress"
              label={t("seller.registerForm.address")}
              rules={[
                {
                  required: true,
                  message: t(
                    "seller.registerForm.addressValidationAndPlaceholder"
                  ),
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder={t(
                  "seller.registerForm.addressValidationAndPlaceholder"
                )}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="image"
          label={t("seller.profile.profileImageText")}
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
  const { t } = useTranslation();

  const onCreate = (values) => {
    let obj = {
      name: values.name,
      email: values.email,
      password: "password",
      phone: values.phone,
      adress: values.adress,
      idProof: values.idProof,
      description: values.description,
      pincode: Number(values.pincode),
      image: "url",
    };

    axios
      .put(`${baseUrl}/sellers/edit/${sessionId()}`, obj)
      .then((result) => {
        if (result.status === 200) {
          alert("doen");
          props.callback();
        } else {
          alert("not doen");
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {});
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        {t("seller.profile.editText")}
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
