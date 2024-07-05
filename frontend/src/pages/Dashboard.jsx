import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaList } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { IoIosHome } from "react-icons/io";
import { FaBorderAll } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { RiLockPasswordLine } from "react-icons/ri";
import api from "../api/api";
import { useDispatch } from "react-redux";
import { UserReset } from "../store/reducers/AuthReducer";
import { ResetCountCart } from "../store/cartReducer";
import ChangeLangue from "../utils/ChangeLangue";

const Dashboard = () => {
  const { t } = ChangeLangue();

  const [filterShow, setFilterShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = async () => {
    try {
      const { data } = await api.get("/customer/logout");
      localStorage.removeItem("customerToken");
      dispatch(UserReset());
      dispatch(ResetCountCart());
      navigate("/login");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <Header />
      <div className="mt-5 bg-slate-200">
        <div className="w-[90%] mx-auto md-lg:block hidden">
          <div>
            <button
              onClick={() => setFilterShow(!filterShow)}
              className="px-3 py-3 text-center text-white bg-green-500"
            >
              <FaList />{" "}
            </button>
          </div>
        </div>

        <div className="h-full mx-auto">
          <div className="py-5 flex md-lg:w-[90%] mx-auto relative">
            <div
              className={`rounded-md z-50 md-lg:absolute ${
                filterShow ? "-left-4" : "-left-[360px]"
              } w-[270px] ml-4 bg-white`}
            >
              <ul className="px-4 py-2 text-slate-600">
                <li className="flex items-center justify-start gap-2 py-2">
                  <span className="text-xl">
                    <IoIosHome />
                  </span>
                  <Link to="/dashboard" className="block">
                    {t("dashboard.dashboard")}{" "}
                  </Link>
                </li>
                <li className="flex items-center justify-start gap-2 py-2">
                  <span className="text-xl">
                    <FaBorderAll />
                  </span>
                  <Link to="/dashboard/my-orders" className="block">
                    {t("dashboard.my-orders")}{" "}
                  </Link>
                </li>
                <li className="flex items-center justify-start gap-2 py-2">
                  <span className="text-xl">
                    <FaHeart />
                  </span>
                  <Link to="/dashboard/my-wishlist" className="block">
                    {t("dashboard.wishlist")}{" "}
                  </Link>
                </li>
                <li className="flex items-center justify-start gap-2 py-2">
                  <span className="text-xl">
                    <IoChatbubbleEllipsesSharp />
                  </span>
                  <Link to="/dashboard/chat" className="block">
                    {t("dashboard.chat")}{" "}
                  </Link>
                </li>
                <li className="flex items-center justify-start gap-2 py-2">
                  <span className="text-xl">
                    <RiLockPasswordLine />
                  </span>
                  <Link to="/dashboard/change-password" className="block">
                    {t("dashboard.change-password")}{" "}
                  </Link>
                </li>
                <li
                  onClick={logout}
                  className="flex items-center justify-start gap-2 py-2 cursor-pointer"
                >
                  <span className="text-xl">
                    <IoMdLogOut />
                  </span>
                  <div className="block">{t("dashboard.log-out")} </div>
                </li>
              </ul>
            </div>

            <div className="w-[calc(100%-270px)] md-lg:w-full">
              <div className="mx-4 md-lg:mx-0">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default Dashboard;
