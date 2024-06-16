import React, { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FixedSizeList as List } from "react-window";

import moment from "moment";
import toast from "react-hot-toast";

function handleOnWheel({ deltaY }) {
  console.log("handleOnWheel", deltaY);
}

const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));

const PaymentRequest = () => {
  const [paymentId, setPaymentId] = useState("");

  const Row = ({ index, style }) => {
    return (
      <div style={style} className="flex text-sm font-medium text-white">
        <div className="w-[25%] p-2 whitespace-nowrap">{index + 1}</div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          $pendingWithdrows[index]?.amount
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          <span className="py-[1px] px-[5px] bg-slate-300 text-blue-500 rounded-md text-sm">
            pendingWithdrows[index]?.status
          </span>
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          {" "}
          moment(pendingWithdrows[index]?.createdAt).format("LL"){" "}
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          <button
            // disabled={loader}
            // onClick={() => confirm_request(pendingWithdrows[index]?._id)}
            className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-[2px cursor-pointer text-white rounded-sm text-sm]"
          >
            {/* {loader && paymentId === pendingWithdrows[index]?._id
              ? "loading.."
              : "Confirm"} */}
          </button>
        </div>
      </div>
    );
  };

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
                itemCount={50}
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
