import React from "react";
import { Navigate, Outlet, Route,  } from "react-router";
import LayoutComponents from "../layoutComponent/LayoutComponents";
import CategoryUser from "../pages/category/CategoryUser";
import { Home } from "../pages/home";

const RoutingComponents = () => {
  // const user = localStorage.getItem("rolekey");
  //   console.log(user,"role")
  const RoleAccess = ({ roles = [] }) => {
    const role = JSON.parse(localStorage.getItem("rolekey"));
    console.log("roles",roles)
    return !roles.length || roles.includes(role?.role)
      ? <Outlet />
      : <Navigate to="/unauthorized"  />;
  };
  return (
    <>

<Route path="/" element={<LayoutComponents />}>
  <Route element={<RoleAccess roles={["ROLE_USER","ROLE_ADMIN"]} />}>
    <Route path="/home" element={<Home />} />
  </Route>
  <Route element={<RoleAccess roles={["ROLE_ADMIN"]} />}>
    <Route path="/category" element={<CategoryUser />} />
  </Route>
</Route>
    </>
  );
};
export default RoutingComponents;
