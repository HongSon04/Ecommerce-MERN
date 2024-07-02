import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { GetOrderDetails } from "../../store/OrderReducer";

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { myOrder } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(GetOrderDetails(orderId));
  }, [dispatch, orderId]);
  return (
    <div className="p-5 bg-white">
      <h2 className="font-semibold text-slate-600">
        #{myOrder?._id?.toUpperCase()} , <span className="pl-1">{myOrder.date}</span>{" "}
      </h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="font-sans font-semibold text-slate-600">
            Deliver To : <strong>{myOrder.shippingInfo?.name}</strong>{" "}
          </h2>
          <p>
            <span className="px-2 py-2 mr-2 text-xs font-medium text-blue-800 bg-blue-100 rounded">
              Home
            </span>
            <span className="text-sm text-slate-600">
              {myOrder.shippingInfo?.address}
              {myOrder.shippingInfo?.province}
              {myOrder.shippingInfo?.city}
            </span>
          </p>
          <p className="font-semibold text-slate-600 text-md">
            Email To: <strong> {userInfo.email}</strong>
          </p>
        </div>

        <div className="text-slate-600">
          <h2 className="font-mono">
            Price : <strong>${myOrder.price}</strong> Include Shipping
          </h2>
          <p className="font-mono">
            {" "}
            Payment Status :{" "}
            <strong
              className={`py-[3px] text-xs px-3 ${
                myOrder.payment_status === "paid"
                  ? "bg-green-300 text-green-800"
                  : "bg-red-300 text-red-800"
              } rounded-md`}
            >
              {" "}
              {myOrder?.payment_status?.toUpperCase()}{" "}
            </strong>{" "}
          </p>

          <p className="font-mono">
            {" "}
            Order Status :{" "}
            <strong
              className={`py-[3px] text-xs px-3 ${
                myOrder.delivery_status === "paid"
                  ? "bg-green-300 text-green-800"
                  : "bg-red-300 text-red-800"
              } rounded-md`}
            >
              {" "}
              {myOrder?.delivery_status?.toUpperCase()}{" "}
            </strong>{" "}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="pb-2 font-sans text-lg font-bold text-slate-600">
          Order Products{" "}
        </h2>
        <div className="flex flex-col gap-5">
          {myOrder.products?.map((p, i) => (
            <div key={i}>
              <div className="flex items-center justify-start gap-5 text-slate-600">
                <div className="flex gap-2">
                  <img className="w-[55px] h-[55px]" src={p.images[0]} alt="" />
                  <div className="flex flex-col items-start justify-start text-sm">
                    <Link> {p.name} </Link>
                    <p>
                      {" "}
                      <span>
                        Brand : <strong>{p.brand}</strong>
                      </span>{" "}
                    </p>
                    <p>
                      <span>
                        Quantity : <strong>{p.quantity}</strong>
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col pl-4">
                  <h2 className="text-green-800 text-md">
                    ${p.price - Math.floor((p.price * p.discount) / 100)}
                  </h2>
                  <p className="text-red-400 line-through">{p.price}</p>
                  <p>-{p.discount}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default OrderDetails;
