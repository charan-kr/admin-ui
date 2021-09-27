import React, { useEffect, useRef } from "react";
import { Messages } from "primereact/messages";
import { Message } from "primereact/message";
const ToasterMessages = () => {
  const msgs1 = useRef(null);
  const msgs3 = useRef(null);

  useEffect(() => {
    msgs1.current.show([
      {
        severity: "error",
        summary: "Error",
        detail: "Message Content",
        sticky: true,
      },
    ]);
    msgs3.current.show({
      severity: "info",
      sticky: true,
      content: (
        <React.Fragment>
          <img
            alt="logo"
            src="showcase/images/logo.png"
            onError={(e) =>
              (e.target.src =
                "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
            }
            width="32"
          />
          <div className="p-ml-2">Always bet on Prime.</div>
        </React.Fragment>
      ),
    });
  }, []);
  return (
    <div>
      <div className="card">
        <Messages ref={msgs3} />
      </div>
    </div>
  );
};
export default ToasterMessages;
