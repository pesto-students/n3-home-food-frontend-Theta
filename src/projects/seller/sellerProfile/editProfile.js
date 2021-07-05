import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Modal, Row, Upload } from "antd";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { sessionId } from "utils/helpers";
import { editProfile } from "../utils/api";
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
      okText={t("Header.Save")}
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
              name="description"
              label={t("seller.registerForm.formDescription")}
              rules={[
                {
                  required: true,
                  message: t(
                    "seller.registerForm.formDescriptionNameValidationAndPlaceholder"
                  ),
                },
              ]}
            >
              <Input
                style={{ width: "100%" }}
                placeholder={t(
                  "seller.registerForm.formDescriptionNameValidationAndPlaceholder"
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

export const EditProfile = ({ profile, callBack }) => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  const onCreate = async (values) => {
    console.log(values);
    const data = new FormData();

    data.append("name", values.name);
    data.append("email", values.email);
    data.append("phone", values.phone);
    data.append("adress", values.adress);
    data.append("idProof", values.idProof);
    data.append("description", values.description);
    data.append("pincode", Number(values.pincode));
    data.append("image", values.image[0].originFileObj);

    try {
      let response = await editProfile(sessionId(), data);
      if (response.status === 200) {
        callBack();
        setVisible(false);
        console.log(response, response.status);
      }
    } catch (error) {}
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
