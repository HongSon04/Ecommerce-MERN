import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GetOrders } from "../../store/OrderReducer";

const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const { myOrders } = useSelector((state) => state.order);
  const [state, setState] = useState("all");

  const redirectPage = (order) => {
    let items = 0;
    order.products.forEach((product) => {
      items += product.quantity;
    });
    navigate(`/payment`, {
      state: {
        price: order.price,
        items,
        orderID: order._id,
      },
    });
  };

  useEffect(() => {
    dispatch(GetOrders({ status: state, customerId: userInfo.id }));
  }, [dispatch, orderId, state, userInfo]);

  return (
    <div className="p-4 bg-white rounded-md">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-600">My Orders </h2>
        <select
          className="px-3 py-1 border rounded-md outline-none text-slate-600"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="all">All</option>
          <option value="placed">Placed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
          <option value="warehouse">Warehouse</option>
        </select>
      </div>

      <div className="pt-4">
        <div className="relative overflow-x-auto rounded-md">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Order Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Payment Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Order Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {myOrders &&
                myOrders.map((order, i) => (
                  <tr className="bg-white border-b" key={i}>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap"
                    >
                      #{order._id.toUpperCase()}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap"
                    >
                      ${order.price}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap"
                    >
                      {order.payment_status.toUpperCase()}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap"
                    >
                      {order.delivery_status.toUpperCase()}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap"
                    >
                      <Link to={`/dashboard/order/details/${order._id}`}>
                        <span className="bg-green-200 text-green-800 text-md font-semibold mr-2 px-3 py-[2px] rounded">
                          View
                        </span>
                      </Link>

                      {order.payment_status !== "paid" && (
                        <span
                          onClick={() => redirectPage(order)}
                          className="bg-green-200 text-green-800 text-md font-semibold mr-2 px-3 py-[2px] rounded cursor-pointer"
                        >
                          Pay Now
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
