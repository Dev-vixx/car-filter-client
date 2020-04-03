import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "../App";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./store";
const store = configureStore();
ReactDOM.hydrate(
  <ReduxProvider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReduxProvider>,
  document.getElementById("root")
);
