import { Button, message } from "antd";
import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import CategorySeclect from "./CategorySeclect";
import { useNavigate } from "react-router-dom";
import AdvertisementList from "./components/AdvertisementList";
export const Home = () => {
  const navigate = useNavigate();
  const [selectCatgory, setSelectCatgory] = useState([]);

  console.log("selectCatgory", selectCatgory);
  const userCategory = localStorage.getItem("categorykey");
  const getData = async() => {
    try {
      console.log(userCategory, "userId");
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

  const createList = () => {
    navigate(`/advertisement`);
  };

  return (
    <>
      {/* first time user login and choice a category */}
      {!userCategory ? <CategorySeclect categoryList={selectCatgory} /> : null}

      <Button type="primary"  onClick={createList}>
        <span>New Advertisement</span>
      </Button>
      <AdvertisementList/>
    </>
  );
};
