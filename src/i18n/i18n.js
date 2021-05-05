import ReactNative, {Platform, NativeModules} from 'react-native';
import I18n from 'i18n-js';
import * as Localization from 'expo-localization';

import {getData, LANGUAGE_KEY} from '../helper/AsyncStorageUtils';
import Languages from '../helper/Languages';

// Import all locales.
import ar from '../lang/ar.json';
import en from '../lang/en.json';

// Get device language.
const deviceLanguage =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
    : NativeModules.I18nManager.localeIdentifier;

 export const defaultLocale =
deviceLanguage.toLowerCase().indexOf('en') > -1 ? Languages.ENGLISH.iso : Languages.ARABIC.iso;

//export const defaultLocale = Languages.ARABIC.iso;

I18n.locale = Localization.locale;

// If an English translation is not available in en.js, it will look inside ar.js
I18n.fallbacks = true;

// It will convert HOME_noteTitle to "HOME note title"
// if the value of HOME_noteTitle doesn't exist in any of the translation files.
I18n.missingBehaviour = 'guess';

// If the current locale in device is not en or ar.
I18n.defaultLocale = defaultLocale;

// Set the locale.
I18n.locale = defaultLocale;

// Define the supported translations.
I18n.translations = {
  ar,
  en,
};

// Get user language.
// Set the user language if available.
getData(LANGUAGE_KEY).then((userLanguage) => {
  if (userLanguage) {
    I18n.locale = userLanguage;

    ReactNative.I18nManager.allowRTL(
      I18n.locale.indexOf(Languages.ARABIC.iso) === 0,
    );

    ReactNative.I18nManager.forceRTL(
      I18n.locale.indexOf(Languages.ARABIC.iso) === 0,
    );
  }
});

export const setLocale = (locale) => {
  I18n.locale = locale;

  ReactNative.I18nManager.allowRTL(
    I18n.locale.indexOf(Languages.ARABIC.iso) === 0,
  );

  ReactNative.I18nManager.forceRTL(
    I18n.locale.indexOf(Languages.ARABIC.iso) === 0,
  );
};

export const getCurrentLocale = ()  => {
  return I18n.locale;
};

// The method we'll use instead of a regular string.
// The method we'll use instead of a regular string.
export const strings = (name, params= {}) => {
  return I18n.t(name, params);
};


export default I18n;
//fcntoken