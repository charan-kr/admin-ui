import React, { useEffect, useRef, useState } from "react";
import { SelectButton } from "primereact/selectbutton";
import { Button } from "primereact/button";
import CustomBreadcrumbs from "../../CustomBreadCrumbs";
import LanguageConfiguration from "../../Service/LanguageConfiguration";
import { Toast } from "primereact/toast";
import Loading from "../../Loading";

const breadcrumbs = [
  {
    label: "DVN Language Config",
    path: "/ingestion/dvnLanguageConfiguration",
    icon: "fa fa-home",
    onlyIcon: false,
    showIcon: false,
  },
  {
    label: "Settings",
    path: "/ingestion/dvnLanguageConfiguration/settings",
    icon: "fa fa-cogs",
    onlyIcon: false,
    showIcon: false,
  },
];
const basicLanguageSetup = [
  { key: "badge", label: "Badge", editable: false, default: "No" },

  {
    key: "bulletPoints",
    label: "Bullet Points",
    editable: true,
    default: "No",
  },
  { key: "combination", label: "Combination", editable: true, default: "No" },
  {
    key: "dvnId",
    label: "DVN ID",
    editable: false,
    default: "No",
  },
  { key: "images", label: "Images", editable: false, default: "No" },

  { key: "isFmcg", label: "is FMCG", editable: false, default: "No" },
  { key: "isbn", label: "ISBN", editable: false, default: "No" },
  { key: "description", label: "Description", editable: true, default: "No" },

  { key: "ean", label: "EAN", editable: false, default: "No" },
  { key: "isActive", label: "Is Active", editable: false, default: "No" },
  {
    key: "isDefaultValue",
    label: "Is Default Value",
    editable: false,
    default: "No",
  },
  { key: "productId", label: "Product Id", editable: false, default: "No" },
  { key: "mpn", label: "MPN", editable: false, default: "No" },
  { key: "type", label: "Type", editable: false, default: "No" },
  { key: "createdDt", label: "Created Date", editable: false, default: "No" },
  { key: "modifiedDt", label: "Modified Date", editable: false, default: "No" },
  {
    key: "publishedDt",
    label: "Published Date",
    editable: false,
    default: "No",
  },
  {
    key: "title",
    label: "Title",
    editable: true,
    default: "No",
  },
  { key: "tags", label: "Tags", editable: false, default: "No" },
  {
    key: "displayAttributes",
    label: "Display Attributes",
    editable: true,
    default: "No",
  },
  {
    key: "nonDisplayAttributes",
    label: "Non Display Attributes",
    editable: true,
    default: "No",
  },
  { key: "upc", label: "UPC", editable: false, default: "No" },
  { key: "webId", label: "Web Id", editable: false, default: "No" },
  { key: "status", label: "Status", editable: false, default: "No" },
];
const options = ["Yes", "No"];
const Configuration = () => {
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    badge: "No",
    bulletPoints: "No",
    combination: "No",
    createdDt: "No",
    description: "No",
    displayAttributes: "No",
    dvnId: "No",
    ean: "No",
    images: "No",
    isActive: "No",
    isDefaultValue: "No",
    isFmcg: "No",
    isbn: "No",
    modifiedDt: "No",
    mpn: "No",
    nonDisplayAttributes: "No",
    productId: "No",
    publishedDt: "No",
    status: "No",
    tags: "No",
    title: "No",
    type: "No",
    upc: "No",
    webId: "No",
  });
  const languageConfiguration = new LanguageConfiguration();

  useEffect(() => {
    languageConfiguration
      .getDvnLanguageConfigurationDetails()
      .then((res) => {
        setForm(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.response);
        toast?.current?.show({
          severity: "error",
          summary: error?.response?.data?.message,
        });
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prevstate) => ({
      ...prevstate,
      [name]: value,
    }));
  };
  const toast = useRef(null);

  const handleSave = () => {
    if (form.id) {
      languageConfiguration
        .updateDvnLanguageConfiguration(form.id, form)
        .then((res) => {
          toast?.current?.show({
            severity: "success",
            summary: res.data,
          });
        })
        .catch((error) => {
          console.log(error.response);
          toast?.current?.show({
            severity: "error",
            summary: error.response?.data?.message,
          });
        });
    } else {
      languageConfiguration
        .addDvnLanguageConfiguration(form)
        .then((res) => {
          toast?.current?.show({
            severity: "success",
            summary: res.data,
          });
        })
        .catch((error) => {
          console.log(error.response);
          toast?.current?.show({
            severity: "error",
            summary: error.response?.data?.message,
          });
        });
    }
  };
  const handleReset = () => {
    const obj = {};
    basicLanguageSetup.map((ele) => {
      obj[ele.key] = ele.default;
      return 1;
    });
    if (form.id) {
      setForm({ id: form.id, ...obj });
    } else {
      setForm(obj);
    }
  };
  return (
    <>
      <Toast ref={toast} />
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="p-grid">
            {basicLanguageSetup.map((attribute) => (
              <div key={attribute.key} className="p-col-12 p-md-6 p-xl-4 p-p-1">
                <div className="p-grid p-ai-center p-py-0">
                  <div className="p-col-6 p-py-0">
                    <div className="p-grid p-ai-center p-jc-between">
                      <label htmlFor={attribute.key}>{attribute.label}</label>
                      <span>:</span>
                    </div>
                  </div>
                  <div className="p-col-6 p-py-0">
                    <SelectButton
                      className="p-py-1"
                      disabled={!attribute.editable}
                      value={form[attribute.key]}
                      id={attribute.key}
                      name={attribute.key}
                      options={options}
                      onChange={(e) => handleFormChange(e)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-col-12 p-pb-0">
            <div className="p-mx-2">
              <small className="p-error p-invalid">
                No : English Only
                <br /> Yes : Allow Multiple Language
              </small>
            </div>
            <div>
              <div className="p-d-flex p-jc-between">
                <Button
                  onClick={() => handleReset()}
                  className="p-button-help p-py-1"
                  label="Reset"
                  icon="fa fa-refresh"
                />
                <Button
                  onClick={() => handleSave()}
                  className="p-button-success p-py-1"
                  label="Save"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Configuration;
