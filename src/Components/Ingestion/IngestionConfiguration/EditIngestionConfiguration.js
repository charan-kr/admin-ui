import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { Toast } from "primereact/toast";

import IngestionConfiguration from "./IngestionConfiguration";
import CustomBreadcrumbs from "../../CustomBreadCrumbs";

import IngestionConfigurationService from "../../Service/IngestionConfigurationService";
import Loading from "../../Loading";

const EditIngestionConfiguration = () => {
  const { productAttributeKeysId } = useParams();
  const [config, setConfig] = useState(null);
  const toast = useRef(null);
  const ingestionConfigurationService = new IngestionConfigurationService();

  useEffect(() => {
    if (productAttributeKeysId) {
      ingestionConfigurationService
        .getProductConfigurationById(productAttributeKeysId)
        .then((response) => {
          setConfig({
            productAttributeKeysId: response.data.productAttributeKeysId,
            selectedCategory: response.data.category,
            manufacturer: response.data.manufacturer,
            selectedSubCategory: response.data.subCategory,
            selectedType: response.data.type,
            categoryId: response.data.categoryId,
            subCategoryId: response.data.subCategoryId,
            brand: response.data.model,
            displayTarget: response.data.productDisplayAttributes,
            nonDisplayTarget: response.data.productNonDisplayAttributes,
            parentProductAttributeKeysId:
              response.data.parentProductAttributeKeysId,
          });
          console.log(response.data);
        })
        .catch(() => {});
    }
  }, [productAttributeKeysId]); // eslint-disable-line react-hooks/exhaustive-deps

  const breadcrumbs = [
    {
      label: "Ingestion Configuration",
      path: "/ingestion/ingestionConfig",
      icon: "fa fa-home",
      onlyIcon: false,
      showIcon: false,
    },
    {
      label: `Edit (${productAttributeKeysId})`,
      path: `/ingestion/ingestionConfig/edit/${productAttributeKeysId}`,
      icon: "fa fa-home",
      onlyIcon: false,
      showIcon: false,
    },
  ];
  return (
    <div className="">
      <Toast ref={toast} />
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      {config ? (
        <IngestionConfiguration config={config} edit={true} />
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default EditIngestionConfiguration;
