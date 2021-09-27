import React from "react";
import ReactDOM from "react-dom";
import { PersistGate } from "redux-persist/integration/react";

import "./index.css";
import App from "./App";
import "primeflex/primeflex.css";

import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/Store";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
