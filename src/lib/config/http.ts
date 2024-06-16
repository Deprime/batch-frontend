import ky from 'ky';
import { get } from 'svelte/store';
// import userStore from '$lib/stores/user';
import { appStore, userStore } from '$lib/stores';
import { API_HOST, IS_DEV_MODE } from './app';

const httpHelper = {
  noTokenUrls: [
    'auth/username',
    'telegram'
  ],

  /**
   * Get token from local storage
   */
  getLsToken: (): string  => {
    let token = '';
    if (localStorage.getItem('user')) {
      const raw = localStorage.getItem('user');
      if (raw) {
        const user = JSON.parse(raw);
        token = user?.token ?? '';
      }
    }
    return token;
  },
}

const $http = ky.create({
  prefixUrl: API_HOST,
  credentials: 'include',
  mode: 'cors',
  // mode: IS_DEV_MODE ? 'cors' : 'same-origin',
  headers: {
    'content-type': 'application/json',
  },
  retry: {
    limit: 2,
    statusCodes: [401],
    methods: ['get', 'post'],
  },
  hooks: {
    beforeRequest: [
      (request) => {
        const last = request.url.split('/').pop() as string;
        if (httpHelper.noTokenUrls.includes(last)) {
          if (request.headers.has('Authorization')) {
            request.headers.delete('Authorization');
          }
        }
        else {
          const token = httpHelper.getLsToken();
          if (token) {
            request.headers.set('Authorization', token);
          }
        }
      },
    ],

    beforeRetry: [
			async ({
        request,
        // options,
        // error,
        // retryCount
      }) => {
        console.log('Token refresh try');
        try {
          const user = get(userStore);
          const app = get(appStore);

          const urlTelegram = `${API_HOST}/auth/telegram`;
          const urlDebug = `${API_HOST}/auth/username`;
          const url = !IS_DEV_MODE && app.engine === 'telegram'
            ? urlTelegram
            : urlDebug;

          const init_data = window.Telegram.WebApp.initData;
          const username = user?.data?.username ?? '';

          const data = !IS_DEV_MODE && app.engine === 'telegram'
            ? { init_data }
            : { username };

          const response = await ky.post(url, {json: {data}});
          const result   = await response.json();
          userStore.setToken(result.token);
          request.headers.set('Authorization', token);
        }
        catch (_err) {
          console.log(_err)
          throw new Error('Token refresh fails');
        }
			}
		]
  },
});

//TODO: We can also add auth header on instance creation
export default $http;
