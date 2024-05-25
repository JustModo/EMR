import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import useMediaQuery from "@mui/material/useMediaQuery";
import NotAvail from "./pages/NotAvail";
import About from "./pages/About";
import Product from "./pages/Product";

function App() {
  const isMobile = useMediaQuery("(max-width:640px)");

  return (
    <>
      {!isMobile ? (
        <>
          <Navbar />
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/product" element={<Product />} />
            </Routes>
          </div>
        </>
      ) : (
        <NotAvail />
      )}
    </>
  );
}

export default App;
