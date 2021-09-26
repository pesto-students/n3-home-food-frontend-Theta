import * as React from "react";
import { useTranslation } from "react-i18next";

const DataNotFound = () => {
  const { t } = useTranslation();

  return <p>{t("Header.NotFound")}</p>;
};

export default DataNotFound;
