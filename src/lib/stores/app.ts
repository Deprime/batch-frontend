import { writable } from 'svelte/store';
import { IS_DEV_MODE } from '$lib/config/app';

type USettingsENgine = 'web'|'telegram';

interface ISettings {
  loading: boolean;
  engine: USettingsENgine,
}

const DEFAULT_STATE: ISettings = {
  loading: false,
  engine: 'telegram',
};

const { set, update, subscribe } = writable(DEFAULT_STATE);
const clear = () => set(DEFAULT_STATE);

const setEgine = (engine: USettingsENgine): void => {
  if (IS_DEV_MODE) {
    console.log(`engine is ${engine}`)
  }
  update((value) => ({ ...value, engine }));
};

const setLoading = (state: boolean): void => {
  update((value) => ({ ...value, loading: state }));
};

const appStore = {
  subscribe,
  set,
  update,
  clear,
  setLoading,
  setEgine,
};

export default appStore;
