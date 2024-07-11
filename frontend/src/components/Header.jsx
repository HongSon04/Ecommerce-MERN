import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import {
  IoMdPhonePortrait,
  IoMdArrowDropdown,
  IoIosArrowDown,
} from "react-icons/io";
import {
  FaFacebookF,
  FaList,
  FaLock,
  FaUser,
  FaLinkedin,
  FaPhoneAlt,
  FaGithub,
} from "react-icons/fa";
import { FaTwitter, FaHeart, FaCartShopping } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ChangeLangue from "../utils/ChangeLangue";
import { GetCartProducts, GetWishlistProducts } from "../store/cartReducer";
const Header = () => {
  const dispatch = useDispatch();
  const { lang, t, changeLang } = ChangeLangue();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [showSidebar, setShowSidebar] = useState(true);
  const [categoryShow, setCategoryShow] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("");
  const { cart_product_count, wishlist_count } = useSelector(
    (state) => state.cart
  );
  const { categories } = useSelector((state) => state.home);
  const { userInfo } = useSelector((state) => state.auth);
  const search = () => {
    if (searchValue) {
      if (category) {
        navigate(`/search?category=${category}&&value=${searchValue}`);
      } else {
        navigate(`/search?value=${searchValue}`);
      }
    } else if (category) {
      navigate(`/products?category=${category}`);
    }
  };

  const redirect_cart_page = () => {
    if (userInfo) {
      navigate("/cart");
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    if (userInfo) {
      dispatch(GetCartProducts(userInfo.id));
      dispatch(GetWishlistProducts(userInfo.id));
    }
    console.log("userInfo", userInfo);
  }, [userInfo, dispatch]);

  return (
    <div className="w-full bg-white">
      <div className="header-top bg-[#caddff] md-lg:hidden">
        <div className="w-[85%] lg:w-[90%] mx-auto">
          <div className="flex w-full justify-between items-center h-[50px] text-slate-500">
            <ul className="flex items-center justify-start gap-8 font-semibold text-black">
              <li className="flex relative justify-center items-center gap-2 text-sm after:absolute after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]">
                <span>
                  <MdEmail />
                </span>
                <span>support@gmail.com</span>
              </li>
              <li className="relative flex items-center justify-center gap-2 text-sm ">
                <span>
                  <IoMdPhonePortrait />
                </span>
                <span>+(123) 3243 343</span>
              </li>
            </ul>
            <div>
              <div className="flex items-center justify-center gap-10">
                <div className="flex items-center justify-center gap-4 text-black">
                  <a href="#">
                    <FaFacebookF />
                  </a>
                  <a href="#">
                    <FaTwitter />{" "}
                  </a>
                  <a href="#">
                    <FaLinkedin />
                  </a>
                  <a href="#">
                    <FaGithub />{" "}
                  </a>
                </div>
                <div className="flex group cursor-pointer text-slate-800 text-sm justify-center items-center gap-1 relative after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px] after:absolute before:absolute before:h-[18px] before:bg-[#afafaf] before:w-[1px] before:-left-[20px]">
                  <img
                    src={`http://localhost:3000/images/${lang}.png`}
                    alt=""
                  />
                  <span>
                    <IoMdArrowDropdown />
                  </span>
                  <ul className="absolute invisible transition-all top-12 rounded-sm duration-200 text-white p-2 w-[100px] flex flex-col gap-3 group-hover:visible group-hover:top-6 group-hover:bg-black z-10">
                    <li
                      onClick={() => changeLang("en")}
                      className={`${lang === "en" ? "text-green-500" : ""}`}
                    >
                      English
                    </li>
                    <li
                      onClick={() => changeLang("vi")}
                      className={`${lang === "vi" ? "text-green-500" : ""}`}
                    >
                      Tiếng Việt
                    </li>
                  </ul>
                </div>
                {userInfo ? (
                  <Link
                    className="flex items-center justify-center gap-2 text-sm text-black cursor-pointer"
                    to="/dashboard"
                  >
                    <span>
                      {" "}
                      <FaUser />{" "}
                    </span>
                    <span>{userInfo.name} </span>
                  </Link>
                ) : (
                  <Link
                    className="flex items-center justify-center gap-2 text-sm text-black cursor-pointer"
                    to="/login"
                  >
                    <span>
                      {" "}
                      <FaLock />{" "}
                    </span>
                    <span> {t("common.header.login")} </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-white">
        <div className="w-[85%] lg:w-[90%] mx-auto">
          <div className="h-[80px] md-lg:h-[100px] flex justify-between items-center flex-wrap">
            <div className="w-3/12 md-lg:w-full md-lg:pt-4">
              <div className="flex items-center justify-between">
                <Link to="/">
                  <img src="http://localhost:3000/images/logo.png" alt="" />
                </Link>
                <div
                  className="justify-center items-center w-[30px] h-[30px] bg-white text-slate-600 border border-slate-600 rounded-sm cursor-pointer lg:hidden md-lg:flex xl:hidden hidden"
                  onClick={() => setShowSidebar(false)}
                >
                  <span>
                    {" "}
                    <FaList />{" "}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-9/12 md:lg:w-full">
              <div className="flex flex-wrap items-center justify-between pl-8 md-lg:justify-center">
                <ul className="flex items-start justify-start gap-8 text-sm font-bold uppercase md-lg:hidden">
                  <li>
                    <Link
                      to="/"
                      className={`p-2 block ${
                        pathname === "/" ? "text-[#059473]" : "text-slate-600"
                      } `}
                    >
                      {t("common.header.home")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/shop"
                      className={`p-2 block ${
                        pathname === "/shop"
                          ? "text-[#059473]"
                          : "text-slate-600"
                      } `}
                    >
                      {t("common.header.shop")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/blog"
                      className={`p-2 block ${
                        pathname === "/blog"
                          ? "text-[#059473]"
                          : "text-slate-600"
                      } `}
                    >
                      {t("common.header.blog")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className={`p-2 block ${
                        pathname === "/about"
                          ? "text-[#059473]"
                          : "text-slate-600"
                      } `}
                    >
                      {t("common.header.about")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className={`p-2 block ${
                        pathname === "/contact"
                          ? "text-[#059473]"
                          : "text-slate-600"
                      } `}
                    >
                      {t("common.header.contact")}
                    </Link>
                  </li>
                </ul>
                <div className="flex items-center justify-center gap-5 md-lg:hidden">
                  <div className="flex justify-center gap-5">
                    <div className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]">
                      <span className="text-xl text-green-500">
                        <FaHeart />
                      </span>
                      {wishlist_count > 0 && (
                        <div className="w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px] ">
                          {wishlist_count}
                        </div>
                      )}
                    </div>
                    <div
                      onClick={redirect_cart_page}
                      className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]"
                    >
                      <span className="text-xl text-green-500">
                        <FaCartShopping />
                      </span>
                      {cart_product_count > 0 && (
                        <div className="w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px] ">
                          {cart_product_count}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md-lg:block">
        <div
          onClick={() => setShowSidebar(true)}
          className={`fixed duration-200 transition-all ${
            showSidebar ? "invisible" : "visible"
          } hidden md-lg:block w-screen h-screen bg-[rgba(0,0,0,0.5)] top-0 left-0 z-20 `}
        ></div>

        <div
          className={`w-[300px] z-[9999] transition-all duration-200 fixed ${
            showSidebar ? "-left-[300px]" : "left-0 top-0"
          } overflow-y-auto bg-white h-screen py-6 px-8 `}
        >
          <div className="flex flex-col justify-start gap-6">
            <Link to="/">
              <img src="http://localhost:3000/images/logo.png" alt="" />
            </Link>
            <div className="flex items-center justify-start gap-10">
              <div className="flex group cursor-pointer text-slate-800 text-sm justify-center items-center gap-1 relative after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px] after:absolute ">
                <img src="http://localhost:3000/images/language.png" alt="" />
                <span>
                  <IoMdArrowDropdown />
                </span>
                <ul className="absolute invisible transition-all top-12 rounded-sm duration-200 text-white p-2 w-[100px] flex flex-col gap-3 group-hover:visible group-hover:top-6 group-hover:bg-black z-10 text-center">
                  <li
                    onClick={() => changeLang("en")}
                    className={`${lang === "en" ? "text-green-500" : ""}`}
                  >
                    English
                  </li>
                  <li
                    onClick={() => changeLang("vi")}
                    className={`${lang === "vi" ? "text-green-500" : ""}`}
                  >
                    Tiếng Việt
                  </li>
                </ul>
              </div>
              {userInfo ? (
                <Link
                  className="flex items-center justify-center gap-2 text-sm text-black cursor-pointer"
                  to="/dashboard"
                >
                  <span>
                    {" "}
                    <FaUser />{" "}
                  </span>
                  <span>{userInfo.name} </span>
                </Link>
              ) : (
                <Link
                  className="flex items-center justify-center gap-2 text-sm text-black cursor-pointer"
                  to="/login"
                >
                  <span>
                    {" "}
                    <FaLock />{" "}
                  </span>
                  <span> {t("common.header.login")} </span>
                </Link>
              )}
            </div>
            <ul className="flex flex-col items-start justify-start text-sm font-bold uppercase">
              <li>
                <Link
                  className={`py-2 block ${
                    pathname === "/" ? "text-[#059473]" : "text-slate-600"
                  } `}
                >
                  {t("common.header.home")}
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className={`py-2 block ${
                    pathname === "/shop" ? "text-[#059473]" : "text-slate-600"
                  } `}
                >
                  {t("common.header.shop")}
                </Link>
              </li>
              <li>
                <Link
                  className={`py-2 block ${
                    pathname === "/blog" ? "text-[#059473]" : "text-slate-600"
                  } `}
                >
                  {t("common.header.blog")}
                </Link>
              </li>
              <li>
                <Link
                  className={`py-2 block ${
                    pathname === "/about" ? "text-[#059473]" : "text-slate-600"
                  } `}
                >
                  {t("common.header.about")}
                </Link>
              </li>
              <li>
                <Link
                  className={`py-2 block ${
                    pathname === "/contact"
                      ? "text-[#059473]"
                      : "text-slate-600"
                  } `}
                >
                  {t("common.header.contact")}
                </Link>
              </li>
            </ul>
            <div className="flex items-center justify-start gap-4 text-black">
              <a href="#">
                <FaFacebookF />
              </a>
              <a href="#">
                <FaTwitter />{" "}
              </a>
              <a href="#">
                <FaLinkedin />
              </a>
              <a href="#">
                <FaGithub />{" "}
              </a>
            </div>
            <div className="flex items-center justify-end w-full gap-3 md-lg:justify-start">
              <div className="w-[48px] h-[48px] rounded-full flex bg-[#f5f5f5] justify-center items-center ">
                <span>
                  <FaPhoneAlt />
                </span>
              </div>
              <div className="flex flex-col justify-end gap-1">
                <h2 className="text-sm font-medium text-slate-700">
                  +134343455
                </h2>
                <span className="text-xs"> {t("common.header.support")}</span>
              </div>
            </div>
            <ul className="flex flex-col justify-start items-start gap-3 text-[#1c1c1c]">
              <li className="flex items-center justify-start gap-2 text-sm">
                <span>
                  <MdEmail />
                </span>
                <span>support@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-[85%] lg:w-[90%] mx-auto">
        <div className="flex flex-wrap w-full md-lg:gap-8">
          <div className="w-3/12 md-lg:w-full">
            <div className="relative bg-white">
              <div
                onClick={() => setCategoryShow(!categoryShow)}
                className="h-[50px] bg-[#059473] text-white flex justify-center md-lg:justify-between md-lg:px-6 items-center gap-3 font-bold text-md cursor-pointer"
              >
                <div className="flex items-center justify-center gap-3">
                  <span>
                    <FaList />
                  </span>
                  <span> {t("common.header.all-category")} </span>
                </div>
                <span className="pt-1">
                  <IoIosArrowDown />
                </span>
              </div>
              <div
                className={`${
                  categoryShow ? "h-0" : "h-[400px]"
                } overflow-hidden transition-all md-lg:relative duration-500 absolute z-[99999] bg-[#dbf3ed] w-full border-x`}
              >
                <ul className="py-2 font-medium text-slate-600">
                  {categories.map((category, i) => {
                    return (
                      <li
                        key={i}
                        className="flex justify-start items-center gap-2 px-[24px] py-[6px]"
                      >
                        <img
                          className="w-[30px] h-[30px] rounded-full overflow-hidden"
                          src={category.image}
                          alt=""
                        />
                        <Link
                          to={`/products?category=${category.name}`}
                          className="block text-sm"
                        >
                          {category.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="w-9/12 pl-8 md-lg:pl-0 md-lg:w-full">
            <div className="flex flex-wrap items-center justify-between w-full md-lg:gap-6">
              <div className="w-8/12 md-lg:w-full">
                <div className="flex border h-[50px] items-center relative gap-6">
                  <div className="relative after:absolute after:h-[25px] after:w-[1px] after:bg-[#afafaf] after:-right-[15px] md:hidden">
                    <select
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-[150px] text-slate-600 font-semibold bg-transparent px-2 h-full outline-0 border-none"
                      name=""
                      id=""
                    >
                      <option value="">
                        {" "}
                        {t("common.header.select-category")}
                      </option>
                      {categories.map((category, i) => (
                        <option key={i} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <input
                    className="relative w-full h-full px-3 bg-transparent text-slate-500 outline-0"
                    onChange={(e) => setSearchValue(e.target.value)}
                    type="text"
                    name=""
                    id=""
                    placeholder={t("common.header.search-for")}
                  />
                  <button
                    onClick={search}
                    className="bg-[#059473] right-0 absolute px-8 h-full font-semibold uppercase text-white"
                  >
                    {t("common.header.search")}
                  </button>
                </div>
              </div>

              <div className="block w-4/12 pl-2 md-lg:hidden md-lg:w-full md-lg:pl-0">
                <div className="flex items-center justify-end w-full gap-3 md-lg:justify-start">
                  <div className="w-[48px] h-[48px] rounded-full flex bg-[#f5f5f5] justify-center items-center ">
                    <span>
                      <FaPhoneAlt />
                    </span>
                  </div>
                  <div className="flex flex-col justify-end gap-1">
                    <h2 className="font-medium text-md text-slate-700">
                      +1343-43233455
                    </h2>
                    <span className="text-sm">
                      {" "}
                      {t("common.header.support")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
