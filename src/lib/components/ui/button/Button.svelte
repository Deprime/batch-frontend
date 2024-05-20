<script lang="ts">
  import { createEventDispatcher } from "svelte";

  // Components
  import Loader from "../loader/Loader.svelte";

  // Props
  export let variant: 'primary' | 'secondary' | 'yellow' | 'ghost' = "primary";
  export let disabled = false;
  export let loading = false;

  // Data
  let touch = false;
  const dispatch = createEventDispatcher();

  // Methods
  /**
   * On click event
   * @param e
   */
  const onClick = (e) => {
    if (!disabled) {
      dispatch('click', e);
    }
  }

  /**
   * Touch start event
   * @description binded additional animation
   */
  const onTouchStart = () => {
    if (!disabled) {
      touch = true;
    }
  };

  /**
   * Touch end event
   */
  const onTouchEnd = () => {
    touch = false;
  };
</script>

<button
  {disabled}
  class="bt-button bt-button--variant-{variant} {$$props.class}"
  class:translate-y-0.5={touch}

  on:click={onClick}
  on:touchstart={onTouchStart}
  on:touchend={onTouchEnd}
>
  {#if loading}
    <Loader size="sm"  />
  {:else}
    <slot />
  {/if}
</button>

<style lang="scss">
  .bt-button {
    @apply relative;
    @apply px-4 py-3;
    @apply flex items-center justify-center w-fit;
    @apply rounded-xl transition-all active:translate-y-1;
    @apply font-bold subpixel-antialiased;

    &--variant {
      &-secondary {
        @apply text-white;
        @apply bg-white/10;
        @apply border border-white/10;
      }

      &-primary {
        @apply text-black;
        background-color: var(--green-base);
      }

      &-yellow {
        @apply text-black;
        background-color: var(--yellow-base);
      }

      &-ghost {
        @apply text-white;
        @apply bg-blue-600/10;
        @apply border-2 border-blue-600/40;
      }
    }
  }
</style>
