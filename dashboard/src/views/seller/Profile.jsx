import React, { useEffect, useState } from "react";
import { FaImages } from "react-icons/fa6";
import { FadeLoader } from "react-spinners";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import toast from "react-hot-toast";
import {
  clearMessage,
  ProfileInfoAdd,
  ProfileUploadImage,
} from "../../store/Reducers/AuthReducer";
const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo, loader, errorMessage, successMessage } = useSelector(
    (state) => state.auth
  );

  const [state, setState] = useState({
    division: "",
    district: "",
    shopName: "",
    sub_district: "",
  });

  const addImage = (e) => {
    if (e.target.files.length > 0) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      dispatch(ProfileUploadImage(formData));
    }
  };

  const inputHandle = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const addProfile = (e) => {
    e.preventDefault();
    dispatch(ProfileInfoAdd(state));
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
    if (successMessage) {
      toast.success(successMessage);
    }

    dispatch(clearMessage());
  }, [errorMessage, successMessage, dispatch]);

  return (
    <div className="px-2 py-5 lg:px-7">
      <div className="flex flex-wrap w-full">
        <div className="w-full md:w-6/12">
          <div className="w-full p-4 bg-[#6a5fdf] rounded-md text-[#d0d2d6]">
            <div className="flex items-center justify-center py-3">
              {userInfo.image ? (
                <label
                  htmlFor="img"
                  className="h-[150px] w-[200px] relative p-3 cursor-pointer overflow-hidden"
                >
                  <img src={userInfo.image} alt="" />
                  {loader && (
                    <div className="absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full bg-slate-600 opacity-70">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              ) : (
                <label
                  className="flex justify-center items-center flex-col h-[150px] w-[200px] cursor-pointer border border-dashed hover:border-red-500 border-[#d0d2d6] relative"
                  htmlFor="img"
                >
                  <span>
                    <FaImages />{" "}
                  </span>
                  <span>Select Image</span>
                  {loader && (
                    <div className="absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full bg-slate-600 opacity-70">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              )}
              <input
                onChange={addImage}
                type="file"
                className="hidden"
                id="img"
              />
            </div>
            <div className="px-0 py-2 md:px-5">
              <div className="relative flex flex-col justify-between gap-2 p-4 text-sm rounded-md bg-slate-800">
                <span className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer">
                  <FaRegEdit />{" "}
                </span>
                <div className="flex gap-2">
                  <span>Name : </span>
                  <span>{userInfo.name}</span>
                </div>
                <div className="flex gap-2">
                  <span>Email : </span>
                  <span>{userInfo.email}</span>
                </div>
                <div className="flex gap-2">
                  <span>Role : </span>
                  <span>{userInfo.role}</span>
                </div>
                <div className="flex gap-2">
                  <span>Status : </span>
                  <span>{userInfo.status}</span>
                </div>
                <div className="flex gap-2">
                  <span>Payment Account : </span>
                  <p>
                    {userInfo.status === "active" ? (
                      <span className="bg-green-500 text-white text-xs cursor-pointer font-normal ml-2 px-2 py-0.5 rounded">
                        Active
                      </span>
                    ) : (
                      <span className="bg-blue-500 text-white text-xs cursor-pointer font-normal ml-2 px-2 py-0.5 rounded">
                        Click Active
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-0 py-2 md:px-5">
              {!userInfo?.shopInfo ? (
                <form onSubmit={addProfile}>
                  <div className="flex flex-col w-full gap-1 mb-2">
                    <label htmlFor="shopName">Shop Name</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                      type="text"
                      name="shopName"
                      onChange={inputHandle}
                      value={state.shopName}
                      id="shopName"
                      placeholder="Shop Name"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1 mb-2">
                    <label htmlFor="division">Division Name</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                      type="text"
                      name="division"
                      onChange={inputHandle}
                      value={state.division}
                      id="division"
                      placeholder="Division Name"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1 mb-2">
                    <label htmlFor="district">District Name</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                      type="text"
                      name="district"
                      onChange={inputHandle}
                      value={state.district}
                      id="district"
                      placeholder="District Name"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1 mb-2">
                    <label htmlFor="sub_district">Sub District Name</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                      type="text"
                      name="sub_district"
                      onChange={inputHandle}
                      value={state.sub_district}
                      id="sub_district"
                      placeholder="Sub District Name"
                    />
                  </div>

                  <div className="flex">
                    <button
                      disabled={loader ? true : false}
                      className="bg-red-500 w-[280px] hover:shadow-red-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
                    >
                      {loader ? (
                        <PropagateLoader
                          color="#fff"
                          cssOverride={overrideStyle}
                        />
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="relative flex flex-col justify-between gap-2 p-4 text-sm rounded-md bg-slate-800">
                  <span className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer">
                    <FaRegEdit />{" "}
                  </span>
                  <div className="flex gap-2">
                    <span>Shop Name : </span>
                    <span>{userInfo?.shopInfo?.shopName}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>Divission : </span>
                    <span>{userInfo?.shopInfo?.divission}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>District : </span>
                    <span>{userInfo?.shopInfo?.district}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>Sub District : </span>
                    <span>{userInfo?.shopInfo?.sub_district}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full md:w-6/12">
          <div className="w-full pl-0 mt-6 md:pl-7 md:mt-0">
            <div className="bg-[#6a5fdf] rounded-md text-[#d0d2d6] p-4">
              <h1 className="text-[#d0d2d6] text-lg mb-3 font-semibold">
                Change Password
              </h1>
              <form>
                <div className="flex flex-col w-full gap-1 mb-2">
                  <label htmlFor="email">Email</label>
                  <input
                    className="px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="email"
                  />
                </div>

                <div className="flex flex-col w-full gap-1 mb-2">
                  <label htmlFor="o_password">Old Password</label>
                  <input
                    className="px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                    type="password"
                    name="old_password"
                    id="o_password"
                    placeholder="Old Password"
                  />
                </div>

                <div className="flex flex-col w-full gap-1 mb-2">
                  <label htmlFor="n_password">New Password</label>
                  <input
                    className="px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                    type="password"
                    name="new_password"
                    id="n_password"
                    placeholder="New Password"
                  />
                </div>

                <div className="flex">
                  <button
                    disabled={loader ? true : false}
                    className="bg-red-500 w-[280px] hover:shadow-red-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
                  >
                    {loader ? (
                      <PropagateLoader
                        color="#fff"
                        cssOverride={overrideStyle}
                      />
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
