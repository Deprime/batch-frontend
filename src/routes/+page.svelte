<script lang="ts">
	// import { goto } from '$app/navigation';
  const VITE_APP_NAME = import.meta.env.VITE_APP_NAME;

  // Components
  import { Button, Plate, Modal } from '$lib/components/ui';
  import { MatchSearch } from '$lib/components/game';
  import { TaskList, Profile } from '$lib/components/widgets';

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

<section class="h-full-dynamic relative">
  <div class="size-0 absolute z-[1] top-10 right-10 glow-purple" />
  <div class="size-0 absolute z-[1] bottom-32 left-10 glow-blue" />

  <div class="relative z-[2] p-5 flex flex-col gap-5">
    <Profile />

    <div class="flex gap-5">
      <Plate class="flex items-center gap-4 w-full">
        <img src="/images/chainlink.png" alt="ton" class="size-7 brightness-95">
        <span class="text-yellow-200 font-bold text-lg">
          3408
        </span>
      </Plate>

      <Plate class="flex items-center gap-4 w-full">
        <img src="/images/ton.png" alt="ton" class="size-7 brightness-125">
        <span class="text-blue-200 font-bold text-lg">
          24
        </span>
      </Plate>
    </div>

    <footer class="w-full sticky bottom-10 flex flex-col justify-center gap-4">
      <Button class="!w-full gap-2" on:click={onMatchClick}>
        <span>
          ⚔️
        </span>
        Найти матч
      </Button>
    </footer>

    <Plate class="flex items-center gap-3 font-semibold">
      <span class="text-xl">
        🤝
      </span>
      Рефералы
    </Plate>

    <TaskList />
  </div>
</section>

<Modal bind:show={modalMatchSearch.show}>
  <MatchSearch on:cancel={closeSearchModal} />
</Modal>
