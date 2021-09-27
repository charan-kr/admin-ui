import React from "react";
import { useHistory } from "react-router-dom";
const NoMatch = () => {
  const history = useHistory();
  return (
    <div style={{ marginLeft: "10px" }}>
      <h1>404Page</h1>
      <p>
        Redirecting to{" "}
        <span
          style={{ color: "dodgerblue", cursor: "pointer" }}
          onClick={() => history.push("/")}
        >
          Login Page
        </span>
      </p>
    </div>
  );
};

export default NoMatch;
