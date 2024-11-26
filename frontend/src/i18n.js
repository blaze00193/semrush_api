import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    ja : {
        translation: require("./locales/ja.json"),
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng:"ja",
    fallbacking:"ja",
    interpolation:{ excapeValue: false},
});

export default i18n;