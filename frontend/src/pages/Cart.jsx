import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  GetCartProducts,
  DeleteCartProduct,
  QuantityInc,
  QuantityDec,
  clearMessage,
} from "../store/cartReducer";
import toast from "react-hot-toast";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const {
    cart_products,
    price,
    buy_product_item,
    shipping_fee,
    out_of_stock_products,
    errorMessage,
    successMessage,
  } = useSelector((state) => state.cart);
  console.log(cart_products);
  const redirect = () => {
    navigate("/shipping", {
      state: {
        products: [],
        price: 500,
        shipping_fee: 40,
        items: 2,
      },
    });
  };

  const Inc = (product_quantity, stock, id) => {
    const temp = product_quantity + 1;
    if (temp > stock) {
      toast.error("Stock Limit Reached");
    } else {
      dispatch(QuantityInc(id));
    }
  };
  const Dec = (product_quantity, stock, id) => {
    const temp = product_quantity - 1;
    if (temp !== 0) {
      dispatch(QuantityDec(id));
    } else {
      toast.error("Stock Limit Reached");
    }
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(GetCartProducts(userInfo.id));
    }

    dispatch(clearMessage());
  }, [errorMessage, successMessage, dispatch, userInfo]);

  useEffect(() => {
    dispatch(GetCartProducts(userInfo.id));
  }, [dispatch, userInfo]);
  return (
    <div>
      <Header />
      <section className='bg-[url("http://localhost:3000/images/banner/shop.png")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col items-center justify-center w-full h-full gap-1 text-white">
              <h2 className="text-3xl font-bold">Cart Page </h2>
              <div className="flex items-center justify-center w-full gap-2 text-2xl">
                <Link to="/">Home</Link>
                <span className="pt-1">
                  <IoIosArrowForward />
                </span>
                <span>Cart </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#eeeeee]">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16">
          {cart_products.length > 0 || out_of_stock_products.length > 0 ? (
            <div className="flex flex-wrap">
              <div className="w-[67%] md-lg:w-full">
                <div className="pr-3 md-lg:pr-0">
                  <div className="flex flex-col gap-3">
                    {cart_products.length > 0 && (
                      <div className="p-4 bg-white">
                        <h2 className="font-semibold text-green-500 text-md">
                          Stock Products {cart_products.length}
                        </h2>
                      </div>
                    )}
                    {cart_products.map((cart_product, i) => (
                      <div key={i} className="flex flex-col gap-2 p-4 bg-white">
                        <div className="flex items-center justify-start">
                          <h2 className="font-bold text-md text-slate-600">
                            {cart_product.shopName}
                          </h2>
                        </div>
                        {cart_product.products.map((product, j) => (
                          <div key={j} className="flex flex-wrap w-full">
                            <div className="flex w-7/12 gap-2 sm:w-full">
                              <div className="flex items-center justify-start gap-2">
                                <img
                                  className="w-[80px] h-[80px]"
                                  src={product.productInfo.images[0]}
                                  alt=""
                                />
                                <div className="pr-4 text-slate-600">
                                  <h2 className="font-semibold text-md">
                                    {product.productInfo.name}{" "}
                                  </h2>
                                  <span className="text-sm">
                                    Brand: {product.productInfo.brand}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between w-5/12 sm:w-full sm:mt-3">
                              <div className="pl-4 sm:pl-0">
                                <h2 className="text-lg text-orange-500">
                                  $
                                  {product.productInfo.price -
                                    Math.floor(
                                      (product.productInfo.price *
                                        product.productInfo.discount) /
                                        100
                                    )}
                                </h2>
                                <p className="line-through">
                                  ${product.productInfo.price}
                                </p>
                                <p>-{product.productInfo.discount}%</p>
                              </div>
                              <div className="flex flex-col gap-2">
                                <div className="flex bg-slate-200 h-[30px] justify-center items-center text-xl">
                                  <div
                                    className="px-3 cursor-pointer"
                                    onClick={() =>
                                      Dec(
                                        product.quantity,
                                        product.productInfo.stock,
                                        product._id
                                      )
                                    }
                                  >
                                    -
                                  </div>
                                  <div className="px-3">{product.quantity}</div>
                                  <div
                                    className="px-3 cursor-pointer"
                                    onClick={() =>
                                      Inc(
                                        product.quantity,
                                        product.productInfo.stock,
                                        product._id
                                      )
                                    }
                                  >
                                    +
                                  </div>
                                </div>
                                <button
                                  onClick={() =>
                                    dispatch(DeleteCartProduct(product._id))
                                  }
                                  className="px-5 py-[3px] bg-red-500 text-white"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                    {out_of_stock_products.length > 0 && (
                      <div className="flex flex-col gap-3">
                        <div className="p-4 bg-white">
                          <h2 className="font-semibold text-red-500 text-md">
                            Out of Stock {out_of_stock_products.length}
                          </h2>
                        </div>
                        <div className="p-4 bg-white">
                          {out_of_stock_products.map((p, i) => (
                            <div className="flex flex-wrap w-full">
                              <div className="flex w-7/12 gap-2 sm:w-full">
                                <div className="flex items-center justify-start gap-2">
                                  <img
                                    className="w-[80px] h-[80px]"
                                    src={p.products[0].images[0]}
                                    alt=""
                                  />
                                  <div className="pr-4 text-slate-600">
                                    <h2 className="font-semibold text-md">
                                      {p.products[0].name}{" "}
                                    </h2>
                                    <span className="text-sm">
                                      Brand: {p.products[0].brand}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-between w-5/12 sm:w-full sm:mt-3">
                                <div className="pl-4 sm:pl-0">
                                  <h2 className="text-lg text-orange-500">
                                    $
                                    {p.products[0].price -
                                      Math.floor(
                                        (p.products[0].price *
                                          p.products[0].discount) /
                                          100
                                      )}
                                  </h2>
                                  <p className="line-through">
                                    ${p.products[0].price}
                                  </p>
                                  <p>-{p.products[0].discount}%</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                  <div className="flex bg-slate-200 h-[30px] justify-center items-center text-xl">
                                    <div
                                      className="px-3 cursor-pointer"
                                      onClick={() =>
                                        Dec(p.quantity, p.stock, p._id)
                                      }
                                    >
                                      -
                                    </div>
                                    <div className="px-3">{p.quantity}</div>
                                    <div
                                      className="px-3 cursor-pointer"
                                      onClick={() =>
                                        Dec(p.quantity, p.stock, p._id)
                                      }
                                    >
                                      +
                                    </div>
                                  </div>
                                  <button
                                    className="px-5 py-[3px] bg-red-500 text-white"
                                    onClick={() =>
                                      dispatch(DeleteCartProduct(p._id))
                                    }
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-[33%] md-lg:w-full">
                <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
                  {cart_products.length > 0 && (
                    <div className="flex flex-col gap-3 p-3 bg-white text-slate-600">
                      <h2 className="text-xl font-bold">Order Summary</h2>
                      <div className="flex items-center justify-between">
                        <span>{buy_product_item} Items </span>
                        <span>${price} </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Shipping Fee </span>
                        <span>${shipping_fee} </span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          className="w-full px-3 py-2 border rounded-sm border-slate-200 outline-0 focus:border-green-500"
                          type="text"
                          placeholder="Input Voucher Coupon"
                        />
                        <button className="px-5 py-[1px] bg-[#059473] text-white rounded-sm uppercase text-sm">
                          Apply
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <span>Total</span>
                        <span className="text-lg text-[#059473]">
                          ${price + shipping_fee}{" "}
                        </span>
                      </div>
                      <button
                        onClick={redirect}
                        className="px-5 py-[6px] rounded-sm hover:shadow-red-500/50 hover:shadow-lg bg-red-500 text-sm text-white uppercase "
                      >
                        Process to Checkout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Link className="px-4 py-1 text-white bg-indigo-500" to="/shops">
                {" "}
                Shop Now
              </Link>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default Cart;
