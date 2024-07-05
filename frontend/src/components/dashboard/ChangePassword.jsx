import React from "react";
import ChangeLangue from "../../utils/ChangeLangue";

const ChangePassword = () => {
  const { t } = ChangeLangue();
  return (
    <div className="p-4 bg-white">
      <h2 className="pb-5 text-xl text-slate-600">
        {t("dashboard.change-password")}{" "}
      </h2>

      <form>
        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="old_password">{t("dashboard.old-password")}</label>
          <input
            className="px-3 py-1 border rounded-md outline-none text-slate-600"
            type="password"
            name="old_password"
            id="old_password"
            placeholder={t("dashboard.old-password")}
          />
        </div>

        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="new_password">{t("dashboard.new-password")}</label>
          <input
            className="px-3 py-1 border rounded-md outline-none text-slate-600"
            type="password"
            name="new_password"
            id="new_password"
            placeholder={t("dashboard.new-password")}
          />
        </div>

        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="confirm_password">
            {t("dashboard.confirm-password")}
          </label>
          <input
            className="px-3 py-1 border rounded-md outline-none text-slate-600"
            type="password"
            name="confirm_password"
            id="confirm_password"
            placeholder={t("dashboard.confirm-password")}
          />
        </div>
        <div>
          <button className="px-8 py-2 mt-3 bg-[#059473] shadow-lg hover:shadow-green-500/30 text-white rounded-md">
            {t("dashboard.update-password")}{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
