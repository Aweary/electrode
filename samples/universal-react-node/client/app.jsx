import React from "react";
import {render} from "react-dom";
import { routes } from "./routes";
import { Router, browserHistory } from "react-router";
import { createStore, compose } from "redux";
import { Provider } from "react-redux";
import "styles/base.css";
import rootReducer from "./reducers";

import DevTools from "../client/devtools";

require.ensure(["./register-service-worker"], (require) => {
  require("./register-service-worker")();
}, "register-service-worker");


const enhancer = compose(
  // Add middlewares you want to use in development:
  // applyMiddleware(d1, d2, d3),
  DevTools.instrument()
);


window.webappStart = () => {
  const initialState = window.__PRELOADED_STATE__;
  const store = createStore(rootReducer, initialState, enhancer);
  render(
      <Provider store={store}>
        <div>
          <Router history={browserHistory}>{routes}</Router>
          <DevTools />
        </div>
      </Provider>,
    document.querySelector(".js-content")
  );
};
