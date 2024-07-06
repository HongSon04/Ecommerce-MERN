import React from "react";
import { FaList } from "react-icons/fa";
import { useSelector } from "react-redux";

const Header = ({ showSidebar, setShowSidebar }) => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="fixed top-0 left-0 z-40 w-full px-2 py-5 lg:px-7">
      <div className="ml-0 lg:ml-[260px] rounded-md h-[65px] flex justify-between items-center bg-[#b1addf] px-5 transition-all content-center">
        {/* Icon Menu */}
        <div
          onClick={() => setShowSidebar(!showSidebar)}
          className="w-[35px] flex lg:hidden h-[35px] rounded-sm shadow-indigo-500 shadow-lg hover:shadow-indigo-500/50 justify-center items-center cursor-pointer"
        >
          <span>
            <FaList />
          </span>
        </div>
        {/* Seach */}
        <div className="hidden md:block">
          <input
            className="px-3 py-2 outline-none border bg-transparent border-slate-700 rounded-md text-[#423d72] focus:border-indigo-500 overflow-hidden"
            type="text"
            name="search"
            placeholder="Search..."
          />
        </div>

        <div className="relative flex items-center justify-center gap-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center gap-3">
              <div className="flex flex-col items-center justify-center text-end">
                <h2 className="font-bold text-md">{userInfo.name}</h2>
                <span className={`text-[14px] w-full font-bold uppercase ${userInfo.role === "admin" ? "text-red-500" : "text-blue-500"}`}>
                  {userInfo?.role?.toUpperCase()}
                </span>
              </div>
              {userInfo.role === "admin" ? (
                <img
                  className="w-[45px] h-[45px] rounded-full object-cover"
                  src="http://localhost:3001/images/admin.jpg"
                  alt=""
                />
              ) : (
                <img
                  className="w-[45px] h-[45px] rounded-full object-cover"
                  src={userInfo?.image}
                  alt=""
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
