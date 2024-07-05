import React, { useEffect, useRef, useState } from "react";
import { AiOutlineMessage, AiOutlinePlus } from "react-icons/ai";
import { GrEmoji } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AddFriend,
  clearMessage,
  SendMessage,
  updateMessage,
} from "../../store/reducers/ChatReducer";
import { toast } from "react-hot-toast";
import { socket } from "../../utils/utils";
import ChangeLangue from "../../utils/ChangeLangue";
const Chat = () => {
  const { t } = ChangeLangue();
  const dispatch = useDispatch();
  const scrollRef = useRef();
  const { sellerId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const { fd_messages, currentFd, my_friends, successMessage } = useSelector(
    (state) => state.chat
  );
  const [text, setText] = useState("");
  const [receverMessage, setReceverMessage] = useState("");
  const [activeSeller, setActiveSeller] = useState([]);
  const send = (e) => {
    e.preventDefault();
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
  }, [userInfo]);
  useEffect(() => {
    dispatch(AddFriend({ sellerId: sellerId || "", userId: userInfo.id }));
  }, [dispatch, sellerId, userInfo.id]);

  useEffect(() => {
    socket.on("seller_message", (msg) => {
      setReceverMessage(msg);
    });
    socket.on("activeSeller", (sellers) => {
      setActiveSeller(sellers);
    });
  }, [setReceverMessage, setActiveSeller]);

  useEffect(() => {
    if (receverMessage) {
      if (
        sellerId === receverMessage.senderId &&
        userInfo.id === receverMessage.receverId
      ) {
        dispatch(updateMessage(receverMessage));
        toast.success(receverMessage.senderName + " was send message");
        dispatch(clearMessage());
      }
    }
  }, [dispatch, receverMessage, sellerId, userInfo.id]);

  useEffect(() => {
    if (successMessage) {
      socket.emit("send_customer_message", fd_messages[fd_messages.length - 1]);
      toast.success("Message Sent Successfully");
      dispatch(clearMessage());
    }
  }, [dispatch, successMessage, fd_messages]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [fd_messages]);
  return (
    <div className="p-3 bg-white rounded-md">
      <div className="flex w-full">
        <div className="w-[230px]">
          <div className="flex justify-center gap-3 items-center text-slate-600 text-xl h-[50px]">
            <span>
              <AiOutlineMessage />
            </span>
            <span>{t("dashboard.message1")}</span>
          </div>
          <div className="w-full flex flex-col text-slate-600 py-4 h-[400px] pr-3">
            {my_friends.map((fd, i) => (
              <Link
                key={i}
                to={`/dashboard/chat/${fd.fdId}`}
                className={`flex gap-2 justify-start items-center pl-2 py-[5px]`}
              >
                <div className="w-[30px] h-[30px] rounded-full relative">
                  {activeSeller.some(
                    (seller) => seller.sellerId === fd.fdId
                  ) ? (
                    <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0"></div>
                  ) : (
                    <div className="w-[10px] h-[10px] rounded-full bg-red-500 absolute right-0 bottom-0"></div>
                  )}

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
                  {activeSeller.some(
                    (seller) => seller.sellerId === currentFd.fdId
                  ) ? (
                    <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0"></div>
                  ) : (
                    <div className="w-[10px] h-[10px] rounded-full bg-red-500 absolute right-0 bottom-0"></div>
                  )}
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
                          ref={scrollRef}
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
                          ref={scrollRef}
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
              <form
                onSubmit={send}
                className="flex items-center justify-between w-full p-2"
              >
                <div className="w-[40px] h-[40px] border p-2 justify-center items-center flex rounded-full">
                  <label className="cursor-pointer" htmlFor="">
                    <AiOutlinePlus />
                  </label>
                  <input className="hidden" type="file" />
                </div>
                <div className="border h-[40px] p-0 ml-2 w-[calc(100%-90px)] rounded-full relative">
                  <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    type="text"
                    placeholder={t("dashboard.message1")}
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
              </form>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-full text-lg ont-bold text-slate-600">
              <span>{t("dashboard.select-seller")}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
