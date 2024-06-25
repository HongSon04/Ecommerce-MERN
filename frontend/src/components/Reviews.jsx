import React, { useState } from "react";
import Rating from "./Rating";
import RatingTemp from "./RatingTemp";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import RatingReact from "react-rating";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

const Reviews = () => {
  const [parPage, setParPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(10);
  const userInfo = {};

  const [rate, setRate] = useState("");
  const [re, setRe] = useState("");

  return (
    <div className="mt-8">
      <div className="flex gap-10 md-lg:flex-col">
        <div className="flex flex-col items-start justify-start gap-2 py-4">
          <div>
            <span className="text-6xl font-semibold">4.5</span>
            <span className="text-3xl font-semibold text-slate-600">/5</span>
          </div>
          <div className="flex text-3xl">
            <Rating ratings={4.5} />
          </div>
          <p className="text-sm text-slate-600">15 Reviews</p>
        </div>
        <div className="flex flex-col gap-2 py-4">
          <div className="flex items-center justify-start gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={5} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div className="h-full bg-[#Edbb0E] w-[60%]"></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">10</p>
          </div>
          <div className="flex items-center justify-start gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={4} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div className="h-full bg-[#Edbb0E] w-[70%]"></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">20</p>
          </div>
          <div className="flex items-center justify-start gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={3} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div className="h-full bg-[#Edbb0E] w-[40%]"></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">8</p>
          </div>
          <div className="flex items-center justify-start gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={2} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div className="h-full bg-[#Edbb0E] w-[30%]"></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">5</p>
          </div>
          <div className="flex items-center justify-start gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={1} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div className="h-full bg-[#Edbb0E] w-[10%]"></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">3</p>
          </div>
          <div className="flex items-center justify-start gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={0} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div className="h-full bg-[#Edbb0E] w-[0%]"></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">0</p>
          </div>
        </div>
      </div>
      <h2 className="py-5 text-xl font-bold text-slate-600">
        Product Review 10
      </h2>
      <div className="flex flex-col gap-8 pt-4 pb-10">
        {[1, 2, 3, 4, 5].map((r, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <div className="flex gap-1 text-xl">
                <RatingTemp rating={4} />
              </div>
              <span className="text-slate-600">8 Jan 2024</span>
            </div>
            <span className="text-slate-600 text-md">Kazi Ariyan</span>
            <p className="text-sm text-slate-600">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s,
            </p>
          </div>
        ))}
        <div className="flex justify-end">
          {
            <Pagination
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              totalItem={10}
              parPage={parPage}
              showItem={Math.floor(10 / 3)}
            />
          }
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
            <form>
              <textarea
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
