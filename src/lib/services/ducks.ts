import { get } from 'svelte/store';

// import { ducksApi } from '$lib/api';
import { girlsStore } from '$lib/stores';
import { MOCK_GIRL, type IGirl } from '$lib/constants/mock';

const girlService = {
  /**
   * Get app config
   */
  buyyGirl: async (mocked = true) => {
    if (mocked) {

      const store = get(girlsStore)
      const id = store.data.length + 1;
      girlsStore.addDuck({ ...MOCK_GIRL, id } as IGirl);
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
