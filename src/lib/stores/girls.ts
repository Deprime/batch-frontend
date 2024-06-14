import { persisted } from 'svelte-persisted-store';

// Types
import type { IGirl } from "$lib/types/girl";

const DEFAULT_STATE = {
  data: <IGirl[]>  [],
  cookie: <string|null>  null,
  loading: false,
}

const { subscribe, set, update } = persisted('girls', DEFAULT_STATE);
const clear = () => set(DEFAULT_STATE);

const setLoading = (state: boolean): void => {
  update(value => ({ ...value, loading: state }))
}

const setData = (data: IGirl[]): void => {
  update(value => ({ ...value, data }))
};


const addGirl= async (girl: IGirl) => {
  update(value => ({ ...value, data: [...value.data, { ...girl}] }));
}

const girlsStore = {
  subscribe,
  set,
  update,
  clear,
  setData,
  addGirl,
  setLoading,
};

export default girlsStore;
