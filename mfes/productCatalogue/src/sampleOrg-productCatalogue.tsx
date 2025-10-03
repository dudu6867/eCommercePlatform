import React from "react";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";
import ProductCatalogueApp from "./productCatalogueApp";
import NewApp from "./pages/ProductCatalogueApp"

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: NewApp,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
