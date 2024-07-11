import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaFacebookF, FaGoogle } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, CustomerLogin } from "../store/reducers/AuthReducer";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../utils/utils";
import toast from "react-hot-toast";
import ChangeLangue from "../utils/ChangeLangue";

const Login = () => {
  const { t } = ChangeLangue();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const { loader, errorMessage, successMessage, userInfo } = useSelector(
    (state) => state.auth
  );

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e) => {
    e.preventDefault();
    dispatch(CustomerLogin(state));
  };
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
    if (successMessage) {
      toast.success(successMessage);
    }
    setState({
      email: "",
      password: "",
    });
    dispatch(clearMessage());

    if (userInfo) {
      navigate("/");
    }
  }, [errorMessage, successMessage, dispatch, userInfo, navigate]);

  return (
    <div>
      <Header />
      <div className="mt-4 bg-slate-200">
        <div className="items-center justify-center w-full p-10">
          <div className="grid grid-cols-2 w-[60%] mx-auto bg-white rounded-md">
            <div className="px-8 py-8">
              <h2 className="w-full text-xl font-bold text-center text-slate-600">
                {t("auth.login")}{" "}
              </h2>

              <div>
                <form onSubmit={login} className="text-slate-600">
                  <div className="flex flex-col gap-1 mb-2">
                    <label htmlFor="email">Email</label>
                    <input
                      onChange={inputHandle}
                      value={state.email}
                      className="w-full px-3 py-2 border rounded-md outline-none border-slate-200 focus:border-green-500"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1 mb-2">
                    <label htmlFor="password">{t("auth.password")}</label>
                    <input
                      onChange={inputHandle}
                      value={state.password}
                      className="w-full px-3 py-2 border rounded-md outline-none border-slate-200 focus:border-green-500"
                      type="password"
                      name="password"
                      id="password"
                      placeholder={t("auth.password")}
                      required
                    />
                  </div>

                  <button
                    disabled={loader ? true : false}
                    className="px-8 w-full py-2 bg-[#059473] shadow-lg hover:shadow-green-500/40 text-white rounded-md"
                  >
                    {loader ? (
                      <PropagateLoader
                        color="#fff"
                        cssOverride={overrideStyle}
                      />
                    ) : (
                      t("auth.login")
                    )}
                  </button>
                </form>
                <div className="flex items-center justify-center py-2">
                  <div className="h-[1px] bg-slate-300 w-[95%]"> </div>
                  <span className="px-3 text-slate-600">{t("auth.or")}</span>
                  <div className="h-[1px] bg-slate-300 w-[95%]"> </div>
                </div>

                <button className="flex items-center justify-center w-full gap-2 px-8 py-2 mb-3 text-white bg-indigo-500 rounded-md shadow hover:shadow-indigo-500/50">
                  <span>
                    <FaFacebookF />{" "}
                  </span>
                  <span>{t("auth.loginWFb")} </span>
                </button>

                <button className="flex items-center justify-center w-full gap-2 px-8 py-2 mb-3 text-white bg-red-500 rounded-md shadow hover:shadow-red-500/50">
                  <span>
                    <FaGoogle />
                  </span>
                  <span>{t("auth.loginWGg")} </span>
                </button>
              </div>

              <div className="pt-1 text-center text-slate-600">
                <p>
                  {t("auth.dontHaveAccount")}{" "}
                  <Link className="text-blue-500" to="/register">
                    {" "}
                    {t("auth.register")}
                  </Link>{" "}
                </p>
              </div>

              {/* <a target="_blank" href="http://localhost:3001/login">
                <div className="px-8 w-full py-2 bg-[#02e3e0] shadow hover:shadow-red-500/50 text-white rounded-md flex justify-center items-center gap-2 mb-3">
                  Login As a Seller
                </div>
              </a>

              <a target="_blank" href="http://localhost:3001/register">
                <div className="px-8 w-full py-2 bg-[#ad2cc4] shadow hover:shadow-red-500/50 text-white rounded-md flex justify-center items-center gap-2 mb-3">
                  Register As a Seller
                </div>
              </a> */}
            </div>

            <div className="w-full h-full py-4 pr-4">
              <img src="http://localhost:3000/images/login.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
