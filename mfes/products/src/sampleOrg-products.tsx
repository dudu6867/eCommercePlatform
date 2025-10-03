import React from "react";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";
import ProductApp from "./ProductApp";
import ProductAppNew from "./pages/ProductApp"

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: ProductAppNew,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
