import { createStoreHook } from "react-redux";
import { combineReducers } from "redux";
// import thunk from "redux-thunk";
const reducer = combineReducers({
  
});

let initialState = {
  
};
// const middleware = [thunk];
const store = createStoreHook(
  reducer,
  initialState,
);

export default store;