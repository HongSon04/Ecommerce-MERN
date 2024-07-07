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
import ProtectUser from "./utils/ProtectUser";
import Dashboard from "./pages/Dashboard";
import Index from "./components/dashboard/Index";
import Orders from "./components/dashboard/Orders";
import ChangePassword from "./components/dashboard/ChangePassword";
import Wishlist from "./components/dashboard/Wishlist";
import OrderDetail from "./components/dashboard/OrderDetail";
import Chat from "./components/dashboard/Chat";
import ConfirmOrder from "./pages/ConfirmOrder";
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
        <Route path="/product/details/:slug" element={<Details />} />
        <Route path="/order/confirm/?" element={<ConfirmOrder />} />
        <Route path="/search?" element={<SearchProducts />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/shipping" element={<Shipping />}></Route>
        <Route path="/dashboard" element={<ProtectUser />}>
          <Route path="" element={<Dashboard />}>
            <Route path="" element={<Index />} />
            <Route path="my-orders" element={<Orders />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="my-wishlist" element={<Wishlist />} />
            <Route path="chat" element={<Chat />} />
            <Route path="chat/:sellerId" element={<Chat />} />
            <Route path="order/details/:orderId" element={<OrderDetail />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
