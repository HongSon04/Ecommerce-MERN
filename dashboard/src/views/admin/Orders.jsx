import React, { useState } from "react";
import { FaArrowDownShortWide, FaArrowUpShortWide } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  const [show, setShow] = useState(false);
  return (
    <div className="px-2 pt-5 lg:px-7">
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
        {/* Header Table */}
        <div className="flex items-center justify-between">
          <select
            onChange={(e) => setParPage(parseInt(e.target.value))}
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
            type="text"
            placeholder="search"
          />
        </div>
        {/* End Header Table */}

        {/* Body Table */}
        <div className="relative mt-5 overflow-x-auto">
          <div className="w-full text-sm text-left [#d0d2d6]">
            {/* Header Seller Item */}

            <div className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
              <div className="flex items-center justify-between ">
                <div className="py-3 w-[25%] font-bold">Order id</div>
                <div className="py-3 w-[13%] font-bold">Price</div>
                <div className="py-3 w-[18%] font-bold">Payment Status</div>
                <div className="py-3 w-[18%] font-bold">Order Status</div>
                <div className="py-3 w-[18%] font-bold">Action </div>
                <div className="py-3 w-[8%] font-bold">
                  <FaArrowDownShortWide />
                </div>
              </div>
            </div>
            {/* End Header Seller Item */}

            {/* Body Seller Item */}
            <div className="text-[#d0d2d6] ">
              <div className="flex items-start justify-between border-b border-slate-700">
                <div className="py-3 w-[25%] font-medium whitespace-nowrap">
                  #2313
                </div>
                <div className="py-3 w-[13%] font-medium">$2131</div>
                <div className="py-3 w-[18%] font-medium">Pending</div>
                <div className="py-3 w-[18%] font-medium">Pending</div>
                <div className="py-3 w-[18%] font-medium">
                  <Link>View</Link>
                </div>
                <div
                  className="py-3 w-[8%] font-medium"
                  onClick={(e) => setShow(!show)}
                >
                  <FaArrowDownShortWide />
                </div>
              </div>
              {/* Seller Info Item */}

              <div
                className={
                  show
                    ? "block border-b border-slate-700 bg-[#8288ed]"
                    : "hidden"
                }
              >
                <div className="flex items-start justify-start border-b border-slate-700">
                  <div className="py-3 w-[25%] font-medium whitespace-nowrap pl-3">
                    #4312432
                  </div>
                  <div className="py-3 w-[13%] font-medium">$432423</div>
                  <div className="py-3 w-[18%] font-medium">Pending</div>
                  <div className="py-3 w-[18%] font-medium">Pending</div>
                </div>
                <div className="flex items-start justify-start border-b border-slate-700">
                  <div className="py-3 w-[25%] font-medium whitespace-nowrap pl-3">
                    #4312432
                  </div>
                  <div className="py-3 w-[13%] font-medium">$432423</div>
                  <div className="py-3 w-[18%] font-medium">Pending</div>
                  <div className="py-3 w-[18%] font-medium">Pending</div>
                </div>
              </div>
            </div>
            {/* End Body Seller Item */}
          </div>
        </div>
        {/* End Body Table */}
        {/* Pagination */}

        <div className="flex justify-end w-full mt-4 bottom-4 right-4">
          <Pagination
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={10}
            parPage={parPage}
            showItem={3}
          />
        </div>
        {/* End Pagination */}
      </div>
    </div>
  );
};

export default Orders;
