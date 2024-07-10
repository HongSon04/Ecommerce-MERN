import React, { forwardRef, useEffect, useState } from "react";
import { MdCurrencyExchange } from "react-icons/md";
import { FixedSizeList as List } from "react-window";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMessage,
  GetSellerPaymentDetails,
  SendWithDrawRequest,
} from "../../store/Reducers/PaymentReducer";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import { toast } from "react-hot-toast";
import moment from "moment";
function handleOnWheel({ deltaY }) {
  // console.log("handleOnWheel", deltaY);
}

const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));

const Payments = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    successMessage,
    errorMessage,
    pendingWithdraws,
    successWithdraws,
    totalAmount,
    withdrawAmount,
    pendingAmount,
    availableAmount,
    loader,
  } = useSelector((state) => state.payment);
  const [amount, setAmount] = useState(0);

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
          {moment(pendingWithdraws[index]?.createdAt).format("ll")}{" "}
        </div>
      </div>
    );
  };

  const Rows = ({ index, style }) => {
    return (
      <div style={style} className="flex text-sm font-medium text-white">
        <div className="w-[25%] p-2 whitespace-nowrap">{index + 1}</div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          ${successWithdraws[index]?.amount}
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          <span className="py-[1px] px-[5px] bg-slate-300 text-blue-500 rounded-md text-sm">
            {successWithdraws[index]?.status}
          </span>
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          {" "}
          {moment(successWithdraws[index]?.createdAt).format("ll")}{" "}
        </div>
      </div>
    );
  };
  const sendRequest = (e) => {
    e.preventDefault();
    if (availableAmount - amount > 10) {
      dispatch(SendWithDrawRequest({ amount, sellerId: userInfo._id }));
      setAmount(0);
    } else {
      toast.error("Insufficient Amount");
    }
  };

  useEffect(() => {
    dispatch(GetSellerPaymentDetails({ sellerId: userInfo._id }));
  }, [dispatch, userInfo._id]);

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
    <div className="px-2 py-5 md:px-7">
      <div className="grid w-full grid-cols-1 mb-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
        <div className="flex justify-between items-center p-5 bg-[#fae8e8] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <h2 className="text-2xl font-bold">${totalAmount}</h2>
            <span className="text-sm font-bold">Total Sales</span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-[#fa0305] flex justify-center items-center text-xl">
            <MdCurrencyExchange className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-[#fde2ff] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <h2 className="text-2xl font-bold">${availableAmount}</h2>
            <span className="text-sm font-bold">Available Amount</span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-[#760077] flex justify-center items-center text-xl">
            <MdCurrencyExchange className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-[#e9feea] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <h2 className="text-2xl font-bold">${withdrawAmount}</h2>
            <span className="text-sm font-bold">WithDrawal Amount</span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-[#038000] flex justify-center items-center text-xl">
            <MdCurrencyExchange className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-[#ecebff] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <h2 className="text-2xl font-bold">${pendingAmount}</h2>
            <span className="text-sm font-bold">Pending Amount</span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-[#0200f8] flex justify-center items-center text-xl">
            <MdCurrencyExchange className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>
      </div>
      <div className="grid w-full grid-cols-1 gap-2 pb-4 md:grid-cols-2">
        <div className="bg-[#6a5fdf] text-[#d0d2d6] rounded-md p-5">
          <h2 className="text-lg">Send Request</h2>
          <div className="pt-5 mb-5">
            <form onSubmit={sendRequest}>
              <div className="flex flex-wrap gap-3">
                <input
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                  min="0"
                  type="number"
                  className="px-3 py-2 md:w-[75%] focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                  name="amount"
                />

                <button
                  disabled={loader}
                  className="py-2 text-white bg-red-500 rounded-md hover:shadow-red-500/40 hover:shadow-md px-7"
                >
                  {loader ? (
                    <PropagateLoader
                      cssOverride={overrideStyle}
                      color="#ffffff"
                    />
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>

          <div>
            <h2 className="pb-4 text-lg">Pending Request </h2>

            <div className="w-full overflow-x-auto">
              <div className="flex bg-[#a7a3de] uppercase text-xs font-bold min-w-[340px] rounded-md">
                <div className="w-[25%] p-2"> No </div>
                <div className="w-[25%] p-2"> Amount </div>
                <div className="w-[25%] p-2"> Status </div>
                <div className="w-[25%] p-2"> Date </div>
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

        <div className="bg-[#6a5fdf] text-[#d0d2d6] rounded-md p-5">
          <div>
            <h2 className="pb-4 text-lg">Success WithDrawal </h2>

            <div className="w-full overflow-x-auto">
              <div className="flex bg-[#a7a3de] uppercase text-xs font-bold min-w-[340px] rounded-md">
                <div className="w-[25%] p-2"> No </div>
                <div className="w-[25%] p-2"> Amount </div>
                <div className="w-[25%] p-2"> Status </div>
                <div className="w-[25%] p-2"> Date </div>
              </div>
              {
                <List
                  style={{ minWidth: "340px" }}
                  className="List"
                  height={350}
                  itemCount={successWithdraws.length}
                  itemSize={35}
                  outerElementType={outerElementType}
                >
                  {Rows}
                </List>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Payments;
