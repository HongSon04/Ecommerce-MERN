import React from "react";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import Rating from "../Rating";

const ShopProduct = ({ styles }) => {
  return (
    <div
      className={`w-full grid ${
        styles === "grid"
          ? "grid-cols-3 md-lg:grid-cols-2 md:grid-cols-2"
          : "grid-cols-1 md-lg:grid-cols-2 md:grid-cols-2"
      } gap-3 `}
    >
      {[1, 2, 3, 4, 5, 6].map((p, i) => (
        <div
          key={i}
          className={`flex transition-all duration-1000 hover:shadow-md hover:-translate-y-3 ${
            styles === "grid"
              ? "flex-col justify-start items-start"
              : "justify-start items-center md-lg:flex-col md-lg:justify-start md-lg:items-start"
          } w-full gap-4 bg-white p-1 rounded-md`}
        >
          <div
            className={
              styles === "grid"
                ? "w-full relative group h-[210px] md:h-[270px] xs:h-[170px] overflow-hidden"
                : "md-lg:w-full relative group h-[210px] md:h-[270px] overflow-hidden"
            }
          >
            <img
              className="h-[240px] rounded-md md:h-[270px] xs:h-[170px] w-full object-cover"
              src={`http://localhost:3000/images/products/${i + 1}.webp`}
              alt=""
            />

            <ul className="absolute flex items-center justify-center w-full gap-2 transition-all duration-700 -bottom-10 group-hover:bottom-3">
              <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all">
                <FaRegHeart />
              </li>
              <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all">
                <FaEye />
              </li>
              <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all">
                <RiShoppingCartLine />
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-start justify-start gap-1">
            <h2 className="font-bold">Product Name </h2>
            <div className="flex items-center justify-start gap-3">
              <span className="font-semibold text-md">$656</span>
              <div className="flex">
                <Rating ratings={4.5} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ShopProduct;
