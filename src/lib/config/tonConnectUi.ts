
import { TonConnectUI, THEME } from '@tonconnect/ui';
import { LANDING_HOST, IS_DEV_MODE, IS_PROD_DOMAIN } from '$lib/config/app';

const testManifestUrl = 'https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json';
const prodManifestUrl = `${LANDING_HOST}/tonconnect-manifest.json`;
const devManifestUrl = `${LANDING_HOST}/tonconnect-dev-manifest.json`;

const manifestUrl = IS_DEV_MODE
  ? testManifestUrl
  : IS_PROD_DOMAIN
    ? prodManifestUrl
    : devManifestUrl;

// Return URL
// TODO: Wrap to strategy
const twaReturnUrl = localStorage.getItem('webapp_link');

const tonConnectUI = new TonConnectUI({
  manifestUrl,
  language: 'ru',
  uiPreferences: {
    theme: THEME.DARK
  },
  actionsConfiguration: {
    twaReturnUrl,
  }
});

export default tonConnectUI;
