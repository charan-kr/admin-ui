import React from "react";
import { Link, HashRouter } from "react-router-dom";

import { logo } from "../../utils/ImagePath";
import data from "./routes";

export default function SideMenu2() {
  const subElementsTemplate = (subelement) => {
    return (
      <>
        <Link to={subelement.link}>
          <h4 className="p-my-2 title sub-title p-text-capitalize">
            {subelement.name}
          </h4>
          <span>
            <i className={`${subelement.icon} p-mt-1`} />
          </span>
        </Link>
        <ul>
          {subelement.subMenu?.map((sub) => (
            <li className="sub p-mt-1" key={sub.name}>
              <Link
                to={sub.link}
                // to={(window.location.hash = sub.link)}
              >
                <h4 className="p-m-2 title sub-title p-text-capitalize">
                  {sub.name}
                </h4>
                <span>
                  <i className={`${sub.icon} p-mt-2`} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
  };
  return (
    <div>
      <div className="navigation">
        <div
          className="p-p-1"
          style={{
            background: "#fff",
            position: "sticky",
            top: "0",
            zIndex: "2",
          }}
        >
          <img alt="Dolphins India" width="100%" src={logo} />
        </div>

        <div className="p-mt-2">
          <HashRouter>
            {data.map((element) => (
              <div key={element.name}>
                <h3 className="menu p-m-0 p-pl-2">
                  <span className="title">{element.name}</span>
                  <span>
                    <i className="pi pi-ellipsis-h p-pr-2 icon" />
                  </span>
                </h3>
                <ul>
                  {element.subMenu.map((subelement) => (
                    <li className="p-text-center" key={subelement.name}>
                      {subElementsTemplate(subelement)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </HashRouter>
        </div>
      </div>
    </div>
  );
}
