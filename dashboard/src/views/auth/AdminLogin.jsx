import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { adminLogin, clearMessage } from "../../store/Reducers/authReducer";
import { PropagateLoader } from "react-spinners";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loader, errorMessage, successMessage } = useSelector(
    (state) => state.auth
  );

  const [state, setState] = useState({ email: "", password: "" });

  const inputHandle = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(adminLogin(state));
  };

  const overwriteStyle = {
    display: "flex",
    margin: "0 auto",
    justifyContent: "center",
    height: "24px",
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
          <div className="h-[70px] flex justify-center items-center">
            <div className="w-[180px] h-[50px]">
              <img
                className="w-full h-full"
                src="http://localhost:3000/images/logo.png"
                alt="logo"
              />
            </div>
          </div>
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
                <PropagateLoader cssOverride={overwriteStyle} color="#ffffff" />
              ) : (
                "Log In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
