import React, {  useEffect, useState } from "react";
// import { useLocation, useParams } from "react-router-dom";
// import axios from "../../api/axios";
import {/*  message, */ Input, message } from "antd";
import axios from "axios";
import { useLocation } from "react-router-dom";
const { Search } = Input;
export const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  console.log("map",searchResults)
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("query");
    useEffect(() => {
      const searchProduct = async () => {
        try {
          // const { data } = await axios.get(`API_URL/search?q=${query}`);
          // setSearchResults(data.products);
          await axios.get(`/advertisements?sort=${query}`).then((response) => {
            setSearchResults(response?.data?.response);
            console.log("advertisements", response?.data?.response);})
          } catch (error) {
           message.error(error.response?.data?.message,"error");
           console.log("error while update document", error);
           }
          };
           searchProduct();
         }, []);
  const onSearch = (value) => {
    console.log(value,"search");
    setSearchResults(value)
  };
  return (
    <>
      <Search  placeholder="input search text" onSearch={onSearch} enterButton value={searchResults.name}/>
        {/* {searchResults.map((item) => {
          return (
            <>
              <div key={item._id}>
                <p>{item.name}</p>
              </div>
            </>
          );
        })} */}
    </>
  );
};
