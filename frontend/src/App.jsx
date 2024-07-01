import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Shipping from "./pages/Shipping";
import Details from "./pages/Details";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { GetCategories } from "./store/reducers/HomeReducer";
import CategoryShop from "./components/CategoryShop";
import SearchProducts from "./components/SearchProducts";
import Payment from "./pages/Payment";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetCategories());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/products?" element={<CategoryShop />}></Route>
        <Route path="/search?" element={<SearchProducts />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/shipping" element={<Shipping />}></Route>
        <Route path="/product/details/:slug" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
