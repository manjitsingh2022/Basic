// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
import reportWebVitals from "./reportWebVitals";

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
// import { AuthProvider } from "./context/AuthProvider";
import { Provider } from "react-redux";
import store from "./state/store";
const rootElement = document.getElementById("root");
render(
  <React.StrictMode>
    <BrowserRouter >
       {/* <AuthProvider> */}
       {/* <Provider store={store}> */}
       <App />
       {/* </Provider> */}
       
      {/* </AuthProvider> */}
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
reportWebVitals();
