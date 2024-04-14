<script lang="ts">
  import { createEventDispatcher } from "svelte";
	import type { ICard } from "./type";

  // Props
  export let card: ICard;
  export let disabled = false;
  export let visible = true;
  export let flipped = false;
  export let fail = false;
  export let first = false;

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
  class:card--fail={fail}
  class:card--first={first}
  class:card--second={!first}
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
    @apply transition-all rounded-md bg-gradient-to-br from-stone-100 to-stone-300;
    @apply w-full max-w-[106px] h-[136px] p-0.5;

    &--fail {
      @apply transition-all duration-500;

      &.card--first {
        clip-path:
          polygon(
            0% 0%,
            100% 0%,
            100% 35%,
            0% 65%,
          );
        @apply -rotate-3 -translate-y-4 -translate-x-2;
      }
      &.card--second {
        clip-path:
          polygon(
            0% 65%,
            100% 35%,
            100% 100%,
            0 100%,
          );
        @apply rotate-3 translate-y-4 translate-x-2;
      }
    }

    &-title {
      @apply text-sm font-semibold text-gray-800 pb-1;
    }

    &-image {
      @apply rounded-md w-full min-w-[102px];
    }

    &--selected {
      @apply -translate-y-6;
    }

    &--active {
      box-shadow: 4px 4px 30px 0 rgba(39, 39, 39, 0.5);
    }
  }
</style>
