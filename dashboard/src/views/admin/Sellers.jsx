import React, { useState } from "react";
import Search from "../components/Search";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import Pagination from "../Pagination";

const Sellers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);

  return (
    <div className="px-2 pt-5 lg:px-7">
      <h1 className="text-[20px] font-bold mb-3">Seller </h1>
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
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

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-[#d0d2d6]">
            <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="px-4 py-3">
                  No
                </th>
                <th scope="col" className="px-4 py-3">
                  Image
                </th>
                <th scope="col" className="px-4 py-3">
                  Name
                </th>
                <th scope="col" className="px-4 py-3">
                  Shop Name
                </th>
                <th scope="col" className="px-4 py-3">
                  Payment Status
                </th>
                <th scope="col" className="px-4 py-3">
                  Email
                </th>
                <th scope="col" className="px-4 py-3">
                  Status
                </th>
                <th scope="col" className="px-4 py-3">
                  District
                </th>
                <th scope="col" className="px-4 py-3">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td
                  scope="row"
                  className="px-4 py-1 font-medium whitespace-nowrap"
                >
                  21312
                </td>
                <td
                  scope="row"
                  className="px-4 py-1 font-medium whitespace-nowrap"
                >
                  <img className="w-[45px] h-[45px]" src={""} alt="" />
                </td>
                <td
                  scope="row"
                  className="px-4 py-1 font-medium whitespace-nowrap"
                >
                  asfvasdva
                </td>
                <td
                  scope="row"
                  className="px-4 py-1 font-medium whitespace-nowrap"
                >
                  hun
                </td>
                <td
                  scope="row"
                  className="px-4 py-1 font-medium whitespace-nowrap"
                >
                  <span>Momo</span>{" "}
                </td>
                <td
                  scope="row"
                  className="px-4 py-1 font-medium whitespace-nowrap"
                >
                  beo@gmail.com
                </td>

                <td
                  scope="row"
                  className="px-4 py-1 font-medium whitespace-nowrap"
                >
                  Complete
                </td>

                <td
                  scope="row"
                  className="px-4 py-1 font-medium whitespace-nowrap"
                >
                  VietNam
                </td>

                <td
                  scope="row"
                  className="px-4 py-1 font-medium whitespace-nowrap"
                >
                  <div className="flex items-center justify-start gap-4">
                    <Link className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50">
                      {" "}
                      <FaEye />{" "}
                    </Link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-end w-full mt-4 bottom-4 right-4">
          <Pagination
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={50}
            parPage={parPage}
            showItem={4}
          />
        </div>
      </div>
    </div>
  );
};

export default Sellers;
