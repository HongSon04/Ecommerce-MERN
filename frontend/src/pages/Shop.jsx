import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { Range } from "react-range";
import { AiFillStar } from "react-icons/ai";
import { CiStar } from "react-icons/ci";
import Products from "../components/products/Products";
import { BsFillGridFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import ShopProduct from "../components/products/ShopProduct";
import Pagination from "../components/Pagination";

const Shops = () => {
  const [filter, setFilter] = useState(true);
  const categorys = [
    "Mobiles",
    "Laptops",
    "Speakers",
    "Top wear",
    "Footwear",
    "Watches",
    "Home Decor",
    "Smart Watches",
  ];
  const [state, setState] = useState({ values: [50, 1500] });
  const [rating, setRating] = useState("");
  const [styles, setStyles] = useState("grid");

  const [parPage, setParPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <div>
      <Header />
      <section className='bg-[url("http://localhost:3000/images/banner/shop.png")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col items-center justify-center w-full h-full gap-1 text-white">
              <h2 className="text-3xl font-bold">Shop Page </h2>
              <div className="flex items-center justify-center w-full gap-2 text-2xl">
                <Link to="/">Home</Link>
                <span className="pt-1">
                  <IoIosArrowForward />
                </span>
                <span>Shop </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
          <div className={` md:block hidden ${!filter ? "mb-6" : "mb-0"} `}>
            <button
              onClick={() => setFilter(!filter)}
              className="w-full px-3 py-2 text-center text-white bg-indigo-500"
            >
              Filter Product
            </button>
          </div>
          <div className="flex flex-wrap w-full">
            <div
              className={`w-3/12 md-lg:w-4/12 md:w-full pr-8 ${
                filter
                  ? "md:h-0 md:overflow-hidden md:mb-6"
                  : "md:h-auto md:overflow-auto md:mb-0"
              } `}
            >
              <h2 className="mb-3 text-3xl font-bold text-slate-600">
                Category{" "}
              </h2>
              <div className="py-2">
                {categorys.map((c, i) => (
                  <div className="flex items-center justify-start gap-2 py-1">
                    <input type="checkbox" id={c} />
                    <label
                      className="block cursor-pointer text-slate-600"
                      htmlFor={c}
                    >
                      {c}
                    </label>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-5 py-2">
                <h2 className="mb-3 text-3xl font-bold text-slate-600">
                  Price
                </h2>

                <Range
                  step={5}
                  min={50}
                  max={1500}
                  values={state.values}
                  onChange={(values) => setState({ values })}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      className="w-full h-[6px] bg-slate-200 rounded-full cursor-pointer md:mx-3"
                    >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    <div
                      className="w-[15px] h-[15px] bg-[#059473] rounded-full"
                      {...props}
                    />
                  )}
                />
                <div>
                  <span className="text-lg font-bold text-slate-800">
                    ${Math.floor(state.values[0])} - $
                    {Math.floor(state.values[1])}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-4 py-3">
                <h2 className="mb-3 text-3xl font-bold text-slate-600">
                  Rating{" "}
                </h2>
                <div className="flex flex-col gap-3">
                  <div
                    onClick={() => setRating(5)}
                    className="flex items-start justify-start gap-2 text-xl text-orange-500 cursor-pointer"
                  >
                    <span>
                      <AiFillStar />{" "}
                    </span>
                    <span>
                      <AiFillStar />{" "}
                    </span>
                    <span>
                      <AiFillStar />{" "}
                    </span>
                    <span>
                      <AiFillStar />{" "}
                    </span>
                    <span>
                      <AiFillStar />{" "}
                    </span>
                  </div>
                  <div
                    onClick={() => setRating(4)}
                    className="flex items-start justify-start gap-2 text-xl text-orange-500 cursor-pointer"
                  >
                    <span>
                      <AiFillStar />{" "}
                    </span>
                    <span>
                      <AiFillStar />{" "}
                    </span>
                    <span>
                      <AiFillStar />{" "}
                    </span>
                    <span>
                      <AiFillStar />{" "}
                    </span>
                    <span>
                      <CiStar />{" "}
                    </span>
                  </div>
                  <div
                    onClick={() => setRating(3)}
                    className="flex items-start justify-start gap-2 text-xl text-orange-500 cursor-pointer"
                  >
                    <span>
                      <AiFillStar />{" "}
                    </span>
                    <span>
                      <AiFillStar />{" "}
                    </span>
                    <span>
                      <AiFillStar />{" "}
                    </span>
                    <span>
                      <CiStar />{" "}
                    </span>
                    <span>
                      <CiStar />{" "}
                    </span>
                  </div>
                  <div
                    onClick={() => setRating(2)}
                    className="flex items-start justify-start gap-2 text-xl text-orange-500 cursor-pointer"
                  >
                    <span>
                      <AiFillStar />{" "}
                    </span>
                    <span>
                      <AiFillStar />{" "}
                    </span>
                    <span>
                      <CiStar />{" "}
                    </span>
                    <span>
                      <CiStar />{" "}
                    </span>
                    <span>
                      <CiStar />{" "}
                    </span>
                  </div>
                  <div
                    onClick={() => setRating(1)}
                    className="flex items-start justify-start gap-2 text-xl text-orange-500 cursor-pointer"
                  >
                    <span>
                      <AiFillStar />{" "}
                    </span>
                    <span>
                      <CiStar />{" "}
                    </span>
                    <span>
                      <CiStar />{" "}
                    </span>
                    <span>
                      <CiStar />{" "}
                    </span>
                    <span>
                      <CiStar />{" "}
                    </span>
                  </div>
                  <div className="flex items-start justify-start gap-2 text-xl text-orange-500 cursor-pointer">
                    <span>
                      <CiStar />{" "}
                    </span>
                    <span>
                      <CiStar />{" "}
                    </span>
                    <span>
                      <CiStar />{" "}
                    </span>
                    <span>
                      <CiStar />{" "}
                    </span>
                    <span>
                      <CiStar />{" "}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 py-5 md:hidden">
                <Products title="Latest Product" />
              </div>
            </div>
            <div className="w-9/12 md-lg:w-8/12 md:w-full">
              <div className="pl-8 md:pl-0">
                <div className="flex items-start justify-between px-3 py-4 mb-10 bg-white border rounded-md">
                  <h2 className="text-lg font-medium text-slate-600">
                    14 Products{" "}
                  </h2>
                  <div className="flex items-center justify-center gap-3">
                    <select
                      className="p-1 font-semibold border outline-0 text-slate-600"
                      name=""
                      id=""
                    >
                      <option value="">Sort By</option>
                      <option value="low-to-high">Low to High Price</option>
                      <option value="high-to-low">High to Low Price </option>
                    </select>
                    <div className="flex items-start justify-center gap-4 md-lg:hidden">
                      <div
                        onClick={() => setStyles("grid")}
                        className={`p-2 ${
                          styles === "grid" && "bg-slate-300"
                        } text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm `}
                      >
                        <BsFillGridFill />
                      </div>
                      <div
                        onClick={() => setStyles("list")}
                        className={`p-2 ${
                          styles === "list" && "bg-slate-300"
                        } text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm `}
                      >
                        <FaThList />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pb-8">
                  <ShopProduct styles={styles} />
                </div>

                <div>
                  <Pagination
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    totalItem={10}
                    parPage={parPage}
                    showItem={Math.floor(10 / 3)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default Shops;
