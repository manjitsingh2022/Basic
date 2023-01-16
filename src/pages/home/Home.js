import { message } from "antd";
import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import CategorySeclect from "./CategorySeclect";
import AdvertisementList from "./components/CheckBoxFilter/AdvertisementList";
export const Home = () => {
  const [selectCatgory, setSelectCatgory] = useState([]);
  const [categorie, setCategory] = useState(true);
  console.log("categorie", categorie);
  
  const userCategory = localStorage.getItem("categorykey");
  const roleCategory = localStorage.getItem("rolekey");
  useEffect(() => {
    if (userCategory) {
      setCategory(false);
    }
     else if(!userCategory) {

      setCategory(true);
    }
     if (roleCategory === "ROLE_ADMIN") {
      setCategory(false);
    }
  }, []);

  const getData = async () => {
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
      { categorie ? <CategorySeclect categoryList={selectCatgory} /> : null}

      <AdvertisementList categoryList={selectCatgory} />
    </>
  );
};
