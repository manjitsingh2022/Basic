import reportWebVitals from "./reportWebVitals";
import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Router } from "react-router-dom";
import App from "./App";
// import { Provider,  } from "react-redux";
// import store from "./reactRedux/store";
// import { RequireAuth } from "./routingComponent/requireAuth";
const rootElement = document.getElementById("root");

render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
      <BrowserRouter>
      {/* <Router> */}
        <App />
        {/* </Router> */}
      </BrowserRouter>
    {/* </Provider> */}
  </React.StrictMode>,
  rootElement
);
reportWebVitals();
