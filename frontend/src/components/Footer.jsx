import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedin, FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import ChangeLangue from "../utils/ChangeLangue";

const Footer = () => {
  const { lang, t, changeLang } = ChangeLangue();

  return (
    <footer className="bg-[#f3f6fa]">
      <div className="w-[85%] flex flex-wrap mx-auto border-b py-16 md-lg:pb-10 sm:pb-6">
        <div className="w-3/12 lg:w-4/12 sm:w-full">
          <div className="flex flex-col gap-3">
            <img
              className="w-[190px] h-[70px]"
              src="http://localhost:3000/images/logo.png"
              alt="logo"
            />
            <ul className="flex flex-col gap-2 text-slate-600">
              <li>
                {t("text.address")} : 2504 Ivins Avenue, Egg Harbor Township, NJ
                08234,
              </li>
              <li>{t("text.phone")} : 4343434344</li>
              <li>{t("text.email")} : support@easylearingbd.com</li>
            </ul>
          </div>
        </div>
        <div className="w-5/12 lg:w-8/12 sm:w-full">
          <div className="flex justify-center w-full sm:justify-start sm:mt-6">
            <div>
              <h2 className="mb-2 text-lg font-bold">
                {t("text.usefull-link")}{" "}
              </h2>
              <div className="flex justify-between gap-[80px] lg:gap-[40px]">
                <ul className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
                  <li>
                    <Link>{t("text.about-us")} </Link>
                  </li>
                  <li>
                    <Link>{t("text.about-our-shop")} </Link>
                  </li>
                  <li>
                    <Link>{t("text.delivery-information")} </Link>
                  </li>
                  <li>
                    <Link>{t("text.privacy-policy")} </Link>
                  </li>
                  <li>
                    <Link>{t("text.blogs")} </Link>
                  </li>
                </ul>
                <ul className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
                  <li>
                    <Link>{t("text.our-services")} </Link>
                  </li>
                  <li>
                    <Link>{t("text.company-profile")}</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="w-4/12 lg:w-full lg:mt-6">
          <div className="flex flex-col justify-start w-full gap-5">
            <h2 className="mb-2 text-lg font-bold">
              {t("text.join-our-newsletter")}
            </h2>
            <span>{t("text.get-email-updates")}</span>
            <div className="h-[50px] w-full bg-white border relative">
              <input
                className="w-full h-full px-3 bg-transparent outline-0"
                type="text"
                placeholder={t("text.enter-your-email")}
              />

              <button className="h-full absolute right-0 bg-[#059473] text-white uppercase px-4 font-bold text-sm">
                {t("text.subscribe")}
              </button>
            </div>
            <ul className="flex items-center justify-start gap-3">
              <li>
                <a
                  className="w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full"
                  href="#"
                >
                  <FaFacebookF />{" "}
                </a>
              </li>

              <li>
                <a
                  className="w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full"
                  href="#"
                >
                  <FaTwitter />{" "}
                </a>
              </li>
              <li>
                <a
                  className="w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full"
                  href="#"
                >
                  <FaLinkedin />{" "}
                </a>
              </li>
              <li>
                <a
                  className="w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full"
                  href="#"
                >
                  <FaGithub />{" "}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-[90%] flex flex-wrap justify-center items-center text-slate-600 mx-auto py-5 text-center">
        <span>Copiright @ 2024 All Rights Reserved </span>
      </div>
    </footer>
  );
};
export default Footer;
