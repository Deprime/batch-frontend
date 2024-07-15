<script lang="ts">
	import { goto } from '$app/navigation';
  const VITE_APP_NAME = import.meta.env.VITE_APP_NAME;

  // Components
  import {
    StoreIcon,
    SquareCheckIcon,
    GiftIcon,
    HeartIcon,
    // SwordsIcon
  } from 'lucide-svelte';
  import { Button } from '$lib/components/ui';
  import { GirlCard, GirlBuyPlaceholder, GirlModalNewLevel } from '$lib/components/game';
  import { Profile } from '$lib/components/widgets';

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

  const gotoHome = () => {
    // goto('/')
  }

  const gotoStore = () => {
    // goto('/store')
  }

  const gotoMarket = () => {
    goto('/market')
  }
</script>

<svelte:head>
	<title>{VITE_APP_NAME}</title>
	<meta name="description" content="Game session" />
</svelte:head>

<section class="h-full-dynamic w-full flex flex-col justify-between relative">
  <div class="size-0 absolute z-[1] top-10 right-10 glow-purple" />
  <div class="size-0 absolute z-[1] bottom-32 left-10 glow-blue" />

  <div class="relative z-10 p-4 flex mb-4">
    <Profile />
  </div>

  <div class="relative z-[2] p-4 flex flex-col flex-grow gap-4">
    {#if $girlsStore.data.length === 0}
      <GirlBuyPlaceholder />
    {:else}
      <GirlCard girl={$girlsStore.data[0]} index={0} on:levelup={onLevelUp} />

      <!--
      {#each $girlsStore.data as girl, index}
        <GirlCard {girl} {index} on:levelup={onLevelUp} />
      {/each}
      -->
    {/if}
  </div>

  {#if $girlsStore.data.length > 0}
    <nav class="flex justify-between gap-2 px-4 pb-8">
      <Button variant="secondary" class="cgap-3 flex flex-col" on:click={gotoMarket}>
        <StoreIcon />
        <span class="text-[11px] leading-3 font-normal absolute top-full pt-1">
          Маркет
        </span>
      </Button>

      <Button variant="secondary" class="gap-3 flex flex-col" on:click={gotoStore}>
        <GiftIcon />
        <span class="text-[11px] leading-3 font-normal absolute top-full pt-1">
          Боксы
        </span>
      </Button>

      <Button variant="secondary" class="gap-3 flex flex-col" on:click={gotoHome}>
        <HeartIcon />
        <span class="text-[11px] leading-3 font-normal absolute top-full pt-1">
          Тянки
        </span>
      </Button>

      <Button variant="secondary" class="gap-2 flex flex-col">
        <span>
          🤝
        </span>
        <span class="text-[11px] leading-3 font-normal absolute top-full pt-1">
          Друзья
        </span>
      </Button>

      <Button variant="secondary" class="gap-2 flex flex-col">
        <SquareCheckIcon />
        <span class="text-[11px] leading-3 font-normal absolute top-full pt-1">
          Задания
        </span>
      </Button>
    </nav>
  {/if}
</section>

<GirlModalNewLevel
  girl={activeGirl}
  bind:show={levelUp}
  on:close={onLevelUpClose}
/>
