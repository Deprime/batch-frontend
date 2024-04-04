import { persisted } from 'svelte-local-storage-store';

// Types
// import type { IUser } from '$lib/types/user';

interface IUser {
  id: number,
  username: string,
  language_code: string,
}

const $$user = {
  data: <IUser|null> null,
  token: <string|null> null,
  cookie: <string|null> null,
  loading: false,
}

const { subscribe, set, update } = persisted('user', $$user);
const clear = () => set($$user);

const setLoading = (state: boolean): void => {
  update(value => ({ ...value, loading: state }))
}

const setData = (data: IUser): void => {
  update(value => ({ ...value, data }))
};

const setToken = (token: string|null): void => {
  update(value => ({
    ...value,
    token
  }))
};

const setCookei = (cookie: string|null): void => {
  update(value => ({
    ...value,
    cookie
  }))
};

const isLoggedIn = () => {
  let isLogged = false;
  subscribe(value => {
    isLogged = (value.token) ? true : false;
  });
  return isLogged;
}

const userStore = {
  subscribe,
  set,
  update,
  clear,
  setData,
  setToken,
  setCookei,
  setLoading,
  isLoggedIn,
};

export default userStore;
