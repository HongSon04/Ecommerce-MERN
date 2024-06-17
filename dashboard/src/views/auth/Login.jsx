import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { clearMessage, seller_login } from "../../store/Reducers/authReducer";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState({ email: "", password: "" });

  const { loader, errorMessage, successMessage } = useSelector(
    (state) => state.auth
  );

  const inputHandle = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(seller_login(state));
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
    if (successMessage) {
      toast.success(successMessage);
      navigate("/");
    }
    dispatch(clearMessage());
  }, [errorMessage, successMessage, dispatch, navigate]);

  return (
    <div className="min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center">
      <div className="w-[350px] text-[#ffffff] p-2">
        <div className="bg-[#6f68d1] p-4 rounded-md text-center">
          <h2 className="mb-3 text-xl font-bold ">Welcome To Ecommerce</h2>
          <p className="mb-3 text-sm font-medium">Please Login Your Account</p>

          <form onSubmit={submit}>
            {/* Email */}
            <div className="flex flex-col w-full gap-1 mb-3 form-group">
              <label htmlFor="email">Email</label>
              <input
                onChange={inputHandle}
                value={state.email}
                className="px-3 py-2 bg-transparent border rounded-md outline-none border-slate-700"
                type="email"
                name="email"
                placeholder="Email"
                id="email"
                required
              />
            </div>
            {/* Password */}
            <div className="flex flex-col w-full gap-1 mb-3 form-group">
              <label htmlFor="password">Password</label>
              <input
                onChange={inputHandle}
                value={state.password}
                className="px-3 py-2 bg-transparent border rounded-md outline-none border-slate-700"
                type="password"
                name="password"
                placeholder="Password"
                id="password"
                required
              />
            </div>

            {/* Button */}
            <button
              disabled={loader}
              className="w-full py-2 mb-3 text-white rounded-md bg-slate-800 hover:shadow-blue-300 hover:shadow-lg px-7"
            >
              {loader ? (
                <PropagateLoader cssOverride={overrideStyle} color="#ffffff" />
              ) : (
                "Log In"
              )}
            </button>
            <div className="flex items-center justify-center gap-3 mb-3">
              <p>
                Don't Have an account ?{" "}
                <Link className="font-bold" to="/register">
                  Sign Up
                </Link>
              </p>
            </div>
            {/* Divider */}
            <div className="flex items-center justify-center w-full mb-3">
              <div className="w-[45%] bg-slate-700 h-[1px]"></div>
              <div className="w-[10%] flex justify-center items-center">
                <span className="pb-1">Or</span>
              </div>
              <div className="w-[45%] bg-slate-700 h-[1px]"></div>
            </div>
            {/* Social Login */}
            <div className="flex items-center justify-center gap-3">
              <div className="w-[135px] h-[35px] flex rounded-md bg-orange-700 shadow-lg hover:shadow-orange-700 justify-center cursor-pointer items-center overflow-hidden">
                <span>
                  <FaGoogle />
                </span>
              </div>
              <div className="w-[135px] h-[35px] flex rounded-md bg-blue-700 shadow-lg hover:shadow-blue-700 justify-center cursor-pointer items-center overflow-hidden">
                <span>
                  <FaFacebook />
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
