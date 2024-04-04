const ENV = import.meta.env;

const VITE_API_URL = import.meta.env.VITE_API_URL;
const VITE_LANDING_URL = import.meta.env.VITE_LANDING_URL;
const VITE_CENTRIFUGO_API_URL = import.meta.env.VITE_CENTRIFUGO_API_URL as string;

// Define current domain
const domain = window.location.hostname.split('.').slice(-2).join('.');

export const API_HOST = VITE_API_URL ?? `${window.location.protocol}//api.${domain}`;
export const LANDING_HOST = VITE_LANDING_URL ?? `${window.location.protocol}//m.${domain}`;
export const IS_PROD_DOMAIN = LANDING_HOST.includes('sultangame.ai');
export const CENTRIFUGO_API_URL = VITE_CENTRIFUGO_API_URL ?? `wss://c.${domain}/connection/websocket`;

export const IS_DEV_MODE = ENV.MODE === 'development';

export const DEV_MODE_USER = {
  id: 5, // fake telegram id
  username: 'Depri_me2',
  first_name: 'Andrey',
  last_name: 'Diugaev',
  language_code: 'ru',
};
