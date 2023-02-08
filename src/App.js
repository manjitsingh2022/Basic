import "./App.css";
import "antd/dist/antd.css";
import { Route, Routes } from "react-router-dom";
import LayoutComponents from "./layoutComponent/LayoutComponents";
import { Advertisement, Home } from "./pages/home";
import NotFound from "./pages/notFound";
import LogIn from "./components/signIn/LogIn";
import CategoryUser from "./pages/category/CategoryUser";
import About from "./pages/about/About";
import AdvertisementDetail from "./components/AdminSection/advertisementDetail";
import AdvertisementDetailProduct from "./pages/home/components/CheckBoxFilter/AdvertisementDetailProduct";
import RegisterNow from "./components/signIn/RegisterForm";
// import { RequireAuth } from "./routingComponent/RequireAuth";
const App = () => {
  const rolekey = localStorage.getItem("rolekey");
  const userToken = localStorage.getItem("token");
  return (
    <>
      <Routes>
        <Route path="/signup" element={<RegisterNow />} />
        <Route path="/login" element={<LogIn />} />

        {userToken ? (
          <>
            {/* If the user doesn't have access to the page the redirect this route. */}
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<LayoutComponents />}>
           
              <Route path="/advertisement" element={<Advertisement />} />
              {rolekey === "ROLE_ADMIN" ? (
                <>
                  <Route path="/" element={<CategoryUser />} />
                  <Route
                    path="/advertisementDetail"
                    element={<AdvertisementDetail />}
                  ></Route>
                </>
              ) : (
                <>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/advertisement/:id"
                    element={<AdvertisementDetailProduct />}
                  />
                  <Route path="/about" element={<About />} />
                </>
              )}
            </Route>
          </>
        ) : null}
         {/* // Optional index route if no nested routes match */}
    
      </Routes>
    </>
  );
};

export default App;

// import "./App.css";
// import "antd/dist/antd.css";
// import { Route, Routes } from "react-router-dom";
// import LayoutComponents from "./layoutComponent/LayoutComponents";
// import { Advertisement, Home } from "./pages/home";
// import NotFound from "./pages/notFound";
// import RegisterForm from "./components/customSignIn/RegisterForm";
// import LogIn from "./components/customSignIn/LogIn";
// import CategoryUser from "./pages/category/CategoryUser";
// import About from "./pages/about/About";
// import AdvertisementDetail from "./components/Admin/advertisementDetail";
// import { useState } from "react";
// import ProtectedRoute from "./components/Route/ProtectedRoute";
// const App = () => {
//   const [isLoggedIn, setisLoggedIn] = useState(null);
//   const logIn = () => {
//     setisLoggedIn(true);
//   };
//   const logOut = () => {
//     setisLoggedIn(false);
//   };
//   return (
//     <>
//       <Routes>
//         {isLoggedIn ? (
//           <Route path="/signup"  element={<RegisterForm />} />
//         ) : (
//           <Route path="/login" element={<LogIn />} />
//         )}
//         <Route path="/" element={<LayoutComponents />}>
//           <Route
//             path="/category"
//             element={
//               <ProtectedRoute isLoggedIn={isLoggedIn}>
//                 <CategoryUser />
//               </ProtectedRoute>
//             }
//           />
//            <Route
//             path="/"
//             element={
//               <ProtectedRoute isLoggedIn={isLoggedIn}>
//                 <Home />
//               </ProtectedRoute>
//             }
//           />
//            <Route
//             path="/about"
//             element={
//               <ProtectedRoute isLoggedIn={isLoggedIn}>
//                 <About />
//               </ProtectedRoute>
//             }
//           />
//            <Route
//             path="/advertisement"
//             element={
//               <ProtectedRoute isLoggedIn={isLoggedIn}>
//                 <Advertisement />
//               </ProtectedRoute>
//             }
//           />

//            <Route
//             path="/advertisementDetail"
//             element={
//               <ProtectedRoute isLoggedIn={isLoggedIn}>
//                 <AdvertisementDetail />
//               </ProtectedRoute>
//             }
//           />

//         </Route>
//         {/* If the user doesn't have access to the page the redirect this route. */}
//         <Route path="/unauthorized" element={<NotFound />} />
//       </Routes>
//     </>
//   );
// };

// export default App;
