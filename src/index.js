import reportWebVitals from "./reportWebVitals";
import React from "react";
import { render } from "react-dom";
import { BrowserRouter} from "react-router-dom";
import App from "./App";
import { AppProvider } from "./context/AppProvider";
// import store from "./reactRedux/store";
// import { Provider } from "react-redux";
// import { RequireAuth } from "./routingComponent/requireAuth";
const rootElement = document.getElementById("root");

render(
  <React.StrictMode>

    {/* <Provider store={store}> */}
    <AppProvider>
      <BrowserRouter >
        {/* <Router> */}
        <App />
        {/* </Router> */}
      </BrowserRouter>
    </AppProvider>
    {/* </Provider> */}
  </React.StrictMode>,
  rootElement
);
reportWebVitals();






