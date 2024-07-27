import { get } from 'svelte/store';
import { authApi } from '$lib/api';
import { delay } from '$lib/helpers/async';

// Stores
import { userStore } from '$lib/stores';
import { DEV_MODE_USER } from '$lib/constants/mock';

// const VITE_DEVMODE_USERNAME = import.meta.env.VITE_DEVMODE_USERNAME as string;

const authService = {
  /**
   * Auth by telegram
   * @param {Object} telegram
   */
  telegram: async (telegram: Telegram) => {
    userStore.setLoading(true)
    try {
      const init_data = telegram.WebApp.initData;
      const result = await authApi.telegram(init_data);
      if (result) {
        userStore.setData(result.user);
        userStore.setToken(result.token);
      }
    } catch (_err) {
      userStore.clear();
      console.log(_err);
    } finally {
      userStore.setLoading(false);
    }
  },

  /**
   * Auth by username (for development)
   * @param {String|Null} username
   */
  webapp: async (username: string|null = null) => {
    const synthDelay = 850;
    const store = get(userStore);
    // If no name -> mocked auth

    await delay(synthDelay);
    if (!store.data?.username) {
      userStore.setData(DEV_MODE_USER);
    }
    return;

    // Web app auth
    // userStore.setLoading(true)
    // try {
    //   username = username ?? store?.data?.name as string;
    //   const result = await debugApi.authUsername(username);
    //   if (result && result.result === true) {
    //     const { user }  = result.response;
    //     userStore.setData(user);
    //     userStore.setToken(result.response.token);
    //   }
    // } catch (_err) {
    //   userStore.clear();
    //   console.log(_err);
    // } finally {
    //   userStore.setLoading(false);
    // }
  },

  /**
   * Logout
   */
  logout: async () => {
    userStore.setLoading(true)
    try {
      await authApi.logout();
      userStore.clear();
    } catch (_err) {
      console.log(_err);
    } finally {
      userStore.setLoading(false);
    }
  },
};

export default authService;
