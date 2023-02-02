import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { cryptosReducer } from "./reducers/cryptos";
import { Provider } from "react-redux";
import { applyMiddleware, compose, legacy_createStore as createStore } from "redux";
import { logger } from "./middlewares";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

const composedEnhancers = compose(
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), //add redux devtools
  applyMiddleware(logger)
);

const store = createStore(cryptosReducer, composedEnhancers);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
