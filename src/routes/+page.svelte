<script lang="ts">
	// import { goto } from '$app/navigation';
  const VITE_APP_NAME = import.meta.env.VITE_APP_NAME;

  // Components
  import { Button, Plate, Modal } from '$lib/components/ui';
  import { MatchSearch } from '$lib/components/game';
  import { Gamepad2 } from 'lucide-svelte';
  import userStore from '$lib/stores/user';

  // Data
  const modalMatchSearch = {
    show: false,
  };

  // Methods
  /**
   * Go to match
   */
  const onMatchClick = () => {
    modalMatchSearch.show = true;
  }

  const closeSearchModal = () => {
    modalMatchSearch.show = false;
  }
</script>

<svelte:head>
	<title>{VITE_APP_NAME}</title>
	<meta name="description" content="Game session" />
</svelte:head>

<section class="h-full-dynamic py-5 flex flex-col relative gap-5 px-5">
  <Plate class="flex justify-between">
    <div>
      <h3 class="h3 mb-2">
        {$userStore.data?.username}
      </h3>
      <p class="text-sm text-gray-200">
        Уровень 4
      </p>
      <p class="text-sm text-gray-200">
        Бронзовая лига
      </p>
    </div>

    <figure class="size-20 rounded-lg bg-slate-500 flex justify-center items-center text-white">
      <Gamepad2 size={40} />
    </figure>
  </Plate>

  <div class="flex gap-5">
    <Plate class="flex  justify-between items-center gap-4 w-fit">
      <img src="/images/ton_symbol.svg" alt="ton" class="size-5">
      <span class="text-sky-300 font-bold text-lg">
        3408
      </span>
    </Plate>

    <Plate class="flex flex-grow items-center gap-3 w-fit font-semibold">
      <span class="text-xl">
        🤝
      </span>
       Рефералы
    </Plate>
  </div>

  <footer class="w-full sticky bottom-10 flex justify-center gap-4">
    <Button class="!w-full !py-4 gap-2" on:click={onMatchClick}>
      <span>
        ⚔️
      </span>
      Найти матч
    </Button>
  </footer>
</section>

<Modal bind:show={modalMatchSearch.show}>
  <MatchSearch on:cancel={closeSearchModal} />
</Modal>
