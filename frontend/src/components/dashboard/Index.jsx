import React, { useEffect } from "react";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetDashboardIndexData } from "../../store/DashboardReducer";
const Index = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { totalOrder, pendingOrder, cancelledOrder, recentOrders } =
    useSelector((state) => state.dashboard);

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
    dispatch(GetDashboardIndexData(userInfo.id));
  }, [dispatch, userInfo]);

  return (
    <div>
      <div className="grid grid-cols-3 gap-5 md:grid-cols-1">
        <div className="flex items-center justify-center gap-5 p-5 bg-white rounded-md">
          <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <span className="text-xl text-green-800">
              <RiShoppingCart2Fill />
            </span>
          </div>
          <div className="flex flex-col items-start justify-start text-slate-600">
            <h2 className="text-3xl font-bold">{totalOrder}</h2>
            <span>Orders </span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-5 p-5 bg-white rounded-md">
          <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <span className="text-xl text-green-800">
              <RiShoppingCart2Fill />
            </span>
          </div>
          <div className="flex flex-col items-start justify-start text-slate-600">
            <h2 className="text-3xl font-bold">{pendingOrder}</h2>
            <span>Pending Orders </span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-5 p-5 bg-white rounded-md">
          <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <span className="text-xl text-green-800">
              <RiShoppingCart2Fill />
            </span>
          </div>
          <div className="flex flex-col items-start justify-start text-slate-600">
            <h2 className="text-3xl font-bold">{cancelledOrder}</h2>
            <span>Cancelled Orders </span>
          </div>
        </div>
      </div>
      <div className="p-5 mt-5 bg-white rounded-md">
        <h2>Recent Orders</h2>
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
                {recentOrders.map((order, i) => (
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
    </div>
  );
};
export default Index;
