import React, { useEffect } from "react";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../Rating";
import {
  AddToCart,
  AddToWishlist,
  clearMessage,
} from "../../store/cartReducer";
import { toast } from "react-hot-toast";
const FeatureProducts = ({ products }) => {
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
    <div className="w-[85%] flex flex-wrap mx-auto">
      <div className="w-full">
        <div className="text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px]">
          <h2>Feature Products </h2>
          <div className="w-[100px] h-[2px] bg-[#059473] mt-4"></div>
        </div>
      </div>

      <div className="grid w-full grid-cols-4 gap-6 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {products.map((product, i) => (
          <div
            key={i}
            className="transition-all duration-500 border group hover:shadow-md hover:-mt-3"
          >
            <div className="relative overflow-hidden">
              {product.discount > 0 ? (
                <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                  {product.discount}%{" "}
                </div>
              ) : (
                ""
              )}

              <img
                className="sm:w-full w-full h-[240px]"
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
            <div className="px-2 py-3 text-slate-600">
              <h2 className="font-bold">{product.name}</h2>
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
    </div>
  );
};

export default FeatureProducts;
