import $http from '$lib/config/http';

// const PREFIX = '/api/user';

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
};

export default userApi;
