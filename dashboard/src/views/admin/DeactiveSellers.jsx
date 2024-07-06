import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { GetDeactiveSellers } from "../../store/Reducers/SellerReducer";

const DeactiveSellers = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  const [show, setShow] = useState(false);
  const { sellers, totalSeller } = useSelector((state) => state.seller);

  useEffect(() => {
    dispatch(
      GetDeactiveSellers({
        parPage: parseInt(parPage),
        searchValue,
        currentPage: parseInt(currentPage),
      })
    );
  }, [dispatch, parPage, searchValue, currentPage]);

  return (
    <div className="px-2 pt-5 lg:px-7">
      <h1 className="text-[20px] font-bold mb-3">Deactive Seller </h1>

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
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
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
              {sellers.map((seller, i) => (
                <tr key={i}>
                  <td className="px-4 py-1 font-medium whitespace-nowrap">
                    {i + 1}
                  </td>
                  <td className="px-4 py-1 font-medium whitespace-nowrap">
                    <img
                      className="w-[45px] h-[45px]"
                      src={seller?.image}
                      alt=""
                    />
                  </td>
                  <td className="px-4 py-1 font-medium whitespace-nowrap">
                    {seller?.name}{" "}
                  </td>
                  <td className="px-4 py-1 font-medium whitespace-nowrap">
                    {seller?.shopInfo?.shopName}
                  </td>
                  <td className="px-4 py-1 font-medium whitespace-nowrap">
                    <span>{seller?.payment}</span>{" "}
                  </td>
                  <td className="px-4 py-1 font-medium whitespace-nowrap">
                    {seller?.email}{" "}
                  </td>
                  <td className="px-4 py-1 font-medium whitespace-nowrap">
                    {seller?.status}{" "}
                  </td>
                  <td className="px-4 py-1 font-medium whitespace-nowrap">
                    {seller?.shopInfo?.district}{" "}
                  </td>

                  <td className="px-4 py-1 font-medium whitespace-nowrap">
                    <div className="flex items-center justify-start gap-4">
                      <Link
                        to={`/admin/dashboard/seller-details/${seller._id}`}
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

export default DeactiveSellers;
