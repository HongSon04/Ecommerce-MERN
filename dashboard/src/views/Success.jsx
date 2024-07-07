import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ActiveStripeConnectAccount,
  clearMessage,
} from "../store/Reducers/SellerReducer";
import { FadeLoader } from "react-spinners";
import error from "../assets/error.png";
import success from "../assets/success.png";
import { get_user_info } from "../store/Reducers/AuthReducer";
const Success = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(window.location.search);
  const { successMessage, errorMessage, loader } = useSelector(
    (state) => state.seller
  );
  const activeCode = queryParams.get("activeCode");

  useEffect(() => {
    if (activeCode) {
      setTimeout(() => {
        dispatch(ActiveStripeConnectAccount(activeCode));
      }, 2000);
    }
  }, [dispatch, activeCode]);

  const redirect = () => {
    dispatch(clearMessage());
    navigate("/");
  };
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-4">
      {loader ? (
        <FadeLoader />
      ) : errorMessage ? (
        <>
          <img src={error} alt="error" />{" "}
          <button
            onClick={() => redirect()}
            className="px-5 py-2 text-white bg-green-700 rounded-sm"
          >
            Back to Dashboard
          </button>
        </>
      ) : (
        successMessage && (
          <>
            <img src={success} alt="success" />{" "}
            <button
              onClick={() => redirect()}
              className="px-5 py-2 text-white bg-green-700 rounded-sm"
            >
              Back to Dashboard
            </button>
          </>
        )
      )}
    </div>
  );
};

export default Success;
