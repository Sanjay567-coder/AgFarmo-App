import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './languages/en';
import ar from './languages/ar';
import de from './languages/de';
import es from './languages/es';
import fr from './languages/fr';
import it from './languages/it';
import ja from './languages/ja';
import ko from './languages/ko';
import ru from './languages/ru';
import zh_CN from './languages/zh_CN';
import hi from './languages/hi';
import ta from './languages/ta'; 
import te from './languages/te';
import be from './languages/be';
import ml from './languages/ml';
import kn from './languages/kn';


export const languageResources = {
  en: {translation: en},
  ar: {translation: ar},
  de: {translation: de},
  es: {translation: es},
  fr: {translation: fr},
  it: {translation: it},
  ja: {translation: ja},
  ko: {translation: ko},
  ru: {translation: ru},
  zh_CN: {translation: zh_CN},
  hi: {translation: hi},
  ta: {translation: ta},
  te: {translation: te},
  be: {translation: be},
  ml: {translation: ml},
  kn: {translation: kn},
};

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  resources: languageResources,
});

export default i18next;