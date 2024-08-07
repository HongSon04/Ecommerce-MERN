import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { GetProducts } from "../../store/Reducers/ProductReducer";
import { LuImageMinus } from "react-icons/lu";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);

  const dispatch = useDispatch();
  const { products, totalProduct } = useSelector((state) => state.product);
  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      currentPage: parseInt(currentPage),
      searchValue: searchValue,
    };
    dispatch(GetProducts(obj));
  }, [searchValue, currentPage, parPage]);

  return (
    <div className="px-2 pt-5 lg:px-7">
      <h1 className="text-[#000000] font-semibold text-lg mb-3">
        All Products
      </h1>

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
                  No
                </th>
                <th scope="col" className="px-4 py-3">
                  Image
                </th>
                <th scope="col" className="px-4 py-3">
                  Name
                </th>
                <th scope="col" className="px-4 py-3">
                  Category
                </th>
                <th scope="col" className="px-4 py-3">
                  Brand
                </th>
                <th scope="col" className="px-4 py-3">
                  Price
                </th>
                <th scope="col" className="px-4 py-3">
                  Discount
                </th>
                <th scope="col" className="px-4 py-3">
                  Stock
                </th>
                <th scope="col" className="px-4 py-3">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((product, i) => (
                <tr key={i}>
                  <td className="px-4 py-1 font-medium whitespace-nowrap">
                    {i + 1}
                  </td>
                  <td className="px-4 py-1 font-medium whitespace-nowrap">
                    <img
                      className="w-[45px] h-[45px]"
                      src={product?.images[0]}
                      alt=""
                    />
                  </td>
                  <td className="px-4 py-1 font-medium whitespace-nowrap">
                    {product?.name?.slice(0, 20)}...
                  </td>
                  <td className="px-4 py-1 font-medium whitespace-nowrap">
                    {product?.category}
                  </td>
                  <td className="px-4 py-1 font-medium whitespace-nowrap">
                    {product?.brand}
                  </td>
                  <td className="px-4 py-1 font-medium whitespace-nowrap">
                    ${product?.price}
                  </td>
                  <td className="px-4 py-1 font-medium whitespace-nowrap">
                    {product?.discount === 0
                      ? "No Discount"
                      : product?.discount}
                  </td>
                  <td className="px-4 py-1 font-medium whitespace-nowrap">
                    {product?.stock}
                  </td>

                  <td className="px-4 py-1 font-medium whitespace-nowrap">
                    <div className="flex items-center justify-start gap-4">
                      <Link
                        to={`/seller/dashboard/edit-product/${product?._id}`}
                        className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50"
                      >
                        {" "}
                        <FaEdit />{" "}
                      </Link>
                      <Link
                        to={`/seller/dashboard/add-banner/${product._id}`}
                        className="p-[6px] bg-sky-500 rounded hover:shadow-lg hover:shadow-yellow-500/50"
                      >
                        {" "}
                        <LuImageMinus />{" "}
                      </Link>
                      <Link className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50">
                        {" "}
                        <FaEye />{" "}
                      </Link>
                      <Link className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50">
                        {" "}
                        <FaTrash />{" "}
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalProduct <= parPage ? (
          ""
        ) : (
          <div className="flex justify-end w-full mt-4 bottom-4 right-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={50}
              parPage={parPage}
              showItem={3}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default Products;
