import React from "react";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";
import ChangeLangue from "../utils/ChangeLangue";

const Categories = () => {
  const { t } = ChangeLangue();
  const { categories } = useSelector((state) => state.home);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
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

  return (
    <div className="w-[87%] mx-auto relative">
      <div className="w-full">
        <div className="text-center flex justify-center items-center flex-col text-4xl to-slate-600 font-bold relative pb-[45px]">
          <h2>{t("text.top-category")}</h2>
          <div className="w-[100px] h-[2px] bg-[#059473] mt-4"></div>
        </div>
      </div>
      <Carousel
        autoPlay={true}
        infinite={true}
        arrows={true}
        responsive={responsive}
        transitionDuration={500}
      >
        {categories.map((category, i) => (
          <Link
            to={`/products/?category=${category.name}`}
            className="h-[185px] border block"
            key={i}
          >
            <div className="relative w-full h-full p-3">
              <img src={category.image} alt="" />
              <div className="absolute left-0 flex items-center justify-center w-full mx-auto font-bold bottom-6">
                <span className="py-[2px] px-6 bg-[#3330305d] text-white">
                  {category.name}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default Categories;
