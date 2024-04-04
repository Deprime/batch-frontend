<script lang="ts">
	import { goto } from '$app/navigation';
  const VITE_APP_NAME = import.meta.env.VITE_APP_NAME;

  // Components
  import { Button } from '$lib/components/ui';

  /**
   * Go to match
   */
  const onMatchClick = () => {
    goto('/game')
  }
</script>

<svelte:head>
	<title>{VITE_APP_NAME}</title>
	<meta name="description" content="Game session" />
</svelte:head>

<section class="h-full-dynamic py-5 flex flex-col relative">
  <footer class="w-full fixed bottom-10 flex justify-center gap-4 px-5">
    <Button class="!w-full" on:click={onMatchClick}>
      <span class="absolute left-5">
        ⚔️
      </span>
      Найти матч
    </Button>
  </footer>
</section>
