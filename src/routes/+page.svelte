<script lang="ts">
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

  // Components
  import { Button } from '$lib/components/ui';
  import { Card } from '$lib/components/game';
  import { RefreshCcw } from 'lucide-svelte';

  import type { ICard } from '$lib/components/game/card/type';

  const VITE_APP_NAME = import.meta.env.VITE_APP_NAME;

  const DEFAULT_CARDS: ICard[] = [
    {id: 1, title: "Камень", src: "stone-default", selected: false, active: false,},
    {id: 2, title: "Ножницы", src: "sword-default", selected: false, active: false,},
    {id: 3, title: "Бумага", src: "paper-default",  selected: false, active: false,},
  ];
  const flyConfig = {
    delay: 150,
    duration: 700,
    x: 0,
    y: 10,
    opacity: 0,
    easing: quintOut
  };

  let cards: ICard[] = DEFAULT_CARDS.map(el => ({...el}));
  let activeCard: ICard|null = null;

  // Methods
  const resetGame = () => {
    resetDeck();
    activeCard = null;
    console.log(cards)
    console.log(DEFAULT_CARDS)
  }

  const resetDeck = () => {
    cards = DEFAULT_CARDS.map(el => ({...el}));
  }

  const onActivate = (card: ICard) => {
    if (activeCard) {
      return;
    }

    if (card.selected) {
      const index = cards.findIndex(el => el.id === card.id) as number;
      cards[index].selected = false;
      cards[index].active = true;
      activeCard = {...card};
    }
    else {
      cards.forEach((el, index) => {
        cards[index].selected = el.id === card.id;
      });
    }
  }
</script>

<svelte:head>
	<title>{VITE_APP_NAME}</title>
	<meta name="description" content="Game session" />
</svelte:head>

<section class="h-full-dynamic py-5 flex flex-col justify-between relative">
  <div  class="grid grid-cols-3 gap-4 p-5">
    {#each cards as card}
      <div
        class="flex flex-col items-center justify-end rounded-md p-0.5 bg-gray-200 h-[134px]"
      >

        <p class="text-sm font-medium opacity-0 py-1">
          {card.title}
        </p>
      </div>
    {/each}
  </div>

  <div class="relative w-full flex flex-col flex-grow justify-center items-center px-5">
    <div class="bg-gray-700/30 w-full h-full flex justify-center items-center rounded-xl">
      <div class="text font-medium text-gray-300">
        {#if !activeCard}
          <p in:fly={flyConfig}>Выбери карту...</p>
        {:else}
          <p in:fly={flyConfig}>Ждем хода соперника...</p>
        {/if}
      </div>
    </div>

    {#if activeCard}
      <div class="absolute bottom-5">
        <Card card={activeCard} />
      </div>
    {/if}
  </div>

  <div class="grid grid-cols-3 gap-4 p-5">
    {#each cards as card}
      <div class="transition-all duration-500 w-full bg-slate-700 rounded-md">
        <Card {card} on:click={() => { onActivate(card) }} visible={!card.active} />
      </div>
    {/each}
  </div>

  <footer class="w-full flex justify-center gap-4 px-5">
    <div>
      <Button variant="secondary" on:click={resetGame}>
        <RefreshCcw />
      </Button>
    </div>

    <div class="flex flex-grow">
      <Button class="!w-full">
        <span class="absolute left-5">
          🚀
        </span>
        Boosters
      </Button>
    </div>

    <div class="opacity-0">
      <Button disabled on:click={resetGame}>
        123
      </Button>
    </div>
  </footer>
</section>
