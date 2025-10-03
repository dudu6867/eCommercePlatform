import React from "react";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";
import NewCartApp from "./pages/CartApp"

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: NewCartApp,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
