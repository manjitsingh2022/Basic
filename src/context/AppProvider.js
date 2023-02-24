import { message } from "antd";
import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "../api/axios";
import { reducer } from "./reducer";
const AppContext = createContext({});
let API = `/advertisements`;
// console.log(API, "api");
const initialState = {
  isloading: true,
  name: "",
  address: "",
  city: "",
  nbHits: 0,
  nbPages: 0,
  page: 0,
  hits: [],

};
const AppProvider = ({ children }) => {
  //   const [state, setState] = useState(initialState);
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("state", state);
  const getData = async (url) => {
    // console.log(url, "url");
    try {
      const response = await axios.get(url);
      console.log("responseAppContext", response.data.response);
      dispatch({ type: "SET_LOADING" });
      dispatch({
        type: "GET_ADVERTISEMENTS",
        payload: {
          hits: response.data.response,
          nbHits: response.data.nbHits,
        },
      });
    } catch (error) {
      message.error("Select category error");
    }
  };
  // to remove the post
  const removePost = (_id) => {
    // console.log("listid", _id);
    dispatch({ type: "REMOVE_POST", payload: _id });
  };

  // search post all reponse
  const searchPost = (searchquery) => {
    dispatch({ type: "SEARCH_QUERY", payload: searchquery  });
    console.log("search", searchquery);
  };
  // address  all reponse
  const SearchAddress = (addressquery) => {
    dispatch({ type: "SEARCH_ADDRESSQUERY", payload: addressquery});
    console.log("addressquery", addressquery);
  };
  // pagination
  const getNextPage = () => {
    dispatch({
      type: "NEXT_PAGE",
    });
  };
  const getPrevPage = () => {
    dispatch({
      type: "PREV_PAGE",
    });
  };

  useEffect(() => {
    getData(
      `${API}?name=${state.name}&page=${state.page}&address=${state.address}&city=${state.city}`
    );
  }, [state.name, state.page, state.address,state.city]);
  return (
    <AppContext.Provider
      value={{
        ...state,
        removePost,
        searchPost,
        getNextPage,
        getPrevPage,
        SearchAddress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// custom hook create
const UseGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider, UseGlobalContext };
