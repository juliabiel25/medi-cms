import "./polyfills";
import "./assets/base.scss";

import * as serviceWorker from "./serviceWorker";

import { HashRouter } from "react-router-dom";
import Main from "./pages/Main";
import { Provider } from "react-redux";
import React from "react";
import configureStore from "./config/configureStore";
import { createRoot } from 'react-dom/client';

const store = configureStore();
const rootElement = document.getElementById("root");

const renderApp = (Component) => (
  <Provider store={store}>
    <HashRouter>
      <Component />
    </HashRouter>
  </Provider>
);

const root = createRoot(rootElement).render(renderApp(Main));

if (module.hot) {
  module.hot.accept("./pages/Main", () => {
    const NextApp = require("./pages/Main").default;
    root.render(renderApp(NextApp));
  });
}
serviceWorker.unregister();