<script lang="ts">
	// import { goto } from '$app/navigation';
  const VITE_APP_NAME = import.meta.env.VITE_APP_NAME;

  // Components
  import { GirlBuyPlaceholder, GirlModalNewLevel } from '$lib/components/game';
  import Onion from '$lib/components/game/girl/Onion.svelte';

  // Stores
  import { girlsStore } from '$lib/stores';

  // types
	import type { IGirl } from '$lib/types/girl';

  // Data
  let activeGirl: IGirl|null = null;
  let levelUp = false;

  // Methods
  const onLevelUp = (e) => {
    // const prize = e.detail.prize;
    activeGirl = e.detail.girl;
    levelUp = true;
  }

  const onLevelUpClose = () => {
    setTimeout(() => {
      levelUp = false;
      activeGirl = null;
    }, 1000)
  }
</script>

<svelte:head>
	<title>{VITE_APP_NAME}</title>
	<meta name="description" content="Game session" />
</svelte:head>

<section class="h-full-dynamic w-full flex flex-col justify-between relative">
  <div class="relative z-[2] p-4 flex flex-col flex-grow gap-4 mt-20">
    {#if $girlsStore.data.length === 0}
      <GirlBuyPlaceholder />
    {:else}
      <Onion girl={$girlsStore.data[0]} index={0} on:levelup={onLevelUp} />
    {/if}
  </div>
</section>

<GirlModalNewLevel
  girl={activeGirl}
  bind:show={levelUp}
  on:close={onLevelUpClose}
/>
