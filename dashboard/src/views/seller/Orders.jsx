import React, { useState } from "react";
import Search from "../components/Search";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);

  return (
    <div className="px-2 pt-5 lg:px-7">
      <h1 className="text-[#000000] font-semibold text-lg mb-3">Orders</h1>

      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
        <Search
          setParPage={setParPage}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />

        <div className="relative mt-5 overflow-x-auto">
          <table className="w-full text-sm text-left text-[#d0d2d6]">
            <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Order Id
                </th>
                <th scope="col" className="px-4 py-3">
                  Price
                </th>
                <th scope="col" className="px-4 py-3">
                  Payment Status
                </th>
                <th scope="col" className="px-4 py-3">
                  Order Status
                </th>
                <th scope="col" className="px-4 py-3">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {[1, 2, 3, 4, 5].map((d, i) => (
                <tr key={i}>
                  <td
                    scope="row"
                    className="px-4 py-1 font-medium whitespace-nowrap"
                  >
                    #5455
                  </td>
                  <td
                    scope="row"
                    className="px-4 py-1 font-medium whitespace-nowrap"
                  >
                    $455
                  </td>
                  <td
                    scope="row"
                    className="px-4 py-1 font-medium whitespace-nowrap"
                  >
                    pending{" "}
                  </td>
                  <td
                    scope="row"
                    className="px-4 py-1 font-medium whitespace-nowrap"
                  >
                    pending
                  </td>
                  <td
                    scope="row"
                    className="px-4 py-1 font-medium whitespace-nowrap"
                  >
                    <div className="flex items-center justify-start gap-4">
                      <Link
                        to={`/seller/dashboard/order-details/34`}
                        className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50"
                      >
                        {" "}
                        <FaEye />{" "}
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end w-full mt-4 bottom-4 right-4">
          <Pagination
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={50}
            parPage={parPage}
            showItem={3}
          />
        </div>
      </div>
    </div>
  );
};

export default Orders;
