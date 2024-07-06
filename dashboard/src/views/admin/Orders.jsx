import React, { useEffect, useState } from "react";
import { LuArrowDownSquare } from "react-icons/lu";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { useDispatch, useSelector } from "react-redux";
import { GetAdminOrders } from "../../store/Reducers/OrderReducer";
const Orders = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  const [show, setShow] = useState(false);
  const { orders, totalOrder } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(
      GetAdminOrders({
        parPage: parseInt(parPage),
        searchValue,
        currentPage: parseInt(currentPage),
      })
    );
  }, [dispatch, parPage, searchValue, currentPage]);
  return (
    <div className="px-2 pt-5 lg:px-7">
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
        <div className="flex items-center justify-between">
          <select
            onChange={(e) => setParPage(parseInt(e.target.value))}
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
            type="text"
            placeholder="search"
          />
        </div>
        <div className="relative mt-5 overflow-x-auto">
          <div className="w-full text-sm text-left [#d0d2d6]">
            <div className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
              <div className="flex items-center justify-between ">
                <div className="py-3 w-[25%] font-bold">Order id</div>
                <div className="py-3 w-[13%] font-bold">Price</div>
                <div className="py-3 w-[18%] font-bold">Payment Status</div>
                <div className="py-3 w-[18%] font-bold">Order Status</div>
                <div className="py-3 w-[18%] font-bold">Action </div>
                <div className="py-3 w-[8%] font-bold">
                  <LuArrowDownSquare />
                </div>
              </div>
            </div>
            {orders.map((order, i) => (
              <div className="text-[#d0d2d6] ">
                <div className="flex items-start justify-between border-b border-slate-700">
                  <div className="py-3 w-[25%] font-medium whitespace-nowrap">
                    #{order?._id?.slice(0, 15)}...
                  </div>
                  <div className="py-3 w-[13%] font-medium">${order.price}</div>
                  <div className="py-3 w-[18%] font-medium">
                    {order.payment_status}
                  </div>
                  <div className="py-3 w-[18%] font-medium">
                    {order.delivery_status}
                  </div>
                  <div className="py-3 w-[18%] font-medium">
                    <Link to={`/admin/dashboard/order-details/${order._id}`}>
                      View
                    </Link>
                  </div>
                  <div
                    onClick={(e) => setShow(order._id)}
                    className="py-3 w-[8%] font-medium"
                  >
                    <LuArrowDownSquare />
                  </div>
                </div>
                <div
                  className={
                    show === order._id
                      ? "block border-b border-slate-700 bg-[#8288ed]"
                      : "hidden"
                  }
                >
                  {order.subOrders.map((subOrder, i) => (
                    <div className="flex items-start justify-start border-b border-slate-700">
                      <div className="py-3 w-[25%] font-medium whitespace-nowrap pl-3">
                        #{subOrder._id.slice(0, 15)}...
                      </div>
                      <div className="py-3 w-[13%] font-medium">
                        ${subOrder.price}
                      </div>
                      <div className="py-3 w-[18%] font-medium">
                        {subOrder.payment_status}
                      </div>
                      <div className="py-3 w-[18%] font-medium">
                        {subOrder.delivery_status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {totalOrder < parPage && (
          <div className="flex justify-end w-full mt-4 bottom-4 right-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalOrder}
              parPage={parPage}
              showItem={3}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default Orders;
