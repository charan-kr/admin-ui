import React from "react";

export default function InputRequired({ error }) {
  return (
    <div>
      <div className="p-grid p-justify-center p-mt-1 p-error p-text-capitalize">
        {error}
      </div>
    </div>
  );
}
