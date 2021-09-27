import React from "react";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { Toast } from "primereact/toast";

const ToastMessage = () => {
  const payload = useSelector((state) => state?.toast?.payload);
  const toast = useRef(null);
  useEffect(() => {
    if (payload) {
      toast?.current?.show(payload);
    }
  }, [payload]);
  return (
    <>
      <Toast ref={toast} />
    </>
  );
};

export default ToastMessage;
