import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminHome from "./Pages/AdminHome";
import Products from "./Pages/Product";
import AddProduct from "./Pages/AddProduct";
import User from "./Pages/User";
import AdminRegister from "./Pages/AdminRegister";
import AdminLogin from "./Pages/AdminLogin";
import UpdateProduct from "./Pages/UpdateProduct";
import { useEffect } from "react";
import { getCurrentUser } from "./store/authAction";
import { useDispatch } from "react-redux";
import { ViewProduct } from "./Pages/ViewProduct";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="/products" element={<Products />} />
        <Route path="/add-products" element={<AddProduct />} />
        <Route path="/users" element={<User />} />
        <Route path="/register" element={<AdminRegister />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/admin/edit-product/:id" element={<UpdateProduct />} />
        <Route path="/admin/view-product/:id" element={<ViewProduct />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
