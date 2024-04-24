<script lang="ts">
	import { goto } from '$app/navigation';
  const VITE_APP_NAME = import.meta.env.VITE_APP_NAME;

  // Components
  import { StoreIcon, SquareCheckIcon, SwordsIcon } from 'lucide-svelte';

  import { Button, Modal } from '$lib/components/ui';
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

  const gotoMarket = () => {
    goto('/market')
  }
</script>

<svelte:head>
	<title>{VITE_APP_NAME}</title>
	<meta name="description" content="Game session" />
</svelte:head>

<section class="h-full-dynamic relative">
  <div class="size-0 absolute z-[1] top-10 right-10 glow-purple" />
  <div class="size-0 absolute z-[1] bottom-32 left-10 glow-blue" />

  <div class="relative z-[2] p-5 flex flex-col gap-4">
    <Profile />

    <footer class="w-full sticky bottom-10 flex flex-col justify-center gap-4">
      <Button class="!w-full gap-2" on:click={onMatchClick}>
        <SwordsIcon />
        Играть
      </Button>
    </footer>

    <nav class="grid grid-cols-2 gap-4">
      <Button variant="secondary" class="!w-full gap-2">
        <SquareCheckIcon />
        Задания
      </Button>

      <Button variant="secondary" class="!w-full gap-2">
        <span>
          🤝
        </span>
        Друзья
      </Button>

      <Button variant="secondary" class="!w-full col-span-2 gap-3" on:click={gotoMarket}>
        <StoreIcon />
        Маркет
      </Button>
    </nav>

    <TaskList />
  </div>
</section>

<Modal bind:show={modalMatchSearch.show}>
  <MatchSearch on:cancel={closeSearchModal} />
</Modal>
