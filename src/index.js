import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Row } from "antd";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import SpinnerLoader from "components/spinnerLoader/spinnerLoader";
import reducers from "./store/reducer/reducer";
import { saveToLocalStorage, loadToLocalStorage } from "./store/encryptStore";

// use multi laungauage
import "./i18next";

let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
export let store = createStoreWithMiddleware(reducers);
const persistedState = loadToLocalStorage();

store = createStoreWithMiddleware(
  reducers,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => saveToLocalStorage(store.getState()));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Suspense
          fallback={
            <Row className="center">
              <SpinnerLoader />
            </Row>
          }
        >
          <App />
        </Suspense>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
