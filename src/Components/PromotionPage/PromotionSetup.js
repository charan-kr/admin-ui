import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { TabPanel, TabView } from "primereact/tabview";
import { PromotionService } from "../Service/PromotionService";
import { PickList } from "primereact/picklist";
import NewPromotion from "./NewPromotion";
import { convertStringToDate } from "../Utilities/DateAndTimeConverter/convertDateFormat";
const searchByTypes = [
  { value: "category", name: "Category" },
  { value: "subCategory", name: "Sub Category" },
  { value: "prouct", name: "Product" },
  { value: "dvn", name: "DVN" },
  { value: "seller", name: "Seller" },
  { value: "sku", name: "SKU" },
];
const initial = {
  promotionOfferEventName: "Independence Day Offer",
  promotionOfferType: "priceOff",
  promotionOfferValue: "1000",
  isActive: "Y",
  promotionOfferValidFrom: "10-08-2021 12:00 AM",
  promotionOfferValidTo: "16-08-2021 11:59 PM",
};
const PromotionSetup = (props) => {
  const { promotion } = props;
  const promotionService = new PromotionService();
  const [searchBy, setSearchby] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const [source, setSource] = useState([]);
  const [target, setTarget] = useState([]);
  const [initialValues, setInitialValues] = useState(initial);

  useEffect(() => {
    if (promotion) {
      const {
        promotionOfferEventName,
        promotionOfferType,
        promotionOfferValue,
        isActive,
        promotionOfferValidFrom,
        promotionOfferValidTo,
        promotionDetailsList,
      } = promotion;
      setTarget(promotionDetailsList);
      setInitialValues({
        promotionOfferEventName,
        promotionOfferType,
        promotionOfferValue,
        isActive,
        promotionOfferValidFrom: convertStringToDate(
          promotionOfferValidFrom,
          "dd-MM-yyyy hh:mm a"
        ),
        promotionOfferValidTo: convertStringToDate(
          promotionOfferValidTo,
          "dd-MM-yyyy hh:mm a"
        ),
      });
      // setProceed(true);
      setActiveIndex(1);
    }
  }, [promotion]);

  const clearAll = () => {
    setSource([]);
    setTarget([]);
    setSearchValue("");
    setSearchby(null);
  };
  const onChange = (e) => {
    setSource(e.source);
    setTarget(e.target);
  };
  const handleSearch = () => {
    promotionService
      .getPromotionsSearchFilter(searchBy, searchValue)
      .then((response) => {
        setTarget([]);
        setSource(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSave = (values) => {
    // setInitialValues(values);
    let body = {};
    if (promotion?.promotionOfferId) {
      body = {
        ...promotion,
        modifiedBy: "kumar",
        modifiedDt: "02-06-2020 05:05 PM",
        ...values,
        promotionDetailsList: target,
      };
    } else {
      body = {
        createdBy: "praneeth",
        createdDt: "19-02-2020 03:05 PM",
        modifiedBy: "kumar",
        modifiedDt: "02-06-2020 05:05 PM",

        ...values,
        promotionDetailsList: target,
      };
    }
    console.log(body);
    setActiveIndex(2);
  };
  const handleProceed = () => {
    setActiveIndex(1);
  };
  const moveBack = (values) => {
    setActiveIndex(0);
    setInitialValues(values);
  };
  const itemTemplate = (item) => {
    return <span>{item.name}</span>;
  };
  return (
    <>
      <TabView
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
      >
        <TabPanel header="Setup">
          <div>
            <div className="p-formgroup-inline">
              <div className="p-field">
                <label htmlFor="Search By" className="p-sr-only">
                  <b>Promotion Type</b>
                </label>
                <Dropdown
                  id="searchBy"
                  name="searchBy"
                  value={searchBy}
                  onChange={(e) => setSearchby(e.value)}
                  style={{ width: "220px" }}
                  options={searchByTypes}
                  optionLabel="name"
                  placeholder="Promotion Type "
                  scrollHeight="150px"
                />
              </div>
              <div className="p-field">
                <label htmlFor="searchValue" className="p-sr-only">
                  search Value
                </label>
                <InputText
                  disabled={!searchBy}
                  id="searchValue"
                  name="searchValue"
                  onChange={(e) => setSearchValue(e.target.value)}
                  value={searchValue}
                  placeholder="search by select values"
                />
              </div>
              <Button
                type="button"
                label="Search"
                onClick={() => handleSearch()}
              />
            </div>
            <div>
              <PickList
                source={source}
                target={target}
                itemTemplate={itemTemplate}
                onChange={onChange}
                sourceHeader="Available"
                targetHeader="Selected"
                showSourceControls={false}
                showTargetControls={false}
              />
            </div>
            <div className="p-d-flex p-jc-between p-mt-2">
              <Button
                onClick={() => clearAll()}
                className="p-button-info "
                label="Clear"
              />

              <Button
                disabled={!target || target.length < 1}
                onClick={() => handleProceed(target)}
                className="p-ml-4"
                label="Proceed"
              />
            </div>
          </div>
        </TabPanel>
        <TabPanel disabled={activeIndex < 1} header="Details">
          <NewPromotion
            initialValues={initialValues}
            moveBack={moveBack}
            handleSave={handleSave}
          />
        </TabPanel>
        <TabPanel disabled={activeIndex < 2} header="Exclude"></TabPanel>
      </TabView>
    </>
  );
};

export default PromotionSetup;
