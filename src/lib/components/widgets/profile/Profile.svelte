
<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { quartOut } from 'svelte/easing';

  // Components
  import { Modal, Button } from '$lib/components/ui';
  // import { Gamepad2 } from 'lucide-svelte';
  import { CandyIcon, GoldIcon, StarIcon } from '$lib/components/icons';

  // Stores
  import { userStore, girlsStore } from '$lib/stores';

  // Helpers
  import { delay } from '$lib/helpers/async';
  import { numberFormat } from '$lib/helpers/math';

  import { DEV_MODE_USER } from '$lib/constants/mock';

  // Data
  const tweenConfig = {
    duration: 1000,
    easing: quartOut,
  }
  let tokenTweened = tweened($userStore.data?.token ?? 0, tweenConfig);
  let candyTweened = tweened($userStore.data?.candy ?? 1, tweenConfig);
  const modalSession = {
    show: false,

  };
  const candies = 100;
  const stars = 100;
  let sure = false;

  // Reactive
  $: $tokenTweened = $userStore.data?.token ?? 1;
  $: $candyTweened = $userStore.data?.candy ?? 1;


  // Methods
  /**
   * Go to match
   */
  const openModal = () => {
    modalSession.show = true;
  }

  const addCandies = () => {
    if ($userStore.data?.candy) {
      $userStore.data.candy += candies;
    }
  }

  const addStars = () => {
    if ($userStore.data?.star) {
      $userStore.data.star += candies;
    }
  }

  const resetGameState = async () => {
    if (sure) {
      userStore.setData(DEV_MODE_USER);
      girlsStore.clear();

      await delay(750);
      modalSession.show = false;
      sure = false;
    }
    sure = true;
  }
</script>

<section class="flex flex-col w-full ">
  <!--
  <div class="flex justify-between items-center text-white bg-white/10 py-2.5 px-3 rounded-t-lg">
    <header class="w-full">
      <h4 class="h4 mb-1">
        {$userStore.data?.username}
      </h4>
      <div class="flex gap-4 mb-1">
        <p class="text-sm text-gray-200">
          Ур. 4
        </p>
        <p class="text-sm text-gray-200">
          Бронзовая лига
        </p>
      </div>
    </header>

    <figure class="size-16 rounded-lg bg-slate-500/40 border-4 border-slate-200/50 flex flex-shrink-0 justify-center items-center text-white">
      <Gamepad2 size={32} />
    </figure>
  </div>
  -->

  <footer class="flex w-full gap-5 bg-white/10 rounded-lg border-t border-t-black/40 divide-x divide-black/40">
    <div class="flex items-center gap-3 w-full py-2.5 px-4">
      <CandyIcon />
      <span
        class="text-amber-200 font-bold"
        id="wallet-ton"
      >
        {numberFormat($candyTweened, 0)}
      </span>
    </div>

    <div class="flex items-center gap-3 w-full py-2.5 px-4">
      <GoldIcon />
      <span
        class="text-yellow-200 font-bold"
        id="wallet-gold"
      >
        {numberFormat($tokenTweened)}
      </span>
    </div>

    <div class="flex items-center gap-3 w-fit px-0.5">
      <button
        class="size-10 rounded-2xl bg-slate-500/40 border-2 border-slate-200/50 flex flex-shrink-0 justify-center items-center"
        on:click={openModal}
      >
        <span class="text-white font-extrabold">
          {$userStore.data?.username?.charAt(0)}
        </span>
      </button>
    </div>
  </footer>
</section>

<Modal bind:show={modalSession.show} closable>
  <div class="w-full flex flex-col gap-4">

    <Button block variant="ghost" on:click={addCandies}>
      Add {stars} <CandyIcon class="ml-2" />
    </Button>
    <Button block  variant="ghost" class="mb-8" on:click={addStars}>
      Add {stars} <StarIcon class="ml-2" />
    </Button>

    <Button block variant="secondary" on:click={resetGameState}>
      {#if !sure}
        Reset game state
      {:else}
        Are you sure?
      {/if}
    </Button>
  </div>
</Modal>
