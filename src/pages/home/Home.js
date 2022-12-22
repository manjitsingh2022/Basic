import { Button, message } from "antd";
import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import CategorySeclect from "./CategorySeclect";
import AdvertisementList from "./components/AdvertisementList";
export const Home = () => {
  const [selectCatgory, setSelectCatgory] = useState([]);

  console.log("selectCatgory", selectCatgory);
  const userCategory = localStorage.getItem("categorykey");
  const getData = async() => {
    try {
      await axios.get("/categories").then((response) => {
        setSelectCatgory(response?.data?.response);
        console.log("catss", response?.data?.response);
      });
    } catch (error) {
      message.error("Select category error");
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {/* first time user login and choice a category */}
      {!userCategory ? <CategorySeclect categoryList={selectCatgory} /> : null}
      <AdvertisementList/>
    </>
  );
};
