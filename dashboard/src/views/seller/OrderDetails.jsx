import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  get_seller_order,
  messageClear,
  seller_order_status_update,
} from "../../store/Reducers/OrderReducer";
import toast from "react-hot-toast";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [status, setStatus] = useState("");

  return (
    <div className="px-2 pt-5 lg:px-7">
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl text-[#d0d2d6]">Order Details</h2>
          <select
            name=""
            id=""
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#475569] border border-slate-700 rounded-md text-[#d0d2d6]"
          >
            <option value="pending">pending</option>
            <option value="processing">processing</option>
            <option value="warehouse">warehouse</option>
            <option value="placed">placed</option>
            <option value="cancelled">cancelled</option>
          </select>
        </div>

        <div className="p-4">
          <div className="flex gap-2 text-lg text-[#d0d2d6]">
            <h2>#order._id</h2>
            <span>order.date</span>
          </div>

          <div className="flex flex-wrap">
            <div className="w-[30%]">
              <div className="pr-3 text-[#d0d2d6] text-lg">
                <div className="flex flex-col gap-1">
                  <h2 className="pb-2 font-semibold">
                    Deliver To : order.shippingInfo
                  </h2>
                </div>
                <div className="flex items-center justify-start gap-3">
                  <h2>Payment Status: </h2>
                  <span className="text-base">order.payment_status</span>
                </div>
                <span>Price : $order.price</span>
                {/* Items */}
                <div className="mt-4 flex flex-col gap-4 bg-[#8288ed] rounded-md">
                  <div className="text-[#d0d2d6]">
                    <div className="flex gap-3 text-md">
                      <img className="w-[50px] h-[50px]" alt="" />

                      <div>
                        <h2>p.name</h2>
                        <p>
                          <span>Brand : </span>
                          <span>p.brand</span>
                          <span className="text-lg">Quantity : p.quantity</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Items */}

                <div className="mt-4 flex flex-col gap-4 bg-[#8288ed] rounded-md">
                  <div className="text-[#d0d2d6]">
                    <div className="flex gap-3 text-md">
                      <img className="w-[50px] h-[50px]" alt="" />

                      <div>
                        <h2>p.name</h2>
                        <p>
                          <span>Brand : </span>
                          <span>p.brand</span>
                          <span className="text-lg">Quantity : p.quantity</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
