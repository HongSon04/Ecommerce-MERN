import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ChangeLangue() {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");

  const { t, i18n } = useTranslation();

  const changeLang = (language) => {
    setLang(language);
    localStorage.setItem("lang", language);
    i18n.changeLanguage(language);
  };
  return { lang, t, changeLang };
}
