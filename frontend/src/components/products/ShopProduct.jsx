import React, { useEffect } from "react";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import Rating from "../Rating";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AddToCart,
  AddToWishlist,
  clearMessage,
} from "../../store/cartReducer";
import { toast } from "react-hot-toast";

const ShopProduct = ({ styles, products }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { errorMessage, successMessage } = useSelector((state) => state.cart);
  const add_to_cart = (product_id) => {
    if (userInfo) {
      dispatch(AddToCart({ product_id, userId: userInfo.id, quantity: 1 }));
    } else {
      navigate("/login");
    }
  };

  const add_wishlist = (productInfo) => {
    if (userInfo) {
      dispatch(
        AddToWishlist({
          productId: productInfo._id,
          userId: userInfo.id,
          name: productInfo.name,
          price: productInfo.price,
          image: productInfo.images[0],
          discount: productInfo.discount,
          rating: productInfo.rating,
          slug: productInfo.slug,
        })
      );
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearMessage());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(clearMessage());
    }
  }, [dispatch, errorMessage, successMessage]);
  return (
    <div
      className={`w-full grid ${
        styles === "grid"
          ? "grid-cols-3 md-lg:grid-cols-2 md:grid-cols-2"
          : "grid-cols-1 md-lg:grid-cols-2 md:grid-cols-2"
      } gap-3 `}
    >
      {products.map((product, i) => (
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
              src={product.images[0]}
              alt=""
            />

            <ul className="absolute flex items-center justify-center w-full gap-2 transition-all duration-700 -bottom-10 group-hover:bottom-3">
              <li
                onClick={() => add_wishlist(product)}
                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all"
              >
                <FaRegHeart />
              </li>
              <Link
                to={`/product/details/${product.slug}`}
                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all"
              >
                <FaEye />
              </Link>
              <li
                onClick={() => add_to_cart(product._id)}
                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all"
              >
                <RiShoppingCartLine />
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-start justify-start gap-1">
            <h2 className="font-bold">{product.name} </h2>
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
export default ShopProduct;
