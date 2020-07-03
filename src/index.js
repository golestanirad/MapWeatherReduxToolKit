import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
///// project files
import App from "./App";
import TestCode from './test-code';
import store from "./redux/store";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
