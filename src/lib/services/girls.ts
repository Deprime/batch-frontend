import { get } from 'svelte/store';

// import { ducksApi } from '$lib/api';
import { girlsStore } from '$lib/stores';
import { MOCK_GIRL } from '$lib/constants/mock';
import type { IGirl } from "$lib/types/girl";

const girlService = {
  /**
   * Get app config
   */
  buyGirl: async (mocked = true) => {
    if (mocked) {
      const store = get(girlsStore)
      const id = store.data.length + 1;
      girlsStore.addGirl({ ...MOCK_GIRL, id } as IGirl);
    }
    else {
      // try {
      //   const result = await ducksApi.buy();
      //   if (result.duck) {
      //     girlsStore.addDuck(result.duck);
      //   }
      // } catch (err) {
      //   console.error(err)
      // }
    }
  },
};

export default girlService;
