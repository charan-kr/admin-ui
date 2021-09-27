import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { RadioButton } from "primereact/radiobutton";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { HOME_PAGE_SECTION_TYPES } from "../../../utils/constants";
import BannerService from "./../../Service/BannerService";
import SearchDBService from "./../../Service/SearchDBService";

const availableTypes = [
  HOME_PAGE_SECTION_TYPES.regular,
  HOME_PAGE_SECTION_TYPES.scroll,
  HOME_PAGE_SECTION_TYPES.rotate,
  HOME_PAGE_SECTION_TYPES.advertise,
  HOME_PAGE_SECTION_TYPES.badging,
  HOME_PAGE_SECTION_TYPES.personalization,
];

const PERSONALIZATION = {
  history: "HISTORY",
  recommended: "RECOMMENDED",
  inspired: "INSPIRED",
};
const intialObject = { text: "", link: "", align: "left" };
const sectionObject = {
  type: "",
  count: null,
  header: intialObject,
  footer: intialObject,
  subSections: [],
};
const subSectionObject = {
  link: "",
  header: intialObject,
  footer: intialObject,
  text: null,
  images: [],
};
const imageObject = {
  url: "",
  width: "",
  height: "",
  header: intialObject,
  footer: intialObject,
  item: null,
};

function NewSection({ addSection }) {
  const MIN_SUB_SECTION = 1;
  const [type, setType] = useState("");
  const [subSectionsLen, setSubSectionsLen] = useState(2);
  const [subSectionImages, setSubSectionImages] = useState([]);
  const [bannersList, setBannersList] = useState([]);
  const [searchDBList, setSearchDBList] = useState([]);
  const [personalizationList] = useState([
    PERSONALIZATION.history,
    PERSONALIZATION.recommended,
    PERSONALIZATION.inspired,
  ]);

  const loadBanners = () => {
    const bannerService = new BannerService();
    bannerService.getAllActiveBanners().then((res) => {
      setBannersList(res.data);
    });
  };

  const loadBadges = () => {
    const searchDBService = new SearchDBService();
    searchDBService.getAllSearchDBs().then((res) => {
      setSearchDBList(
        Array.from(new Set(res.data.map((ele) => ele.keyword))).map((ele) => ({
          keyword: ele,
        }))
      );
    });
  };

  const handleCreateSection = () => {
    let keyword = "";
    const subSections = subSectionImages.map((ele) => {
      let images = [];
      switch (type) {
        case HOME_PAGE_SECTION_TYPES.scroll:
          images = ele.imagesLen?.imageUrlPaths.map((url) => ({
            ...imageObject,
            url,
            id: uuidv4(),
          }));
          break;
        case HOME_PAGE_SECTION_TYPES.personalization:
        case HOME_PAGE_SECTION_TYPES.badging:
          keyword = ele.imagesLen;
          break;
        default:
          images = [...Array(ele.imagesLen).keys()].map(() => ({
            ...imageObject,
            id: uuidv4(),
          }));
      }

      const subSection = {
        ...subSectionObject,
        images,
        id: uuidv4(),
      };
      return subSection;
    });

    const section = {
      ...sectionObject,
      id: uuidv4(),
      type,
      keyword,
      subSections,
    };
    // console.log(section);
    addSection(section);
  };
  const handleTypeChange = (value) => {
    setType(value);

    switch (value) {
      case HOME_PAGE_SECTION_TYPES.regular:
        setSubSectionsLen(MIN_SUB_SECTION);
        const images = [...Array(MIN_SUB_SECTION).keys()].map(() => ({
          id: uuidv4(),
          imagesLen: 1,
        }));
        setSubSectionImages(images);
        break;
      case HOME_PAGE_SECTION_TYPES.scroll:
        loadBanners();
        setSubSectionsLen(1);
        setSubSectionImages([
          {
            id: uuidv4(),
            imagesLen: 1,
          },
        ]);
        break;
      case HOME_PAGE_SECTION_TYPES.badging:
        loadBadges();
        setSubSectionsLen(1);
        setSubSectionImages([
          {
            id: uuidv4(),
            imagesLen: 1,
          },
        ]);
        break;
      default:
        setSubSectionsLen(1);
        setSubSectionImages([
          {
            id: uuidv4(),
            imagesLen: 1,
          },
        ]);
    }
  };
  const updateSubSectionImages = (value, id) => {
    const updatedvalue = subSectionImages.map((ele) =>
      ele.id === id ? { ...ele, imagesLen: value } : ele
    );
    setSubSectionImages(updatedvalue);
  };
  const handleSubSectionLengthChange = (value) => {
    setSubSectionsLen(value);
    const images = [...Array(value).keys()].map(() => ({
      id: uuidv4(),
      imagesLen: 1,
    }));
    setSubSectionImages(images);
  };
  const splitColLen = () => {
    switch (subSectionsLen) {
      case 1:
        return 12;
      case 2:
        return 6;
      case 3:
        return 4;
      case 4:
        return 3;

      default:
        return 12;
    }
  };
  return (
    <React.Fragment>
      <div className="p-grid">
        <h4 className="p-m-0 p-col-4 p-p-0">Select Section Type</h4>
        <div className="p-inputgroup p-col p-p-0">
          <div className="p-d-flex">
            {availableTypes.map((ele) => (
              <div key={ele} className="p-field-radiobutton p-mb-0">
                <RadioButton
                  inputId={ele}
                  name="type"
                  value={ele}
                  onChange={(e) => handleTypeChange(e.value)}
                  checked={type === ele}
                />
                <label className="p-pr-2" htmlFor={ele}>
                  {ele}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {[
        HOME_PAGE_SECTION_TYPES.regular,
        HOME_PAGE_SECTION_TYPES.advertise,
      ].includes(type) && (
        <div className="p-grid p-py-3">
          <h4 className="p-m-0 p-col-4 p-p-0">Choose No. of Sub Sections</h4>
          <div className="p-inputgroup p-col p-p-0">
            <div className="p-d-flex">
              {[1, 2, 3, 4].map((ele) => (
                <div key={ele} className="p-field-radiobutton p-mb-0 p-pr-4">
                  <RadioButton
                    inputId={ele}
                    name="subSectionsLen"
                    value={ele}
                    onChange={(e) => handleSubSectionLengthChange(e.value)}
                    checked={subSectionsLen === ele}
                  />
                  <label className="p-pr-2" htmlFor={ele}>
                    {ele}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {![HOME_PAGE_SECTION_TYPES.advertise].includes(type) && (
        <div className="p-grid">
          {subSectionImages.map((ele, index) => (
            <div key={ele.id} className={`p-col-${splitColLen()}`}>
              <h4 className="p-m-0">Subsection {index + 1} items</h4>
              <div className="p-inputgroup">
                {type === HOME_PAGE_SECTION_TYPES.regular ? (
                  <Dropdown
                    placeholder="Choose Images Len"
                    options={[1, 2, 3, 4]}
                    value={ele.imagesLen}
                    onChange={(e) => updateSubSectionImages(e.value, ele.id)}
                  />
                ) : type === HOME_PAGE_SECTION_TYPES.scroll ? (
                  <>
                    <Dropdown
                      filter
                      filterBy="name"
                      placeholder="-- Select Banner Name --"
                      optionLabel="name"
                      value={ele.imagesLen}
                      onChange={(e) => updateSubSectionImages(e.value, ele.id)}
                      options={bannersList}
                    />
                  </>
                ) : type === HOME_PAGE_SECTION_TYPES.badging ? (
                  <>
                    <Dropdown
                      filter
                      placeholder="-- Select Badging Keyword --"
                      filterBy="keyword"
                      optionValue="keyword"
                      optionLabel="keyword"
                      value={ele.imagesLen}
                      onChange={(e) => updateSubSectionImages(e.value, ele.id)}
                      options={searchDBList}
                    />
                  </>
                ) : type === HOME_PAGE_SECTION_TYPES.personalization ? (
                  <>
                    <Dropdown
                      placeholder="-- Select Personlization Keyword --"
                      value={ele.imagesLen}
                      onChange={(e) => updateSubSectionImages(e.value, ele.id)}
                      options={personalizationList}
                    />
                  </>
                ) : (
                  <InputNumber
                    value={ele.imagesLen}
                    onChange={(e) => updateSubSectionImages(e.value, ele.id)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {type && (
        <Button
          onClick={() => handleCreateSection()}
          className="p-button-info p-p-2"
          style={{ width: "100%" }}
          label="Create Section"
        />
      )}
    </React.Fragment>
  );
}

export default NewSection;
