<script lang="ts">
  import { createEventDispatcher } from "svelte";

  // Props
  export let variant = "primary";
  export let disabled = false;

  // Data
  const dispatch = createEventDispatcher();

  // Methods
  const onClick = (e) => {
    if (!disabled) {
      dispatch('click', e);
    }
  }
</script>

<button
  {disabled}
  class="bt-button bt-button--variant-{variant} {$$props.class}"
  on:click={onClick}
>
  <slot />
</button>

<style lang="scss">
  .bt-button {
    @apply relative;
    @apply px-4 py-2.5;
    @apply flex justify-center w-fit;
    @apply rounded-lg transition-all active:translate-y-1;
    @apply font-medium;

    &--variant {
      &-secondary {
        @apply text-stone-200;
        @apply bg-gradient-to-r from-stone-100/20 to-stone-200/20;
      }
      &-primary {
        @apply text-purple-100;
        @apply bg-gradient-to-r from-purple-400/30 to-purple-500/30;
        // @apply bg-purple-600/40 active:bg-purple-600/60 text-purple-200;
      }
    }
  }
</style>
