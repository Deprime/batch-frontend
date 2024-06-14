import { persisted } from 'svelte-persisted-store';

// Types
import { type IGirl } from '$lib/constants/mock';

const $$ducks = {
  data: <IGirl[]>  [],
  cookie: <string|null>  null,
  loading: false,
}

const { subscribe, set, update } = persisted('ducks', $$ducks);
const clear = () => set($$ducks);

const setLoading = (state: boolean): void => {
  update(value => ({ ...value, loading: state }))
}

const setData = (data: IGirl[]): void => {
  update(value => ({ ...value, data }))
};


const addDuck = async (duck: IGirl) => {
  update(value => ({ ...value, data: [...value.data, { ...duck}] }));
}

const girlsStore = {
  subscribe,
  set,
  update,
  clear,
  setData,
  addDuck,
  setLoading,
};

export default girlsStore;
