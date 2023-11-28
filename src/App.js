import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
// import FacebookMessanger from "./components/FacebookMessanger";
import TosterNotify from "./components/TosterNotify";
import AboutUs from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Register from "./pages/Register";
import SearchableProduct from "./pages/SearchableProduct";
import Service from "./pages/Service";
import Dashboard from "./pages/user/Dashboard";
import Footer from "./partials/Footer";
import Header from "./partials/Header";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/change-password" element={<Dashboard />} />
        <Route path="/searchable-product/:selectedModel" element={<SearchableProduct />} />
        <Route path="/product/:product_id/:user_id?" element={<Product />} />
      </Routes>
      <TosterNotify />
      {/* <FacebookMessanger /> */}

      <Footer />
    </BrowserRouter>
  );
}
