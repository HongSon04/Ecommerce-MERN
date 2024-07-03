import React, { useEffect, useState } from "react";
import Rating from "./Rating";
import RatingTemp from "./RatingTemp";
import Pagination from "./Pagination";
import { Link, useParams } from "react-router-dom";
import RatingReact from "react-rating";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  clearMessage,
  CustomerReview,
  GetProductDetails,
  GetReviews,
} from "../store/reducers/HomeReducer";
const Reviews = ({ product }) => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [parPage, setParPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const { userInfo } = useSelector((state) => state.auth);
  const { successMessage, reviews, totalReview, rating_review } = useSelector(
    (state) => state.home
  );

  const [rate, setRate] = useState("");
  const [re, setRe] = useState("");

  const review_submit = (e) => {
    e.preventDefault();
    const obj = {
      name: userInfo.name,
      review: re,
      rating: rate,
      productId: product._id,
    };
    dispatch(CustomerReview(obj));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      setRe("");
      setRate("");
      dispatch(GetReviews({ productId: product._id, pageNumber }));
      dispatch(GetProductDetails(slug));
    }
    dispatch(clearMessage());
  }, [dispatch, successMessage, product._id, pageNumber]);

  useEffect(() => {
    if (product._id) {
      dispatch(GetReviews({ productId: product._id, pageNumber }));
    }
  }, [product, pageNumber, dispatch]);

  return (
    <div className="mt-8">
      <div className="flex gap-10 md-lg:flex-col">
        <div className="flex flex-col items-start justify-start gap-2 py-4">
          <div>
            <span className="text-6xl font-semibold">{product.rating}</span>
            <span className="text-3xl font-semibold text-slate-600">/5</span>
          </div>
          <div className="flex text-3xl">
            <Rating ratings={product.rating} />
          </div>
          <p className="text-sm text-slate-600">{totalReview} Reviews</p>
        </div>
        <div className="flex flex-col gap-2 py-4">
          <div className="flex items-center justify-start gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={5} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div
                style={{
                  width: `${Math.floor(
                    ((rating_review[0]?.sum || 0) / totalReview) * 100
                  )}%`,
                }}
                className="h-full bg-[#Edbb0E] w-[60%]"
              ></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">10</p>
          </div>
          <div className="flex items-center justify-start gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={4} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div
                style={{
                  width: `${Math.floor(
                    ((rating_review[1]?.sum || 0) / totalReview) * 100
                  )}%`,
                }}
                className="h-full bg-[#Edbb0E] w-[70%]"
              ></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">20</p>
          </div>
          <div className="flex items-center justify-start gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={3} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div
                style={{
                  width: `${Math.floor(
                    ((rating_review[2]?.sum || 0) / totalReview) * 100
                  )}%`,
                }}
                className="h-full bg-[#Edbb0E] w-[40%]"
              ></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">8</p>
          </div>
          <div className="flex items-center justify-start gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={2} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div
                style={{
                  width: `${Math.floor(
                    ((rating_review[3]?.sum || 0) / totalReview) * 100
                  )}%`,
                }}
                className="h-full bg-[#Edbb0E] w-[30%]"
              ></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">5</p>
          </div>
          <div className="flex items-center justify-start gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={1} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div
                style={{
                  width: `${Math.floor(
                    ((rating_review[4]?.sum || 0) / totalReview) * 100
                  )}%`,
                }}
                className="h-full bg-[#Edbb0E] w-[10%]"
              ></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">3</p>
          </div>
          <div className="flex items-center justify-start gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={0} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div
                style={{
                  width: `${Math.floor(
                    ((rating_review[5]?.sum || 0) / totalReview) * 100
                  )}%`,
                }}
                className="h-full bg-[#Edbb0E] w-[0%]"
              ></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">0</p>
          </div>
        </div>
      </div>
      <h2 className="py-5 text-xl font-bold text-slate-600">
        Product Review ({totalReview})
      </h2>
      <div className="flex flex-col gap-8 pt-4 pb-10">
        {reviews.map((review, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <div className="flex gap-1 text-xl">
                <RatingTemp rating={review.rating} />
              </div>
              <span className="text-slate-600">{review.date}</span>
            </div>
            <span className="text-slate-600 text-md">{review.name}</span>
            <p className="text-sm text-slate-600">{review.review}</p>
          </div>
        ))}
        <div className="flex justify-end">
          {totalReview > 5 && (
            <Pagination
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              totalItem={10}
              parPage={parPage}
              showItem={Math.floor(10 / 3)}
            />
          )}
        </div>
      </div>

      <div>
        {userInfo ? (
          <div className="flex flex-col gap-3 mb-5">
            <div className="flex gap-1">
              <RatingReact
                onChange={(e) => setRate(e)}
                initialRating={rate}
                emptySymbol={
                  <span className="text-4xl text-slate-600">
                    <CiStar />
                  </span>
                }
                fullSymbol={
                  <span className="text-[#Edbb0E] text-4xl">
                    <FaStar />
                  </span>
                }
              />
            </div>
            <form onSubmit={review_submit}>
              <textarea
                value={re}
                onChange={(e) => setRe(e.target.value)}
                required
                className="w-full p-3 border outline-0"
                name=""
                id=""
                cols="30"
                rows="5"
              ></textarea>
              <div className="mt-2">
                <button className="px-5 py-1 text-white bg-indigo-500 rounded-sm">
                  Submit
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <Link
              to="/login"
              className="px-5 py-1 text-white bg-red-500 rounded-sm"
            >
              {" "}
              Login First{" "}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default Reviews;
