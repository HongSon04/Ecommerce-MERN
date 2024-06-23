import React from "react";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Products = ({ title }) => {
  const products = [
    [1, 2, 3],
    [4, 5, 6],
  ];
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const ButtonGroup = ({ next, previous }) => {
    return (
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold text-slate-600"> {title} </div>
        <div className="flex items-center justify-center gap-3 text-slate-600">
          <button
            onClick={() => previous()}
            className="w-[30px] h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200"
          >
            <IoIosArrowBack />
          </button>
          <button
            onClick={() => next()}
            className="w-[30px] h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200"
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col-reverse gap-8">
      <Carousel
        autoPlay={false}
        infinite={false}
        arrows={false}
        responsive={responsive}
        transitionDuration={500}
        renderButtonGroupOutside={true}
        customButtonGroup={<ButtonGroup />}
      >
        {products.map((p, i) => {
          return (
            <div className="flex flex-col justify-start gap-2">
              {p.map((pl, j) => (
                <Link className="flex items-start justify-start" to="#">
                  <img
                    className="w-[110px] h-[110px]"
                    src={`http://localhost:3000/images/products/${pl}.webp`}
                    alt=""
                  />
                  <div className="flex flex-col items-start justify-start gap-1 px-3 text-slate-600">
                    <h2>Product Name </h2>
                    <span className="text-lg font-bold">$434</span>
                  </div>
                </Link>
              ))}
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
export default Products;
