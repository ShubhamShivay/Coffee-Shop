import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/PublicNavbar";
import PrivateNavbar from "./Components/Navbar/PrivateNavbar";
import { Home } from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";
import LoginPage from "./Components/Forms/Login";
import RegisterPage from "./Components/Forms/Register";
import { getUserFromStorage } from "./utils/getUserFromStorage";
import { useSelector } from "react-redux";

function App() {
  const [count, setCount] = useState(0);

  //! Token
  const token = useSelector((state) => state?.auth?.user);

  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        {token ? <PrivateNavbar /> : <Navbar />}
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/login" Component={LoginPage} />
          <Route path="/register" Component={RegisterPage} />
        </Routes>
        {/* <Footer /> */}
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
