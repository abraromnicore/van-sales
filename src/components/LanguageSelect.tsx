import { useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";

export const LanguageSelect = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "en";
    i18n.changeLanguage(savedLang);
    document.documentElement.lang = savedLang;
    document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
  }, [i18n]);

  const setLang = useCallback(
    (lang: string) => {
      i18n.changeLanguage(lang);
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      localStorage.setItem("lang", lang);
    },
    [i18n]
  );

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    setLang(newLang);
  };

  return (
    <div className="p-4 flex justify-end">
      <button
        onClick={toggleLanguage}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
      >
        {i18n.language === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"}
      </button>
    </div>
  );
};
