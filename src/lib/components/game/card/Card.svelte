<script lang="ts">
  import { createEventDispatcher } from "svelte";
	import type { ICard } from "./type";

  // Props
  export let card: ICard;
  export let disabled = false;
  export let visible = true;
  export let flipped = false;

  // Data
  const dispatch = createEventDispatcher();

  // Methods
  const onClick = () => {
    if (!disabled) {
      dispatch('click', card);
    }
  }
</script>

<button
  class="card"
  class:opacity-0={!visible}
  class:card--selected={card.selected}
  class:card--active={card.active}
  on:click={onClick}
>
  <img
    src="/images/cards/{card.src}.png"
    alt={card.title}
    class="card-image"
    class:opacity-0={flipped}
  >
  <p
    class="card-title"
    class:opacity-0={flipped}
  >
    {card.title}
  </p>
</button>


<style  scoped lang="scss">
  .card {
    @apply flex flex-col items-center justify-between;
    @apply transition-all rounded-md bg-gradient-to-br from-gray-200 to-gray-400;
    @apply w-full max-w-[106px] h-[136px] p-0.5;

    &-title {
      @apply text-sm font-semibold text-gray-800 pb-1;
    }

    &-image {
      @apply rounded-md w-full min-w-[102px];
    }

    &--selected {
      @apply -translate-y-6;
    }

    &--active {}
  }
</style>
