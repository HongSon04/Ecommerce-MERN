import React, { useEffect } from "react";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import Rating from "../Rating";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMessage,
  GetWishlistProducts,
  RemoveWishlist,
} from "../../store/cartReducer";
import { MdDeleteForever } from "react-icons/md";
import toast from "react-hot-toast";
const Wishlist = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const {  successMessage, wishlist_products } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(GetWishlistProducts(userInfo.id));
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
    
    dispatch(clearMessage());
  }, [successMessage,  dispatch]);

  return (
    <div className="grid w-full grid-cols-4 gap-6 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
      {wishlist_products.length > 0 &&
        wishlist_products.map((product, i) => (
          <div
            key={i}
            className="transition-all duration-500 bg-white border group hover:shadow-md hover:-mt-3"
          >
            <div className="relative overflow-hidden">
              {product.discount !== 0 && (
                <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                  {product.discount}%{" "}
                </div>
              )}

              <img
                className="sm:w-full w-full h-[240px]"
                src={product.image}
                alt={product.slug}
              />

              <ul className="absolute flex items-center justify-center w-full gap-2 transition-all duration-700 -bottom-10 group-hover:bottom-3">
                <li
                  onClick={() => dispatch(RemoveWishlist(product._id))}
                  className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-red-600 hover:text-white hover:rotate-[720deg] transition-all"
                >
                  <MdDeleteForever />
                </li>
                <Link
                  to={`/product/details/${product.slug}`}
                  className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all"
                >
                  <FaEye />
                </Link>
                <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all">
                  <RiShoppingCartLine />
                </li>
              </ul>
            </div>

            <div className="px-2 py-3 text-slate-600">
              <h2 className="font-bold">{product.name.slice(0, 20)}...</h2>
              <div className="flex items-center justify-start gap-3">
                <span className="font-semibold text-md">${product.price}</span>
                <div className="flex">
                  <Rating ratings={product.rating} />
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Wishlist;
