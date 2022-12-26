import "./App.css";
import "antd/dist/antd.css";
import { Route, Routes } from "react-router-dom";
import LayoutComponents from "./layoutComponent/LayoutComponents";
import { Advertisement, Home } from "./pages/home";
import NotFound from "./pages/notFound";
import RegisterForm from "./components/customSignIn/RegisterForm";
import LogIn from "./components/customSignIn/LogIn";
import CategoryUser from "./pages/category/CategoryUser";
import About from "./pages/about/About";
import AdvertisementDetail from "./components/Admin/advertisementDetail";
const App = () => {
  
  
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutComponents />}>
          <Route path="/category"  element={<CategoryUser />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/advertisement" element={<Advertisement />} />
          <Route path="/advertisementDetail" element={<AdvertisementDetail />} >

            
          </Route>
        </Route>
        <Route path="/signup" element={<RegisterForm />} />
        <Route path="/login" element={<LogIn />} />
        {/* If the user doesn't have access to the page the redirect this route. */}
        <Route path="/unauthorized" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
