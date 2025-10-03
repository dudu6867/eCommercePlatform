import React from "react";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";
import OrderApp from "./OrderApp";
import NewOrderApp from "./pages/OrderApp"

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: NewOrderApp,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
