import { combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { ProductsReducers } from "./reducers/ProductReducers";
import { legacy_createStore } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
const reducer = combineReducers({
  products: ProductsReducers,
});

let initialState = { };
const middleware = [thunk];

const store = legacy_createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
