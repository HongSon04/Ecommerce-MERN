import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Carousel from "react-multi-carousel";
import Rating from "../components/Rating";
import { IoIosArrowForward } from "react-icons/io";
import { FaHeart, FaTwitter } from "react-icons/fa6";
import { FaFacebookF, FaLinkedin, FaGithub } from "react-icons/fa";
import Reviews from "../components/Reviews";
import { useDispatch, useSelector } from "react-redux";
import { GetProductDetails } from "../store/reducers/HomeReducer";
import toast from "react-hot-toast";
import {
  AddToCart,
  AddToWishlist,
  clearMessage,
  GetCartProducts,
} from "../store/cartReducer";
const Details = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { successMessage, errorMessage } = useSelector((state) => state.cart);
  const { product, relatedProducts, moreProducts } = useSelector(
    (state) => state.home
  );
  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState("");
  const [state, setState] = useState("reviews");

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mdtablet: {
      breakpoint: { max: 991, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
    smmobile: {
      breakpoint: { max: 640, min: 0 },
      items: 2,
    },
    xsmobile: {
      breakpoint: { max: 440, min: 0 },
      items: 1,
    },
  };

  const add_to_cart = (product_id) => {
    if (userInfo) {
      dispatch(AddToCart({ product_id, userId: userInfo.id, quantity }));
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

  const buynow = () => {
    let price = 0;
    if (product?.discount !== 0) {
      price =
        product?.price - Math.floor((product?.price * product?.discount) / 100);
    } else {
      price = product?.price;
    }

    const obj = [
      {
        sellerId: product?.sellerId,
        shopName: product?.shopName,
        price: quantity * (price - Math.floor((price * 5) / 100)),
        products: [
          {
            quantity,
            productInfo: product,
          },
        ],
      },
    ];

    navigate("/shipping", {
      state: {
        products: obj,
        price: price * quantity,
        shipping_fee: 50,
        items: 1,
      },
    });
  };

  const inc = () => {
    if (quantity >= product?.stock) {
      toast.error("Product Out Of Stock");
    } else {
      setQuantity(quantity + 1);
    }
  };

  const dec = () => {
    if (quantity <= 1) {
      toast.error("Minimum Quantity is 1");
    } else {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    dispatch(GetProductDetails(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    dispatch(GetCartProducts(userInfo.id));
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearMessage());
      dispatch(GetCartProducts(userInfo.id));
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(clearMessage());
    }
  }, [successMessage, errorMessage, dispatch, userInfo]);
  return (
    <div>
      <Header />
      <section className='bg-[url("http://localhost:3000/images/banner/shop.png")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col items-center justify-center w-full h-full gap-1 text-white">
              <h2 className="text-3xl font-bold">Product Details </h2>
              <div className="flex items-center justify-center w-full gap-2 text-2xl">
                <Link to="/">Home</Link>
                <span className="pt-1">
                  <IoIosArrowForward />
                </span>
                <span>Product Details </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="py-5 mb-5 bg-slate-100">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex items-center justify-start w-full text-md text-slate-600">
              <Link to="/">Home</Link>
              <span className="pt-1">
                <IoIosArrowForward />
              </span>
              <Link to={`/products?category=${product?.category}`}>
                {product?.category}
              </Link>
              <span className="pt-1">
                <IoIosArrowForward />
              </span>
              <span>{product?.name} </span>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
          <div className="grid grid-cols-2 gap-8 md-lg:grid-cols-1">
            <div>
              <div className="p-5 border">
                <img
                  className="h-[400px] w-full"
                  src={image ? image : product?.images?.[0]}
                  alt=""
                />
              </div>
              <div className="py-3">
                {product?.images && (
                  <Carousel
                    autoPlay={true}
                    infinite={true}
                    responsive={responsive}
                    transitionDuration={500}
                  >
                    {product?.images.map((img, i) => {
                      return (
                        <div key={i} onClick={() => setImage(img)}>
                          <img
                            className="h-[120px] cursor-pointer"
                            src={img}
                            alt=""
                          />
                        </div>
                      );
                    })}
                  </Carousel>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="text-3xl font-bold text-slate-600">
                <h3>{product?.name} </h3>
              </div>
              <div className="flex items-center justify-start gap-4">
                <div className="flex text-xl">
                  <Rating ratings={product?.rating} />
                </div>
                <span className="text-green-500">(24 reviews)</span>
              </div>
              <div className="flex gap-3 text-2xl font-bold text-red-500">
                {product?.discount !== 0 ? (
                  <>
                    Price : <h2 className="line-through">${product?.price}</h2>
                    <h2>
                      $
                      {product?.price -
                        Math.floor(
                          (product?.price * product?.discount) / 100
                        )}{" "}
                      (-
                      {product?.discount}%){" "}
                    </h2>
                  </>
                ) : (
                  <h2> Price : ${product?.price} </h2>
                )}
              </div>
              <div className="text-slate-600">
                <p>{product?.description?.slice(0, 100)}...</p>
              </div>
              <div className="flex gap-3 pb-10 border-b">
                {product?.stock ? (
                  <>
                    <div className="flex bg-slate-200 h-[50px] justify-center items-center text-xl">
                      <div onClick={dec} className="px-6 cursor-pointer">
                        -
                      </div>
                      <div className="px-6">{quantity}</div>
                      <div onClick={inc} className="px-6 cursor-pointer">
                        +
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => add_to_cart(product?._id)}
                        className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-green-500/40 bg-[#059473] text-white"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </>
                ) : (
                  ""
                )}
                <div>
                  <div
                    onClick={() => add_wishlist(product)}
                    className="h-[50px] w-[50px] flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-cyan-500/40 bg-cyan-500 text-white"
                  >
                    <FaHeart />
                  </div>
                </div>
              </div>
              <div className="flex gap-5 py-5">
                <div className="w-[150px] text-black font-bold text-xl flex flex-col gap-5">
                  <span>Shop Name</span>
                  <span>Availability</span>
                  <span>Share On</span>
                </div>
                <div className="flex flex-col gap-5">
                  <span className="text-xl font-bold text-black">
                    {product?.shopName}
                  </span>
                  <span
                    className={`text-${
                      product?.stock > 0 ? "green" : "red"
                    }-500`}
                  >
                    {product?.stock
                      ? `In Stock(${product?.stock})`
                      : "Out Of Stock"}
                  </span>
                  <ul className="flex items-center justify-start gap-3">
                    <li>
                      <a
                        className="w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-indigo-500 rounded-full text-white"
                        href="#"
                      >
                        {" "}
                        <FaFacebookF />{" "}
                      </a>
                    </li>
                    <li>
                      <a
                        className="w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-cyan-500 rounded-full text-white"
                        href="#"
                      >
                        {" "}
                        <FaTwitter />{" "}
                      </a>
                    </li>
                    <li>
                      <a
                        className="w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-purple-500 rounded-full text-white"
                        href="#"
                      >
                        {" "}
                        <FaLinkedin />{" "}
                      </a>
                    </li>
                    <li>
                      <a
                        className="w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-blue-500 rounded-full text-white"
                        href="#"
                      >
                        {" "}
                        <FaGithub />{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex gap-3">
                {product?.stock ? (
                  <button
                    onClick={() => buynow()}
                    className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-green-500/40 bg-[#247462] text-white"
                  >
                    Buy Now
                  </button>
                ) : (
                  ""
                )}
                <Link
                  to={`/dashboard/chat/${product?.seller_id}`}
                  className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-red-500/40 bg-red-500 text-white"
                >
                  Chat Seller
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-5">
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16">
          <div className="flex flex-wrap">
            <div className="w-[72%] md-lg:w-full">
              <div className="pr-4 md-lg:pr-0">
                <div className="grid grid-cols-2">
                  <button
                    onClick={() => setState("reviews")}
                    className={`py-1 hover:text-white px-5 hover:bg-[#059473] ${
                      state === "reviews"
                        ? "bg-[#059473] text-white"
                        : "bg-slate-200 text-slate-700"
                    } rounded-sm`}
                  >
                    Reviews{" "}
                  </button>

                  <button
                    onClick={() => setState("description")}
                    className={`py-1 hover:text-white px-5 hover:bg-[#059473] ${
                      state === "description"
                        ? "bg-[#059473] text-white"
                        : "bg-slate-200 text-slate-700"
                    } rounded-sm`}
                  >
                    Description{" "}
                  </button>
                </div>
                <div>
                  {state === "reviews" ? (
                    <Reviews product={product} />
                  ) : (
                    <p className="py-5 text-slate-600">
                      {product?.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="w-[28%] md-lg:w-full">
              <div className="pl-4 md-lg:pl-0">
                <div className="px-3 py-2 text-slate-600 bg-slate-200">
                  <h2 className="font-bold">From {product.shopName}</h2>
                </div>
                <div className="flex flex-col gap-5 p-3 mt-3 border">
                  {moreProducts.map((product, i) => {
                    return (
                      <Link
                        className="block"
                        key={i}
                        to={`/product/details/${product?.slug}`}
                      >
                        <div className="relative h-[270px]">
                          <img
                            className="w-full h-full"
                            src={product?.images[0]}
                            alt=""
                          />
                          {product?.discount !== 0 && (
                            <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                              {product?.discount}%
                            </div>
                          )}
                        </div>
                        <h2 className="py-1 font-bold text-slate-600">
                          {product?.name.slice(0, 55)}...{" "}
                        </h2>
                        <div className="flex gap-2">
                          <h2 className="text-lg font-bold text-slate-600">
                            ${product?.price}
                          </h2>
                          <div className="flex items-center gap-2">
                            <Rating ratings={product?.rating} />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
          <h2 className="py-8 text-2xl text-slate-600">Related Products </h2>
          <div>
            <Swiper
              slidesPerView="auto"
              breakpoints={{
                1280: {
                  slidesPerView: 3,
                },
                565: {
                  slidesPerView: 2,
                },
              }}
              spaceBetween={25}
              loop={true}
              pagination={{
                clickable: true,
                el: ".custom_bullet",
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {relatedProducts.map((product, i) => {
                return (
                  <SwiperSlide key={i}>
                    <Link
                      className="block"
                      to={`/product/details/${product?.slug}`}
                    >
                      <div className="relative h-[270px]">
                        <div className="w-full h-full">
                          <img
                            className="w-full h-full"
                            src={product?.images[0]}
                            alt=""
                          />
                          <div className="absolute h-full w-full top-0 left-0 bg-[#000] opacity-25 hover:opacity-50 transition-all duration-500"></div>
                        </div>
                        {product?.images[0] !== 0 && (
                          <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                            {product?.discount}%
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-1 p-4">
                        <h2 className="text-lg font-bold text-slate-600">
                          {product?.name}{" "}
                        </h2>
                        <div className="flex items-center justify-start gap-3">
                          <h2 className="text-lg font-bold text-slate-600">
                            ${product?.price}
                          </h2>
                          <div className="flex">
                            <Rating ratings={product?.rating} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          <div className="flex items-center justify-center w-full py-8">
            <div className="custom_bullet justify-center gap-3 !w-auto"></div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
export default Details;
