import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { FaE } from "react-icons/fa6";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import {
  categoryAdd,
  clearMessage,
  getCategory,
} from "../../store/Reducers/CategoryReducer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Search from "../components/Search";

const Category = () => {
  const dispatch = useDispatch();
  const { loader, errorMessage, successMessage, categories, totalCategory } =
    useSelector((state) => state.category);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  const [show, setShow] = useState(false);
  const [imageShow, setImageShow] = useState("");

  const [state, setState] = useState({
    name: "",
    image: "",
  });

  const imageHandle = (e) => {
    let files = e.target.files;
    if (files.length > 0) {
      setImageShow(URL.createObjectURL(files[0]));
      setState({
        ...state,
        image: files[0],
      });
    }
  };

  const addCategory = (e) => {
    e.preventDefault();
    dispatch(categoryAdd(state));
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
    if (successMessage) {
      toast.success(successMessage);
    }

    setState({
      name: "",
      image: "",
    });

    setImageShow("");

    dispatch(clearMessage());
  }, [errorMessage, successMessage, dispatch]);

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      currentPage: parseInt(currentPage),
      searchValue: searchValue,
    };
    dispatch(getCategory(obj));
  }, [searchValue, currentPage, parPage, dispatch]);

  return (
    <div className="px-2 pt-5 lg:px-7">
      <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-[#6a5fdf] rounded-md">
        <h1 className="text-[#d0d2d6] font-semibold text-lg">Category</h1>
        <button
          onClick={() => setShow(true)}
          className="px-4 py-2 text-sm text-white bg-red-500 rounded-sm shadow-lg cursor-pointer hover:shadow-red-500/40"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap w-full">
        <div className="w-full lg:w-7/12">
          <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
            <Search
              searchValue={searchValue}
              setParPage={setParPage}
              setSearchValue={setSearchValue}
            ></Search>
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
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, i) => (
                    <tr key={i}>
                      <td
                        scope="row"
                        className="px-4 py-1 font-medium whitespace-nowrap"
                      >
                        {category.name}
                      </td>
                      <td
                        scope="row"
                        className="px-4 py-1 font-medium whitespace-nowrap"
                      >
                        <img
                          className="w-[45px] h-[45px]"
                          src={category.image}
                          alt=""
                        />
                      </td>
                      <td
                        scope="row"
                        className="px-4 py-1 font-medium whitespace-nowrap"
                      >
                        Tshirt
                      </td>

                      <td
                        scope="row"
                        className="px-4 py-1 font-medium whitespace-nowrap"
                      >
                        <div className="flex items-center justify-start gap-4">
                          <Link className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50">
                            {" "}
                            <FaEdit />{" "}
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

        <div
          className={`w-[320px] lg:w-5/12 translate-x-100 lg:relative lg:right-0 fixed ${
            show ? "right-0" : "-right-[340px]"
          } z-[9999] top-0 transition-all duration-500 `}
        >
          <div className="w-full pl-5">
            <div className="bg-[#6a5fdf] h-screen lg:h-auto px-3 py-2 lg:rounded-md text-[#d0d2d6]">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-[#d0d2d6] font-semibold text-xl mb-4 w-full text-center ">
                  Add Category
                </h1>

                <div onClick={() => setShow(false)} className="block lg:hidden">
                  <IoMdCloseCircle />
                </div>
              </div>
              <form onSubmit={addCategory}>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="name"> Category Name</label>
                  <input
                    onChange={(e) =>
                      setState({ ...state, name: e.target.value })
                    }
                    value={state.name}
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                    type="text"
                    id="name"
                    name="category_name"
                    placeholder="Category Name"
                  />
                </div>

                <div>
                  <label
                    className="flex justify-center items-center flex-col h-[238px] cursor-pointer border border-dashed hover:border-red-500 w-full border-[#d0d2d6]"
                    htmlFor="image"
                  >
                    {imageShow ? (
                      <img className="w-full h-full" src={imageShow} alt="" />
                    ) : (
                      <>
                        {" "}
                        <span>
                          <FaImage />{" "}
                        </span>
                        <span>Select Image</span>
                      </>
                    )}
                  </label>
                  <input
                    onChange={imageHandle}
                    className="hidden"
                    type="file"
                    name="image"
                    id="image"
                  />
                  <div className="mt-4">
                    {/* Button */}
                    <button
                      disabled={loader}
                      className="w-full py-2 mb-3 text-white rounded-md bg-slate-800 hover:shadow-blue-300 hover:shadow-lg px-7"
                    >
                      {loader ? (
                        <PropagateLoader
                          cssOverride={overrideStyle}
                          color="#ffffff"
                        />
                      ) : (
                        "Add Category"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Category;
