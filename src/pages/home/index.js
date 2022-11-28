import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import CategorySeclect from "./CategorySeclect";
const Home = () => {
  const [selectCatgory, setSelectCatgory] = useState([]);

  console.log("ldfsjldsfjfklssdfjsflsdjsdfkls", selectCatgory);
  const getData = async () => {
    await axios.get("/admin/categories").then((response) => {
      setSelectCatgory(response?.data.response);
      console.log("catss", response?.data?.response);
    });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <CategorySeclect categoryList={selectCatgory} />
    </>
  );
};

export default Home;
