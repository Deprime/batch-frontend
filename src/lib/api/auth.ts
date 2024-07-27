import $http from '$lib/config/http';
// import type { IApiResponse } from '$lib/types/common';

const PREFIX = 'api/v1/auth';

const authApi = {
  /**
   * Telegram auth
   * @param {String} init_data
   */
  telegram: (init_data: string) => {
    const url = `${PREFIX}/login`;
    const json = {
      data: { init_data },
    };
    return $http.post(url, { json }).json();
  },

  /**
   * Auth username
   * @param {String} username
   * @returns {Promise}
   */
  webapp: (username: string) => {
    const json = {
      data: { username },
    };
    const url = `${PREFIX}/username`;
    return $http.post(url, { json }).json();
  },

  /**
   * logout
   */
  logout: () => {
    const url = `${PREFIX}/logout`;
    return $http.post(url);
  },
};

export default authApi;
