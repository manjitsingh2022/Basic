import reportWebVitals from "./reportWebVitals";
import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Router } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./state/store";
import { RequireAuth } from "./routingComponent/requireAuth";
const rootElement = document.getElementById("root");
render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <Router> */}
        <RequireAuth>
          {/* <Provider store={store}> */}
          <App />
          {/* </Provider> */}
        </RequireAuth>
      {/* </Router> */}
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
reportWebVitals();
