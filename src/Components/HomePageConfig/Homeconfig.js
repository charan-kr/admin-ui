import React, { useEffect, useState } from "react";

import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Divider } from "primereact/divider";

import Sections from "./Sections";

import { convertDateToString } from "../../utils/convertDateToString";
import { convertStringToDate } from "../../utils/convertStringToDate";
import HomePageConfigService from "../Service/HomePageConifgService";
import { useHistory } from "react-router-dom";
import { useLogs } from "./../../hooks/useLogs";
import { useToast } from "../../hooks/useToast";
import { futureDay } from "../../utils/helpers";

const isActiveOptions = [
  { name: "Yes", value: true, severity: "success" },
  { name: "No", value: false, severity: "danger" },
];
function HomeConfig(props) {
  const { debugLog } = useLogs();
  const { edit = false, config = null } = props;
  const [loading, setLoding] = useState(true);
  const [palettes, setPalettes] = useState([]);
  const [createdBy, setCreatedBy] = useState("admin-1");
  const [createdDt, setCreatedDt] = useState(new Date());
  const [modifiedBy, setModifiedBy] = useState("admin-1");
  const [modifiedDt, setModifiedDt] = useState(new Date());
  const [isActive, setIsActive] = useState(true);
  const [configName, setConfigName] = useState("");
  const [eventName, setEventName] = useState("");

  useEffect(() => {
    if (config) {
      setCreatedBy(config.createdBy);
      setCreatedDt(convertStringToDate(config.createdDt));
      setModifiedBy(config.modifiedBy);
      setModifiedDt(convertStringToDate(config.modifiedDt));
      setModifiedBy(config.modifiedBy);

      setIsActive(config.isActive);
      setConfigName(config.configName);
      setEventName(config.eventName);
      setPalettes(config.palettes);
    }
    setLoding(false);
  }, [config]);

  const createdBody = (palettes) => {
    const body = {
      createdBy,
      createdDt: convertDateToString(
        createdDt || new Date(),
        "dd-mm-yyyy HH:MM A"
      ),
      modifiedBy,
      modifiedDt: convertDateToString(
        modifiedDt || new Date(),
        "dd-mm-yyyy HH:MM A"
      ),
      configName,
      eventName,
      isActive,
      isDefault: false,
      palettes,
      startTime: convertDateToString(new Date(), "dd-mm-yyyy HH:MM A"),
      endTime: convertDateToString(futureDay(100), "dd-mm-yyyy HH:MM A"),
    };

    debugLog(JSON.stringify(body, null, 2), body);
    return body;
  };
  const toast = useToast();
  const handleUpdate = (palettes) => {
    const body = { id: config.paletterId, ...createdBody(palettes) };

    HomePageConfigService.updateHomePageConfigById(
      config.paletterId,
      body
    ).then(() => {
      toast({
        severity: "success",
        summary: "Created new Landing Page Pallets",
      });
      history.goBack();
    });
  };
  const history = useHistory();
  const handleSave = (palettes) => {
    const body = createdBody(palettes);

    HomePageConfigService.createHomePageConfig(body).then((response) => {
      console.log(response.data);
      history.goBack();
    });
  };
  return (
    <React.Fragment>
      <div className="p-grid p-pt-3 ">
        <div className="p-col-3">
          <label>Created By</label>
          <div className="p-inputgroup">
            <InputText
              disabled
              placeholder="Created By"
              name="createdBy"
              value={createdBy}
            />
          </div>
        </div>
        <div className="p-col-3">
          <label>Created Date</label>
          <div className="p-inputgroup">
            <Calendar
              disabled
              value={createdDt}
              placeholder="dd/mm/yyy"
              dateFormat="dd-mm-yy"
              hideOnDateTimeSelect
              showIcon
              yearRange="2021:2030"
              yearNavigator
              monthNavigator
            />
          </div>
        </div>

        <div className="p-col-3">
          <label>Modified By</label>
          <div className="p-inputgroup">
            <InputText value={modifiedBy} disabled placeholder="Modified By" />
          </div>
        </div>
        <div className="p-col-3">
          <label>Modified Date</label>
          <div className="p-inputgroup">
            <Calendar
              disabled
              value={modifiedDt}
              placeholder="dd/mm/yyy"
              dateFormat="dd-mm-yy"
              hideOnDateTimeSelect
              showIcon
              yearRange="2021:2030"
              yearNavigator
              monthNavigator
            />
          </div>
        </div>
        <div className="p-col-3">
          <label htmlFor="isActive">isActive</label>
          <div className="p-inputgroup">
            <Dropdown
              id="isActive"
              placeholder="Choose isActive"
              options={isActiveOptions}
              name="isActive"
              optionLabel="name"
              optionValue="value"
              value={isActive}
              onChange={(e) => setIsActive(e.value)}
            />
          </div>
        </div>
        <div className="p-col-3">
          <label>Configuration Name</label>
          <div className="p-inputgroup">
            <InputText
              placeholder="Configuration Name"
              name="configName"
              value={configName}
              onChange={(e) => setConfigName(e.target.value)}
            />
          </div>
        </div>
        <div className="p-col-3">
          <label>Event Name</label>
          <div className="p-inputgroup">
            <InputText
              placeholder="Event Name"
              name="eventName"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>
        </div>

        <div className="p-col-12"></div>
        <div className="p-col-12 p-py-0">
          <Divider className="p-my-2" align="center" type="dashed">
            <span style={{ letterSpacing: "4px", fontWeight: "500" }}>
              Palettes
            </span>
          </Divider>
          {loading ? (
            "Loading"
          ) : (
            <Sections
              passedSections={palettes}
              handleSave={handleSave}
              handleUpdate={handleUpdate}
              edit={edit}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default HomeConfig;
