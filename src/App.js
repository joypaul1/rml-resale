import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
// import FacebookMessanger from "./components/FacebookMessanger";
import FileUploader from "./components/FileUploader";
import ImageUpload from "./components/ImageUpload";
import ScrollToTopOnRouteChange from "./components/ScrollToTopOnRouteChange";
import TosterNotify from "./components/TosterNotify";
import AboutUs from "./pages/About";
import BrandWiseProduct from "./pages/BrandWiseProduct";
import Contact from "./pages/Contact";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Register from "./pages/Register";
import SearchableProduct from "./pages/SearchableProduct";
import Service from "./pages/Service";
import ViewAllProduct from "./pages/ViewAllProduct";
import ChangePassword from "./pages/user/ChangePassword";
import Dashboard from "./pages/user/Dashboard";
import Profile from "./pages/user/Profile";
import Footer from "./partials/Footer";
import Header from "./partials/Header";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <ScrollToTopOnRouteChange />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/img-upload" element={<FileUploader />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/imageUpload" element={<ImageUpload />} />
        <Route path="/view-all-product/:selectedBrandId?" element={<ViewAllProduct />} />
        <Route path="/brand-wise-product/:selectedBrandId?/:selectedCategory?/:selectedModel?" element={<BrandWiseProduct />} />
        <Route
          path="/searchable-product/:selectedModel/:selectedBrandId/:selectedCategory"
          element={<SearchableProduct />}
        />
        <Route path="/product/:product_id/:user_id?" element={<Product />} />
      </Routes>
      <TosterNotify />
      {/* <FacebookMessanger /> */}
      <Footer />
    </BrowserRouter>
  );
}
