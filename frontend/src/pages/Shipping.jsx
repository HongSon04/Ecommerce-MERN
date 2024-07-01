import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { PlaceOrder } from "../store/OrderReducer";
const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [res, setRes] = useState(false);
  const {
    state: { products, price, shipping_fee, items },
  } = useLocation();
  const { userInfo } = useSelector((state) => state.auth);
  const [state, setState] = useState({
    name: "",
    address: "",
    phone: "",
    post: "",
    province: "",
    city: "",
    area: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const save = (e) => {
    e.preventDefault();
    const { name, address, phone, post, province, city, area } = state;
    if (name && address && phone && post && province && city && area) {
      setRes(true);
    }
  };

  const placeOrder = () => {
    dispatch(
      PlaceOrder({
        products,
        price,
        shipping_fee,
        items,
        shippingInfo: state,
        userId: userInfo.id,
        navigate,
      })
    );
  };

  return (
    <div>
      <Header />
      <section className='bg-[url("http://localhost:3000/images/banner/shop.png")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col items-center justify-center w-full h-full gap-1 text-white">
              <h2 className="text-3xl font-bold">Shipping Page </h2>
              <div className="flex items-center justify-center w-full gap-2 text-2xl">
                <Link to="/">Home</Link>
                <span className="pt-1">
                  <IoIosArrowForward />
                </span>
                <span>Shipping </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#eeeeee]">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16">
          <div className="flex flex-wrap w-full">
            <div className="w-[67%] md-lg:w-full">
              <div className="flex flex-col gap-3">
                <div className="p-6 bg-white rounded-md shadow-sm">
                  <h2 className="pb-3 font-bold text-slate-600">
                    Shipping Information{" "}
                  </h2>
                  {!res && (
                    <>
                      <form onSubmit={save}>
                        <div className="flex w-full gap-5 md:flex-col md:gap-2 text-slate-600">
                          <div className="flex flex-col w-full gap-1 mb-2">
                            <label htmlFor="name"> Name </label>
                            <input
                              onChange={inputHandle}
                              value={state.name}
                              type="text"
                              className="w-full px-3 py-2 border rounded-md outline-none border-slate-200 focus:border-green-500"
                              name="name"
                              id="name"
                              placeholder="Name"
                            />
                          </div>
                          <div className="flex flex-col w-full gap-1 mb-2">
                            <label htmlFor="address"> Address </label>
                            <input
                              onChange={inputHandle}
                              value={state.address}
                              type="text"
                              className="w-full px-3 py-2 border rounded-md outline-none border-slate-200 focus:border-green-500"
                              name="address"
                              id="address"
                              placeholder="Address"
                            />
                          </div>
                        </div>
                        <div className="flex w-full gap-5 md:flex-col md:gap-2 text-slate-600">
                          <div className="flex flex-col w-full gap-1 mb-2">
                            <label htmlFor="phone"> Phone </label>
                            <input
                              onChange={inputHandle}
                              value={state.phone}
                              type="text"
                              className="w-full px-3 py-2 border rounded-md outline-none border-slate-200 focus:border-green-500"
                              name="phone"
                              id="phone"
                              placeholder="Phone"
                            />
                          </div>
                          <div className="flex flex-col w-full gap-1 mb-2">
                            <label htmlFor="post"> Post </label>
                            <input
                              onChange={inputHandle}
                              value={state.post}
                              type="text"
                              className="w-full px-3 py-2 border rounded-md outline-none border-slate-200 focus:border-green-500"
                              name="post"
                              id="post"
                              placeholder="Post"
                            />
                          </div>
                        </div>
                        <div className="flex w-full gap-5 md:flex-col md:gap-2 text-slate-600">
                          <div className="flex flex-col w-full gap-1 mb-2">
                            <label htmlFor="province"> Province </label>
                            <input
                              onChange={inputHandle}
                              value={state.province}
                              type="text"
                              className="w-full px-3 py-2 border rounded-md outline-none border-slate-200 focus:border-green-500"
                              name="province"
                              id="province"
                              placeholder="Province"
                            />
                          </div>
                          <div className="flex flex-col w-full gap-1 mb-2">
                            <label htmlFor="city"> City </label>
                            <input
                              onChange={inputHandle}
                              value={state.city}
                              type="text"
                              className="w-full px-3 py-2 border rounded-md outline-none border-slate-200 focus:border-green-500"
                              name="city"
                              id="city"
                              placeholder="City"
                            />
                          </div>
                        </div>
                        <div className="flex w-full gap-5 md:flex-col md:gap-2 text-slate-600">
                          <div className="flex flex-col w-full gap-1 mb-2">
                            <label htmlFor="area"> Area </label>
                            <input
                              onChange={inputHandle}
                              value={state.area}
                              type="text"
                              className="w-full px-3 py-2 border rounded-md outline-none border-slate-200 focus:border-green-500"
                              name="area"
                              id="area"
                              placeholder="Area"
                            />
                          </div>
                          <div className="flex flex-col w-full gap-1 mb-2 mt-7">
                            <button className="px-3 py-[6px] rounded-sm hover:shadow-green-500/50 hover:shadow-lg bg-green-500 text-white">
                              Save Change{" "}
                            </button>
                          </div>
                        </div>
                      </form>
                    </>
                  )}
                  {res && (
                    <div className="flex flex-col gap-1">
                      <h2 className="pb-2 font-semibold text-slate-600">
                        Deliver To {state.name}
                      </h2>
                      <p>
                        <span className="px-2 py-1 mr-2 text-sm font-medium text-blue-800 bg-blue-200 rounded">
                          Home
                        </span>
                        <span>
                          {state.phone} {state.address} {state.province}{" "}
                          {state.city} {state.area}{" "}
                        </span>

                        <span
                          onClick={() => setRes(false)}
                          className="text-indigo-500 cursor-pointer"
                        >
                          Change{" "}
                        </span>
                      </p>
                      <p className="text-sm text-slate-600">
                        Email To {userInfo.email}
                      </p>
                    </div>
                  )}
                </div>

                {products.map((p, i) => (
                  <div key={i} className="flex flex-col gap-2 p-4 bg-white">
                    <div className="flex items-center justify-start">
                      <h2 className="font-bold text-md text-slate-600">
                        {p.shopName}
                      </h2>
                    </div>

                    {p.products.map((product, j) => (
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
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="w-[33%] md-lg:w-full">
              <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
                <div className="flex flex-col gap-3 p-3 bg-white text-slate-600">
                  <h2 className="text-xl font-bold">Order Summary</h2>
                  <div className="flex items-center justify-between">
                    <span>Items Total ({items}) </span>
                    <span>${price} </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Delivery Fee </span>
                    <span>${shipping_fee} </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Total Payment </span>
                    <span>${price + shipping_fee} </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Total</span>
                    <span className="text-lg text-[#059473]">
                      ${price + shipping_fee}{" "}
                    </span>
                  </div>
                  <button
                    onClick={placeOrder}
                    disabled={res ? false : true}
                    className={`px-5 py-[6px] rounded-sm hover:shadow-red-500/50 hover:shadow-lg ${
                      res ? "bg-red-500" : "bg-red-300"
                    }  text-sm text-white uppercase`}
                  >
                    Place Order
                  </button>
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
export default Shipping;
