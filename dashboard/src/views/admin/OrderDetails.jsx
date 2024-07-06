import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  AdminOrderStatusUpdate,
  clearMessage,
  GetAdminOrder,
} from "../../store/Reducers/OrderReducer";
import { toast } from "react-hot-toast";
const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { myOrder, successMessage, errorMessage } = useSelector(
    (state) => state.order
  );
  const [status, setStatus] = useState("");
  useEffect(() => {
    dispatch(GetAdminOrder(orderId));
  }, [dispatch, orderId]);

  const statusUpdate = (e) => {
    setStatus(e.target.value);
    dispatch(
      AdminOrderStatusUpdate({
        orderId,
        info: { status: e.target.value },
      })
    );
  };

  useEffect(() => {
    setStatus(myOrder?.delivery_status);
  }, [myOrder.delivery_status]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
    if (errorMessage) {
      toast.error(errorMessage);
    }
    dispatch(clearMessage());
  }, [successMessage, errorMessage, dispatch]);
  return (
    <div className="px-2 pt-5 lg:px-7">
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl text-[#d0d2d6]">Order Details</h2>
          <select
            onChange={statusUpdate}
            value={status}
            name=""
            id=""
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#475569] border border-slate-700 rounded-md text-[#d0d2d6]"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="warehouse">Warehouse</option>
            <option value="placed">Placed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div className="p-4">
          <div className="flex gap-2 text-lg text-[#d0d2d6]">
            <h2>#{myOrder?._id?.toUpperCase()}</h2>
            <span>{myOrder?.date}</span>
          </div>

          <div className="flex flex-wrap">
            <div className="w-[30%]">
              <div className="pr-3 text-[#d0d2d6] text-lg">
                <div className="flex flex-col gap-1">
                  <h2 className="pb-2 font-semibold">
                    Deliver To : {myOrder?.shippingInfo?.name}{" "}
                  </h2>
                  <p>
                    <span className="text-sm">
                      {myOrder?.shippingInfo?.address},{" "}
                      {myOrder?.shippingInfo?.province},{" "}
                      {myOrder?.shippingInfo?.city}{" "}
                    </span>
                  </p>
                </div>
                <div className="flex items-center justify-start gap-3">
                  <h2>Payment Status: </h2>
                  <span className="text-base">
                    {myOrder?.payment_status?.toUpperCase()}
                  </span>
                </div>
                <span>Price : ${myOrder?.price}</span>

                {myOrder?.products?.map((product, i) => (
                  <div
                    key={i}
                    className="mt-4 flex flex-col gap-4 bg-[#8288ed] rounded-md"
                  >
                    <div className="text-[#d0d2d6]">
                      <div className="flex gap-3 text-md">
                        <img
                          className="w-[50px] h-[50px]"
                          src={product?.images[0]}
                          alt=""
                        />
                        <div>
                          <h2>{product?.name.slice(0, 35)}... </h2>
                          <p>
                            <span>Brand : {product?.brand} </span>
                            <span className="text-lg">
                              Quantity : {product?.quantity}{" "}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[70%]">
              <div className="pl-3">
                <div className="mt-4 flex flex-col bg-[#8288ed] rounded-md p-4">
                  {myOrder?.subOrders?.map((order, j) => (
                    <div key={j} className="text-[#d0d2d6] mt-2">
                      <div className="flex items-center justify-start gap-3">
                        <h2>Seller {j + 1} Order : </h2>
                        <span>{order.delivery_status}</span>
                      </div>
                      {order.products?.map((product, k) => (
                        <div key={k} className="flex gap-3 mt-2 text-md">
                          <img
                            className="w-[50px] h-[50px]"
                            src={product.images[0]}
                            alt=""
                          />
                          <div>
                            <h2>{product.name} </h2>
                            <p>
                              <span>Brand :{product.brand} </span>
                              <span className="text-lg">
                                Quantity : {product.quantity}{" "}
                              </span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
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
