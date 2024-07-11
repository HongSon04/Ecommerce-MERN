import React, { useEffect } from "react";
import { MdCurrencyExchange, MdProductionQuantityLimits } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetAdminDashboardData } from "../../store/Reducers/DashboardReducer";
import sellerImage from "../../assets/seller.png";
import moment from "moment";
const AdminDashboard = () => {
  const dispatch = useDispatch();
  const state = {
    series: [
      {
        name: "Orders",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 100, 200, 150],
      },
      {
        name: "Revenue",
        data: [2, 5, 7, 8, 10, 15, 20, 25, 30, 35, 40, 45],
      },
      {
        name: "Sellers",
        data: [20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240],
      },
    ],
    options: {
      color: ["#181ee8", "#181ee8"],
      plotOptions: {
        radius: 30,
      },
      chart: {
        background: "transparent",
        foreColor: "#d0d2d6",
      },
      dataLabels: {
        enabled: false,
      },
      strock: {
        show: true,
        curve: ["smooth", "straight", "stepline"],
        lineCap: "butt",
        colors: "#f0f0f0",
        width: 0.5,
        dashArray: 0,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      legend: {
        position: "top",
      },
      responsive: [
        {
          breakpoint: 565,
          yaxis: {
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
          },
          options: {
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            chart: {
              height: 550,
            },
          },
        },
      ],
    },
  };
  const {
    loader,
    totalSale,
    totalOrder,
    totalProduct,
    totalSeller,
    recentOrders,
    recentMessage,
  } = useSelector((state) => state.dashboard);
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(GetAdminDashboardData());
  }, [dispatch]);
  return (
    <div className="px-2 py-5 md:px-7">
      {/* Dashboard */}
      <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
        {/* Items */}
        <div className="flex justify-between items-center p-5 bg-[#fae8e8] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <h2 className="text-3xl font-bold">${totalSale}</h2>
            <span className="font-medium text-md">Total Salse</span>
          </div>

          <div className="w-[40px] h-[47px] rounded-full bg-[#fa0305] flex justify-center items-center text-xl">
            <MdCurrencyExchange className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>
        {/* Items */}

        <div className="flex justify-between items-center p-5 bg-[#fde2ff] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <h2 className="text-3xl font-bold">{totalProduct}</h2>
            <span className="font-medium text-md">Products</span>
          </div>

          <div className="w-[40px] h-[47px] rounded-full bg-[#760077] flex justify-center items-center text-xl">
            <MdProductionQuantityLimits className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>
        {/* Items */}

        <div className="flex justify-between items-center p-5 bg-[#e9feea] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <h2 className="text-3xl font-bold">{totalSeller}</h2>
            <span className="font-medium text-md">Sellers</span>
          </div>

          <div className="w-[40px] h-[47px] rounded-full bg-[#038000] flex justify-center items-center text-xl">
            <FaUsers className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>
        {/* Items */}

        <div className="flex justify-between items-center p-5 bg-[#ecebff] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <h2 className="text-3xl font-bold">{totalOrder}</h2>
            <span className="font-medium text-md">Orders</span>
          </div>

          <div className="w-[40px] h-[47px] rounded-full bg-[#0200f8] flex justify-center items-center text-xl">
            <FaCartShopping className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>
      </div>
      {/* End Dashboard */}

      {/* Chart & Message */}
      <div className="flex flex-wrap w-full mt-7">
        {/* Chart */}
        <div className="w-full lg:w-7/12 lg:pr-3">
          <div className="w-full bg-[#6a5fdf] p-4 rounded">
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              height={350}
            />
          </div>
        </div>
        {/* End Chart */}

        {/* Message Seller */}
        <div className="w-full mt-6 lg:w-5/12 lg:pl-4 lg:mt-0">
          <div className="w-full bg-[#6a5fdf] p-4 rounded-md text-[#d0d2d6]">
            {/* Header Message Seller */}
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-lg text-[#d0d2d6] pb-3">
                Recent Seller Message
              </h2>
              <Link className="font-semibold text-sm text-[#d0d2d6]">
                View All
              </Link>
            </div>
            {/* Body Message Seller */}
            <div className="flex flex-col gap-2 pt-6 text-[#d0d2d6]">
              <ol className="relative ml-4 border-1 border-slate-600">
                {/* Item Message Seller */}
                {recentMessage?.map((item, i) => (
                  <li key={i} className="mb-3 ml-6">
                    {/* Avatar Seller */}
                    <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#4c7fe2] rounded-full z-10">
                      {item.senderId === userInfo?._id ? (
                        <img
                          className="w-full h-full rounded-full shadow-lg"
                          src={userInfo?.image}
                          alt=""
                        />
                      ) : (
                        <img
                          className="w-full h-full rounded-full shadow-lg"
                          src={sellerImage}
                          alt=""
                        />
                      )}
                    </div>
                    {/* Message Seller */}
                    <div className="p-3 border rounded-lg shadow-sm bg-slate-800 border-slate-600">
                      <div className="flex items-center justify-between mb-2">
                        <Link className="font-normal text-md">
                          {" "}
                          {item.senderName}
                        </Link>
                        <time className="mb-1 text-sm font-normal sm:order-last sm:mb-0">
                          {moment(item.createdAt).startOf("hour").fromNow()}
                        </time>
                      </div>
                      <div className="p-2 text-xs font-normal border rounded-lg bg-slate-700 border-slate-800">
                        {item.message}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
        {/* End Message Seller */}
      </div>
      {/* End Chart & Message */}
      {/* Table Recent Orders */}
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md mt-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg text-[#d0d2d6] pb-3">
            Recent Orders
          </h2>
          <Link className="font-semibold text-sm text-[#d0d2d6]">View All</Link>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-[#d0d2d6] text-left">
            <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
              <tr>
                <th className="px-4 py-3" scope="col">
                  Order ID
                </th>
                <th className="px-4 py-3" scope="col">
                  Price
                </th>
                <th className="px-4 py-3" scope="col">
                  Payment Status
                </th>
                <th className="px-4 py-3" scope="col">
                  Order Status
                </th>
                <th className="px-4 py-3" scope="col">
                  Active
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders?.map((item, id) => (
                <tr key={id}>
                  <td className="px-4 py-3 font-medium whitespace-nowrap">
                    #{item._id}
                  </td>
                  <td className="px-4 py-3 font-medium whitespace-nowrap">
                    ${item.totalPrice}
                  </td>
                  <td className="px-4 py-3 font-medium whitespace-nowrap">
                    {item.payment_status}
                  </td>
                  <td className="px-4 py-3 font-medium whitespace-nowrap">
                    {item.delivery_status}
                  </td>
                  <td className="px-4 py-3 font-medium whitespace-nowrap">
                    <Link to={`/admin/dashboard/order-details/${item._id}`}>
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* End Table Recent Orders */}
    </div>
  );
};

export default AdminDashboard;
