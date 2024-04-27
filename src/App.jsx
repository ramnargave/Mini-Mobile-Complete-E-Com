import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import Header from "./components/header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import NewsLetter from "./components/home/newLetter/NewsLetter";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import AllProducts from "./components/products/Allproducts/AllProducts";
import SingleProducts from "./components/singleProduct/SingleProducts";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import ErrorPage from "./components/404 ERROR/ErrorPage";
import UserProfile from "./components/userprofile/UserProfile";
import AddProducts from "./components/addProducts/AddProducts";
import SearchProduct from "./components/productsearch/SearchProduct";
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "./components/firebase/Firebase";
import CartPage from "./components/cartPage/CartPage";
import SellerRegistion from "./components/sellerlogin/SellerRegistion";
import SellerLogin from "./components/sellerlogin/SellerLogin";
// import Dashboard from "./components/dashboard/Dashboard";
import DashboardTab from "./components/dashboard/DashboardTab";
import AdminDashboard from "./components/dashboard/Admin/AdminDashboard";
import MyState from "./components/myContext/MyState";
import UpdateProduct from "./components/products/updateproducts/UpdateProducts";


function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsArray = [];
        const querySnapshot = await getDocs(collection(db, "products"));
        querySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProducts(productsArray);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };
    getProducts();
  }, []);

  return (
    <MyState>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/allproducts" element={<AllProducts products={products} />} />
      <Route path="/singleproduct/:id" element={<SingleProducts products={products} />} />
      <Route path="/allproducts" element={<AllProducts  />}/>
      {/* <Route path="/allproducts/laptop" element={<AllProducts type={"laptop"} />}/>
      <Route path="/allproducts/camera" element={<AllProducts type={"camera"} />}/> */}
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Register/>} />
      <Route path="*" element={<ErrorPage/>} />
      <Route path="/userprofile" element={<UserProfile/>} />
      <Route path="/addproducts" element={<AddProducts/>} />
      <Route path="search/:term" element={<SearchProduct/>}/>
      <Route path="/cart" element={<CartPage/>}/>
      <Route path="/sellerregistion" element={<SellerRegistion/>}/>
      <Route path="/sellerlogin" element={<SellerLogin/>}/>
      {/* <Route path="/dashboard" element={<Dashboard  />}/> */}
      <Route path="/sellerdashboard" element={<DashboardTab  />}/>
      <Route path="/admindashboard" element={<AdminDashboard/>}/>
      <Route path="/updateproducts" element={<UpdateProduct/>}/>
    </Routes>
    <NewsLetter/>
    </BrowserRouter>
     
    </MyState>
  );
}

export default App;
