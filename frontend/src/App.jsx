import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/PublicNavbar";
import PrivateNavbar from "./Components/Navbar/PrivateNavbar";
import { Home } from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        <PrivateNavbar />
        <Routes>
          <Route path="/" Component={Home} />
        </Routes>
        {/* <Footer /> */}
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
