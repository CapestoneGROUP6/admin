import { Route, Routes } from "react-router-dom";
import "./App.css";
import React from "react";
import RootWrapper from "./components/RootWrapper";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import { GlobalContextProvider } from "./providers/GlobalProvider";
import NonAuth from "./Wrappers/NonAuth";
import Auth from "./Wrappers/Auth";
import AddProduct from "./pages/AddProduct";
import AdminProductsList from "pages/AdminProductsList";
import ApproveRejectProducts from "pages/ApproveRejectProducts";
import EditProduct from "pages/EditProduct";
import CategoryForm from "pages/AdminCategories";
import ProductDetails from "pages/ProductDetails";
import AddEditProfile from "pages/AddEditProfile";
import NewHeader from "components/NewHeader";
import UserManagement from "pages/UserManagement";

function App() {
  return (
    <div className="App">
      <GlobalContextProvider>
        <RootWrapper>
          <NewHeader />
          <div style={{minHeight:"80vh", padding:"15px",  marginTop: '5rem'}}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<NonAuth element={<Login />} />} />
              <Route path="/signup" element={<NonAuth element={<Signup />} />} />
              <Route path="/addproduct" element={<Auth element={<AddProduct />} />} />
              <Route path="/adminproducts" element={<Auth element={<AdminProductsList />} />} />
              <Route path="/approvereject" element={<Auth element={<ApproveRejectProducts />} />} />
              <Route
                path="/forgotpassword"
                element={<NonAuth element={<ForgotPassword />} />}
              />

              <Route path="/categories" element={<Auth element={<CategoryForm />} />} />
              <Route path="/products/add" element={<Auth element={<AddProduct />} />} />
              <Route path="/editproduct/:id" element={<Auth element={<EditProduct />} />} />
              <Route path="/productdetails/:id" element={<Auth element={<ProductDetails />} />} />
              <Route path="/profile" element={<Auth element={<AddEditProfile />} />} />
              <Route path="/usermgmt" element={<Auth element={<UserManagement />} />} />
            </Routes>
          </div>
          <Footer />
        </RootWrapper>
      </GlobalContextProvider>
    </div>
  );
}

export default App;
