import React from "react";
import ReactDOM from "react-dom";
import "./helpers/sass/styles.css";
import { Provider } from "react-redux";
import store from "./features/store/store";
import MainRouter from "./router/router";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MainRouter />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);