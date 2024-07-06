import React, { useEffect, useRef, useState } from "react";
import { FaList, FaRegFaceGrinHearts } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMessage,
  GetAdminMessage,
  GetSellers,
  SendMessageSellerAdmin,
  updateSellerMessage,
} from "../../store/ChatReducer";
import { useParams } from "react-router";
import { socket } from "../../utils/utils";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
const ChatSeller = () => {
  const scrollRef = useRef();
  const [show, setShow] = useState(false);
  const { sellerId } = useParams();
  const dispatch = useDispatch();
  const {
    sellers,
    activeSeller,
    seller_admin_messages,
    currentSeller,
    successMessage,
  } = useSelector((state) => state.chat);
  const [text, setText] = useState("");
  const [receverMessage, setReceverMessage] = useState("");
  const send = (e) => {
    e.preventDefault();
    if (text) {
      dispatch(
        SendMessageSellerAdmin({
          senderId: "",
          receverId: sellerId,
          message: text,
          senderName: "Admin Support",
        })
      );
      setText("");
    }
  };
  useEffect(() => {
    if (sellerId) {
      dispatch(GetAdminMessage(sellerId));
    }
  }, [dispatch, sellerId]);

  useEffect(() => {
    dispatch(GetSellers());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      socket.emit(
        "send_msg_admin_to_seller",
        seller_admin_messages[seller_admin_messages.length - 1]
      );
      dispatch(clearMessage());
    }
  }, [successMessage, dispatch, seller_admin_messages]);

  useEffect(() => {
    socket.on("recever_admin_message", (msg) => {
      setReceverMessage(msg);
    });
  }, [dispatch, seller_admin_messages]);

  useEffect(() => {
    if (receverMessage) {
      if (
        receverMessage.senderId === sellerId &&
        receverMessage.receverId === ""
      ) {
        dispatch(updateSellerMessage(receverMessage));
      } else {
        toast.success(receverMessage.senderName + " " + "Send A message");
        dispatch(clearMessage());
      }
    }
  }, [receverMessage, dispatch, sellerId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [seller_admin_messages]);
  return (
    <div className="px-2 py-5 lg:px-7">
      <div className="w-full bg-[#6a5fdf] px-4 py-4 rounded-md h-[calc(100vh-140px)]">
        <div className="relative flex w-full h-full">
          <div
            className={`w-[280px] h-full absolute z-10 ${
              show ? "-left-[16px]" : "-left-[336px]"
            } md:left-0 md:relative transition-all `}
          >
            <div className="w-full h-[calc(100vh-177px)] bg-[#9e97e9] md:bg-transparent overflow-y-auto">
              <div className="flex items-center justify-between p-4 text-xl text-white md:p-0 md:px-3 md:pb-3">
                <h2>Sellers</h2>
                <span
                  onClick={() => setShow(!show)}
                  className="block cursor-pointer md:hidden"
                >
                  <IoMdClose />{" "}
                </span>
              </div>
              {sellers.map((seller, i) => (
                <Link
                  to={`/admin/dashboard/chat-seller/${seller._id}`}
                  key={i}
                  className={`h-[60px] flex justify-start gap-2 items-center text-white px-2 py-2 rounded-md cursor-pointer ${
                    sellerId === seller._id ? "bg-[#8288ed]" : ""
                  }`}
                >
                  <div className="relative">
                    <img
                      className="w-[38px] h-[38px] border-white border-2 max-w-[38px] p-[2px] rounded-full"
                      src={
                        seller.image || `http://localhost:3001/images/demo.jpg`
                      }
                      alt=""
                    />
                    {activeSeller.some((s) => s.sellerId === seller._id) ? (
                      <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                    ) : (
                      <div className="w-[10px] h-[10px] bg-red-500 rounded-full absolute right-0 bottom-0"></div>
                    )}
                  </div>
                  <div className="flex flex-col items-start justify-center w-full">
                    <div className="flex items-center justify-between w-full">
                      <h2 className="text-base font-semibold">{seller.name}</h2>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="w-full md:w-[calc(100%-200px)] md:pl-4">
            <div className="flex items-center justify-between">
              {sellerId && (
                <div className="flex items-center justify-start gap-3">
                  {activeSeller.some(
                    (s) => s.sellerId === currentSeller?._id
                  ) ? (
                    <div className="relative">
                      <img
                        className="w-[45px] h-[45px] border-green-500 border-2 max-w-[45px] p-[2px] rounded-full"
                        src={
                          currentSeller?.image ||
                          `http://localhost:3001/images/demo.jpg`
                        }
                        alt=""
                      />
                      <span className="w-[10px] h-[10px] absolute bottom-0 right-0 bg-green-500 rounded-full "></span>
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        className="w-[45px] h-[45px] border-red-500 border-2 max-w-[45px] p-[2px] rounded-full"
                        src={
                          currentSeller?.image ||
                          `http://localhost:3001/images/demo.jpg`
                        }
                        alt=""
                      />
                      <span className="w-[10px] h-[10px] absolute bottom-0 right-0 bg-red-500 rounded-full "></span>
                    </div>
                  )}

                  <span className="text-white ">{currentSeller?.name}</span>
                </div>
              )}
              <div
                onClick={() => setShow(!show)}
                className="w-[35px] flex md:hidden h-[35px] rounded-sm bg-blue-500 shadow-lg hover:shadow-blue-500/50 justify-center cursor-pointer items-center text-white"
              >
                <span>
                  <FaList />{" "}
                </span>
              </div>
            </div>

            <div className="py-4">
              <div className="bg-[#475569] h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto">
                {sellerId ? (
                  seller_admin_messages.map((msg, i) => {
                    if (msg.senderId === sellerId) {
                      return (
                        <div
                          key={i}
                          ref={scrollRef}
                          className="flex items-center justify-start w-full"
                        >
                          <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                            <div>
                              <img
                                className="w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]"
                                src="http://localhost:3001/images/demo.jpg"
                                alt=""
                              />
                            </div>
                            <div className="flex flex-col items-start justify-center w-full px-2 py-1 text-white bg-blue-500 rounded-sm shadow-lg shadow-blue-500/50">
                              <span>{msg.message} </span>
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={i}
                          ref={scrollRef}
                          className="flex items-center justify-end w-full"
                        >
                          <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                            <div className="flex flex-col items-start justify-center w-full px-2 py-1 text-white bg-red-500 rounded-sm shadow-lg shadow-red-500/50">
                              <span>{msg.message} </span>
                            </div>
                            <div>
                              <img
                                className="w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]"
                                src="http://localhost:3001/images/admin.jpg"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-full gap-2 text-white">
                    <span>
                      <FaRegFaceGrinHearts />
                    </span>
                    <span>Select Seller</span>
                  </div>
                )}
              </div>
            </div>
            <form onSubmit={send} className="flex gap-3">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                readOnly={sellerId ? false : true}
                className="w-full flex justify-between px-2 border border-slate-700 items-center py-[5px] focus:border-blue-500 rounded-md outline-none bg-transparent text-[#d0d2d6]"
                type="text"
                placeholder="Input Your Message"
              />
              <button
                disabled={sellerId ? false : true}
                className="shadow-lg bg-[#06b6d4] hover:shadow-cyan-500/50 text-semibold w-[75px] h-[35px] rounded-md text-white flex justify-center items-center"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatSeller;
