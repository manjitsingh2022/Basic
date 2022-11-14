import "./App.css";
import "antd/dist/antd.css";
import LayoutComponents from "./layoutComponents/LayoutComponents"
import { useState } from "react";
const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedin, setIsLoggedin] = useState(false);
 
  // const login = (e) => {
  //   e.preventDefault();
  //   console.log(name, email, password);
  //   const userData = {
  //     name,
  //     email,
  //     password,
  //   };
  //   localStorage.setItem('token-info', JSON.stringify(userData));
  //   setIsLoggedin(true);
  //   setName('');
  //   setEmail('');
  //   setPassword('');
  // };
 
  // const logout = () => {
  //   localStorage.removeItem('token-info');
  //   setIsLoggedin(false);
  // };
 
  return (
    <>
      <LayoutComponents />
      {/* <Header/> */}

    </>
  );
};

export default App;
