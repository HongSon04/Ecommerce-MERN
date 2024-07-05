import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "../EN/translationEN.json";
import translationVI from "../VI/translationVI.json";

const lang = localStorage.getItem("lang");

const resources = {
  en: { translation: translationEN },
  vi: { translation: translationVI },
};

i18next.use(initReactI18next).init({
  lng: lang || "en", // if you're using a language detector, do not define the lng option
  debug: true,
  resources,
});
