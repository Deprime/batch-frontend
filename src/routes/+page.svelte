<script lang="ts">
  const VITE_APP_NAME = import.meta.env.VITE_APP_NAME;
	import stone from '$lib/images/cards/stone-default.jpg';
	import sword from '$lib/images/cards/sword-default.jpg';
	import paper from '$lib/images/cards/paper-default.jpg';

  interface ICard {
    id: number,
    title: string,
    src: string,
    selected: boolean,
    active: boolean,
  }

  const cards: ICard[] = [
    {id: 1, title: "Камень", src: stone, selected: false, active: false,},
    {id: 2, title: "Ножницы", src: sword, selected: false, active: false,},
    {id: 3, title: "Бумага", src: paper,  selected: false, active: false,},
  ];

  let activeCard: ICard|null = null;

  // Methods
  const resetDeckState = () => {
    cards.forEach((el, index) => {
      if (cards[index].selected) {
        cards[index].selected = false;
      }
    });
  }

  const onActivate = (card: ICard) => {
    if (card.selected) {
      console.log('selected')
      card.selected = false;
      card.active = true;
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
	<!-- <meta name="description" content="Svelte demo app" /> -->
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

  <div class="w-full flex flex-col flex-grow justify-center items-center px-5">
    <div class="bg-gray-700 w-full h-full flex justify-center items-center rounded-xl">
      <p class="text font-medium text-gray-200">
        Секция игры и анимаций
      </p>
    </div>
  </div>

  <div class="grid grid-cols-3 gap-4 p-5">
    {#each cards as card}
      <button
        class="card"
        class:card--selected={card.selected}
        on:click={() => { onActivate(card) }}
      >
        <img
          src={card.src}
          alt={card.title}
          class="card-image"
        >
        <p class="card-title">
          {card.title}
        </p>
      </button>
    {/each}
  </div>

  <footer class="w-full flex justify-center">
    <button class="rounded-lg px-5 py-2.5 flex justify-center w-fit min-w-40 transition-all bg-blue-700 active:bg-blue-800 text-white text-sm font-medium active:translate-y-1">
      Boost
    </button>
  </footer>
</section>

<style  scoped lang="scss">
  .card {
    @apply flex flex-col items-center justify-between;
    @apply transition-all rounded-md bg-gray-200;
    @apply w-28 h-36 p-0.5;

    &-title {
      @apply text-sm font-medium text-gray-900 pb-1.5;
    }

    &-image {
      @apply rounded-md w-full;
    }

    &--selected {
      @apply -translate-y-6;
      box-shadow: 0 24px 0  rgba(255, 255, 255, 0.3);
    }
  }
</style>
