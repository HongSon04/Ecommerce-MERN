import React from "react";
import { AiOutlineMessage, AiOutlinePlus } from "react-icons/ai";
import { GrEmoji } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { Link } from "react-router-dom";

const Chat = () => {
  return (
    <div className="p-3 bg-white rounded-md">
      <div className="flex w-full">
        <div className="w-[230px]">
          <div className="flex justify-center gap-3 items-center text-slate-600 text-xl h-[50px]">
            <span>
              <AiOutlineMessage />
            </span>
            <span>Message</span>
          </div>
          <div className="w-full flex flex-col text-slate-600 py-4 h-[400px] pr-3">
            <Link
              to="#"
              className={`flex gap-2 justify-start items-center pl-2 py-[5px]`}
            >
              <div className="w-[30px] h-[30px] rounded-full relative">
                <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0"></div>

                <img src="http://localhost:3000/images/user.png" alt="" />
              </div>
              <span>asdfsd</span>
            </Link>
          </div>
        </div>
        <div className="w-[calc(100%-230px)]">
          <div className="w-full h-full">
            <div className="flex justify-start gap-3 items-center text-slate-600 text-xl h-[50px]">
              <div className="w-[30px] h-[30px] rounded-full relative">
                <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0"></div>

                <img src="http://localhost:3000/images/user.png" alt="" />
              </div>
              <span>ewewewe</span>
            </div>
            <div className="h-[400px] w-full bg-slate-100 p-3 rounded-md">
              <div className="flex flex-col w-full h-full gap-3 overflow-y-auto">
                <div className="w-full flex gap-2 justify-start items-center text-[14px]">
                  <img
                    className="w-[30px] h-[30px] "
                    src="http://localhost:3000/images/user.png"
                    alt=""
                  />
                  <div className="p-2 text-white bg-purple-500 rounded-md">
                    <span>weewewewewewewe</span>
                  </div>
                </div>
                <div className="w-full flex gap-2 justify-end items-center text-[14px]">
                  <img
                    className="w-[30px] h-[30px] "
                    src="http://localhost:3000/images/user.png"
                    alt=""
                  />
                  <div className="p-2 text-white rounded-md bg-cyan-500">
                    <span>ewwwwwwwww</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between w-full p-2">
              <div className="w-[40px] h-[40px] border p-2 justify-center items-center flex rounded-full">
                <label className="cursor-pointer" htmlFor="">
                  <AiOutlinePlus />
                </label>
                <input className="hidden" type="file" />
              </div>
              <div className="border h-[40px] p-0 ml-2 w-[calc(100%-90px)] rounded-full relative">
                <input
                  type="text"
                  placeholder="input message"
                  className="w-full h-full p-3 rounded-full outline-none"
                />
                <div className="absolute text-2xl cursor-auto right-2 top-2">
                  <span>
                    <GrEmoji />
                  </span>
                </div>
              </div>
              <div className="w-[40px] p-2 justify-center items-center rounded-full">
                <div className="text-2xl cursor-pointer">
                  <IoSend />
                </div>
              </div>
            </div>
          </div>{" "}
          :{" "}
          <div className="flex items-center justify-center w-full h-full text-lg ont-bold text-slate-600">
            <span>select seller</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
