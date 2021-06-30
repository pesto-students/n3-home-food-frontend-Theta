import { Select } from "antd";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const SelectBox = () => {
  const { t, i18n } = useTranslation();

  const handleChange = (event) => {
    console.log(event)
    i18n.changeLanguage(event);
  };

  return (
    <>
    <Select
      defaultValue="English"
      style={{ width: 120 }}
      onChange={handleChange}
    >
      <Option value="en">English</Option>
      <Option value="hn">Hindi</Option>
    </Select>
    </>
  );
};

export default SelectBox;
