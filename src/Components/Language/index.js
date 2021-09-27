import React from "react";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { RadioButton } from "primereact/radiobutton";

import { Ind_flag } from "../../utils/ImagePath";

const available_languages = [
  { value: "हिंदी - HI", code: "hi" },
  { value: "தமிழ் - TA", code: "ta" },
  { value: "తెలుగు-TE", code: "te" },
  { value: "ಕನ್ನಡ - KN", code: "kn" },
  { value: "മലയാളം -ML", code: "ml" },
];

function Language({
  op,
  setSelectedLanguage,
  selectedLanguage,
  languages = available_languages,
}) {
  return (
    <React.Fragment>
      <div onMouseLeave={() => op.current.hide()}>
        <div className="p-field-radiobutton p-my-1">
          <small>
            <RadioButton
              inputId="English-EN"
              name="language"
              value="en"
              onChange={(e) => setSelectedLanguage(e.value)}
              checked={selectedLanguage === "en"}
            />
            <label htmlFor="English-EN" className="p-pl-2">
              English-EN
            </label>
          </small>
        </div>
        <Divider className="p-mt-2 p-mb-3 p-ml-4" />
        <div class="p-d-flex p-flex-column p-p-0 p-m-0 p-mr-6">
          {languages.map((lan) => {
            return (
              <div key={lan.code} className="p-field-radiobutton p-mb-1">
                <small>
                  <RadioButton
                    inputId={lan.code}
                    name="language"
                    value={lan.code}
                    onChange={(e) => setSelectedLanguage(e.value)}
                    checked={selectedLanguage === lan.code}
                  />
                  <label
                    style={{ cursor: "pointer" }}
                    htmlFor={lan.code}
                    className="p-pl-2"
                  >
                    {lan.value}
                  </label>
                </small>
              </div>
            );
          })}
        </div>
        <Divider className="p-my-2 p-ml-4" />
        <div className="p-d-none">
          <div className="p-text-left">
            <div
              className="p-mb-2 p-text-left"
              style={{ lineHeight: "0.7rem" }}
            >
              <img
                style={{ width: "30px" }}
                className="flag-img2 p-pr-1"
                src={Ind_flag}
                alt={"Flag"}
              />
              <small style={{ verticalAlign: "top" }}>
                <span>You are shopping on DolphinsIndia.in.</span>
              </small>
            </div>
          </div>
          <div className="p-text-center">
            <Button className="p-button-info p-button-text p-m-0 p-p-0">
              <small>Change country/region</small>
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Language;
