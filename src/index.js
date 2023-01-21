import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { cryptosReducer } from "./reducers/cryptos";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

const store = createStore(cryptosReducer);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
