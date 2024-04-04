import $http from '$lib/config/http';
import { requestApi } from '$lib/utils';

const PREFIX = '/api/user';

const userApi = {
  /**
   * Telegram auth
   * @param {String} init_data
   */
  setUserData: (name: string, email?: string) => {
    const url = `user/data`;
    const json = {
      data: {
        name,
        ...(email && { email })
      },
    };
    return $http.post(url, { json });
  },

  /**
   * Authenificate useer
   * @param {String} address
   * @returns {Promise}
   */
  authentificate: async (address: string): Promise<Response> => {
    const body = { address };
    return await requestApi(`${PREFIX}/auth`, { body });
    //  await fetch('/api/user/auth', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   // TODO: - очень так себе решение, можно авторизоваться с любым адресом
    //   body: JSON.stringify({ address: account.address }),
    // });
  },
};

export default userApi;
