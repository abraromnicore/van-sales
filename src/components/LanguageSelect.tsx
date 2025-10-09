import { useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Button } from '@components/button/Button.tsx';

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
      <Button onClick={toggleLanguage} label={i18n.language === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"} variant={'ghost'}/>
    </div>
  );
};