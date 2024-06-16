import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import Search from "../components/Search";

const SellerRequest = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
    const [show, setShow] = useState(false);
    
  return (
    <div className="px-2 pt-5 lg:px-7">
      <h1 className="text-[20px] font-bold mb-3"> Seller Request </h1>

      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
        <Search
          setParPage={setParPage}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-[#d0d2d6]">
            <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="px-4 py-3">
                  No
                </th>
                <th scope="col" className="px-4 py-3">
                  Name
                </th>
                <th scope="col" className="px-4 py-3">
                  Email
                </th>
                <th scope="col" className="px-4 py-3">
                  Payment Status
                </th>
                <th scope="col" className="px-4 py-3">
                  Status
                </th>
                <th scope="col" className="px-4 py-3">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b border-slate-700">
                <td
                  scope="row"
                  className="px-4 py-2 font-medium whitespace-nowrap"
                >
                  321
                </td>
                <td
                  scope="row"
                  className="px-4 py-2 font-medium whitespace-nowrap"
                >
                  name
                </td>
                <td
                  scope="row"
                  className="px-4 py-2 font-medium whitespace-nowrap"
                >
                  email
                </td>
                <td
                  scope="row"
                  className="px-4 py-2 font-medium whitespace-nowrap"
                >
                  <span>payment</span>{" "}
                </td>

                <td
                  scope="row"
                  className="px-4 py-2 font-medium whitespace-nowrap"
                >
                  <span>status</span>{" "}
                </td>

                <td
                  scope="row"
                  className="px-4 py-2 font-medium whitespace-nowrap"
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
            showItem={3}
          />
        </div>
      </div>
    </div>
  );
};

export default SellerRequest;
