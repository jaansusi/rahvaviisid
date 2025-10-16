import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import common_et from "./translations/et/common.json";
import common_en from "./translations/en/common.json";
import { HelmetProvider } from 'react-helmet-async';
import './Middleware/axiosInterceptors.js';

i18next.init({
  interpolation: { escapeValue: false },  // React already does escaping
  lng: 'et',                              // language to use
  resources: {
    en: {
      common: common_en               // 'common' is our custom namespace
    },
    et: {
      common: common_et
    },
  },
});

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </I18nextProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
