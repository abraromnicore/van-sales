import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import {convertToEasternArabic} from "./utils/utils"

const resources = {
    en: {
      translation: {
        login : {
          welcomeBack : "Welcome back",
          signInMsg: "Sign in to your account to continue",
          emailInput: "Enter your email or username",
          password: "Enter your password",
          forgotPassword: "Forgot password?",
          rememberMe: "Remember me",
          signIn: "Sign In",
          dontHaveAccount : "Don't have an account?",
          signUp: "Sign up"
        }
      }
    },
    ar: {
      translation: {
      login: { 
      welcomeBack: "مرحبًا بعودتك",
      signInMsg: "قم بتسجيل الدخول إلى حسابك للمتابعة",
      emailInput: "أدخل بريدك الإلكتروني أو اسم المستخدم",
      password: "أدخل كلمة المرور الخاصة بك",
      forgotPassword: "هل نسيت كلمة السر؟",
      rememberMe: "تذكرنى",
      signIn: "تسجيل الدخول",
      dontHaveAccount: "ليس لديك حساب؟",
      signUp: "اشتراك"
       }
      }
     }
}
i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ["en", "ar"],
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      transKeepBasicHtmlNodesFor: ["br", "strong", "i"],
    },
  });

  const compareObjects = (
  enObj: {
    [x: string]: any;
  },
  arObj: {
    [x: string]: any;
  },
  path = ""
) => {
  for (const key of Object.keys(enObj)) {
    if (!(key in arObj)) {
      console.log(`${path}${key}: ${enObj[key]}`);
      continue;
    }

    if (typeof enObj[key] === "object") {
      //eslint-disable-next-line
      compareObjects(enObj[key], arObj[key], `${path}${key}.`);
    }
  }
};

  if (i18n && i18n.services && i18n.services.formatter) {
  i18n.services.formatter.add(
    "arabicToEasternArabic",
    (value, lng, options) => {
      return value.replace(
        options.numbers || options.count || 0,
        convertToEasternArabic(options.numbers || options.count || 0)
      );
    }
  );
}
export default i18n;
