import "./polyfills";
import "./assets/base.scss";
import "./assets/custom.scss";

import * as serviceWorker from "./serviceWorker";

import { onValue, ref } from 'firebase/database';

import { HashRouter } from "react-router-dom";
import Main from "./pages/Main";
import Projects from "./Projects";
import { Provider } from "react-redux";
import React from "react";
import configureStore from "./config/configureStore";
import { createRoot } from 'react-dom/client';
import { db } from "./firebase";

// import { getDoctors } from './firebase.js'

const store = configureStore();
const rootElement = document.getElementById("root");

const renderApp = (Component) => {
  return (
  <Provider store={store}>
    {/* <Projects /> */}
    <HashRouter>
      <Component />
    </HashRouter>
  </Provider>
  )
};

const root = createRoot(rootElement).render(renderApp(Main));

if (module.hot) {
  module.hot.accept("./pages/Main", () => {
    const NextApp = require("./pages/Main").default;
    root.render(renderApp(NextApp));
  });
}
serviceWorker.unregister();