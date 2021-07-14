import React from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const SelectBox = () => {
  const { i18n } = useTranslation();

  const handleChange = (event) => {
    i18n.changeLanguage(event);
  };

  return (
    <>
      <Select
        defaultValue={localStorage.getItem("i18nextLng") === "en" ? "en" : "hn"}
        style={{ width: 120 }}
        onChange={handleChange}
      >
        <Option value="en">English</Option>
        <Option value="hn">हिंदी</Option>
      </Select>
    </>
  );
};

export default SelectBox;
