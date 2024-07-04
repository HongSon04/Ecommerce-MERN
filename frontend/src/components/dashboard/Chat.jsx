import React, { useEffect, useState } from "react";
import { AiOutlineMessage, AiOutlinePlus } from "react-icons/ai";
import { GrEmoji } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { AddFriend, SendMessage } from "../../store/reducers/ChatReducer";
const socket = io("http://localhost:5000");
const Chat = () => {
  const dispatch = useDispatch();
  const { sellerId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const { fd_messages, currentFd, my_friends, successMessage } = useSelector(
    (state) => state.chat
  );
  const [text, setText] = useState("");

  const send = () => {
    if (text) {
      dispatch(
        SendMessage({
          sellerId,
          userId: userInfo.id,
          text,
          name: userInfo.name,
        })
      );
      setText("");
    }
  };

  useEffect(() => {
    socket.emit("add_user", userInfo.id, userInfo);
  });
  useEffect(() => {
    dispatch(AddFriend({ sellerId: sellerId || "", userId: userInfo.id }));
  }, [dispatch, sellerId, userInfo.id]);
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
            {my_friends.map((fd, i) => (
              <Link
                key={i}
                to={`/dashboard/chat/${fd.fdId}`}
                className={`flex gap-2 justify-start items-center pl-2 py-[5px]`}
              >
                <div className="w-[30px] h-[30px] rounded-full relative">
                  <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0"></div>

                  <img src={fd.image} alt="" />
                </div>
                <span>{fd.name}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-[calc(100%-230px)]">
          {currentFd ? (
            <div className="w-full h-full">
              <div className="flex justify-start gap-3 items-center text-slate-600 text-xl h-[50px]">
                <div className="w-[30px] h-[30px] rounded-full relative">
                  <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0"></div>

                  <img src={currentFd.image} alt="" />
                </div>
                <span>{currentFd.name}</span>
              </div>
              <div className="h-[400px] w-full bg-slate-100 p-3 rounded-md">
                <div className="flex flex-col w-full h-full gap-3 overflow-y-auto">
                  {fd_messages.map((msg, i) => {
                    if (currentFd.fdId !== msg.receverId) {
                      return (
                        <div
                          key={i}
                          className="w-full flex gap-2 justify-start items-center text-[14px]"
                        >
                          <img
                            className="w-[30px] h-[30px] "
                            src={currentFd.image}
                            alt=""
                          />
                          <div className="p-2 text-white bg-purple-500 rounded-md">
                            <span>{msg.message}</span>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={i}
                          className="w-full flex gap-2 justify-end items-center text-[14px]"
                        >
                          <img
                            className="w-[30px] h-[30px] "
                            src="http://localhost:3000/images/user.png"
                            alt=""
                          />
                          <div className="p-2 text-white rounded-md bg-cyan-500">
                            <span>{msg.message}</span>
                          </div>
                        </div>
                      );
                    }
                  })}
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
                    value={text}
                    onChange={(e) => setText(e.target.value.trim())}
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
                  <div onClick={send} className="text-2xl cursor-pointer">
                    <IoSend />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-full text-lg ont-bold text-slate-600">
              <span>Select Seller</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
