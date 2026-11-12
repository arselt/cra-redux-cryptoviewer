import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { cryptosReducer } from "./reducers/cryptos";
import { Provider } from "react-redux";
import { applyMiddleware, compose, legacy_createStore as createStore, combineReducers } from "redux";
import { logger } from "./middlewares";
import App from "./App";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cryptos"]
};

const rootReducer = combineReducers({ cryptos: cryptosReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(persistedReducer, composedEnhancers(applyMiddleware(logger)));

const persistor = persistStore(store);

import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
