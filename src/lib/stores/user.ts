import { persisted } from 'svelte-persisted-store';

// Types
import type { IUser, UUserState } from '$lib/types/user';

const $$user = {
  data: <IUser|null> null,
  token: <string|null> null,
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

const setState = (state: UUserState): void => {
  update(value => ({
    ...value,
    state
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
  setState,
  setToken,
  setLoading,
  isLoggedIn,
};

export default userStore;
