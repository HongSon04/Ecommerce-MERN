import React, { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FixedSizeList as List } from "react-window";
import {
  clearMessage,
  ConfirmPaymentRequest,
  GetPaymentRequest,
} from "../../store/Reducers/PaymentReducer";
import moment from "moment";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import { toast } from "react-hot-toast";
function handleOnWheel({ deltaY }) {
  // console.log("handleOnWheel", deltaY);
}
const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));
const PaymentRequest = () => {
  const dispatch = useDispatch();
  const { successMessage, errorMessage, pendingWithdraws, loader } =
    useSelector((state) => state.payment);
  const [paymentId, setPaymentId] = useState("");

  const Row = ({ index, style }) => {
    return (
      <div style={style} className="flex text-sm font-medium text-white">
        <div className="w-[25%] p-2 whitespace-nowrap">{index + 1}</div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          ${pendingWithdraws[index]?.amount}
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          <span className="py-[1px] px-[5px] bg-slate-300 text-blue-500 rounded-md text-sm">
            {pendingWithdraws[index]?.status}
          </span>
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          {" "}
          {moment(pendingWithdraws[index]?.createdAt).format("LL")}{" "}
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          <button
            onClick={() => confirmRequest(pendingWithdraws[index]?._id)}
            disabled={loader}
            className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-[2px cursor-pointer text-white rounded-sm text-sm]"
          >
            {loader && paymentId === pendingWithdraws[index]?._id ? (
              <PropagateLoader cssOverride={overrideStyle} color="#ffffff" />
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </div>
    );
  };

  const confirmRequest = (id) => {
    setPaymentId(id);
    dispatch(ConfirmPaymentRequest(id));
  };

  useEffect(() => {
    dispatch(GetPaymentRequest());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
    if (errorMessage) {
      toast.error(errorMessage);
    }
    dispatch(clearMessage());
  }, [dispatch, successMessage, errorMessage]);

  return (
    <div className="px-2 pt-5 lg:px-7">
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
        <h2 className="text-xl font-medium pb-5 text-[#d0d2d6]">
          Withdrawal Request
        </h2>
        <div className="w-full">
          <div className="w-full overflow-x-auto">
            <div className="flex bg-[#a7a3de] uppercase text-xs font-bold min-w-[340px] rounded-md">
              <div className="w-[25%] p-2"> No </div>
              <div className="w-[25%] p-2"> Amount </div>
              <div className="w-[25%] p-2"> Status </div>
              <div className="w-[25%] p-2"> Date </div>
              <div className="w-[25%] p-2"> Action </div>
            </div>
            {
              <List
                style={{ minWidth: "340px" }}
                className="List"
                height={350}
                itemCount={pendingWithdraws.length}
                itemSize={35}
                outerElementType={outerElementType}
              >
                {Row}
              </List>
            }
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentRequest;
