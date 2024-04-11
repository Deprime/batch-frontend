<script lang="ts">
  import { createEventDispatcher } from "svelte";

  // Components
  import Loader from "../loader/Loader.svelte";

  // Props
  export let variant: 'primary' | 'secondary' | 'yellow' | 'ghost' = "primary";
  export let disabled = false;
  export let loading = false;

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
        @apply bg-slate-500;
        text-shadow: 0px 1px 1px rgb(67, 79, 97);
        box-shadow: 0px 3px 0 0 rgb(67, 79, 97);
      }

      &-primary {
        @apply text-white;
        @apply bg-blue-500;
        text-shadow: 0px 1px 1px rgb(29, 84, 173);
        box-shadow: 0px 3px 0 0 rgb(29, 84, 173);
      }

      &-yellow {
        @apply font-extrabold;
        @apply text-gray-800;
        // @apply bg-yellow-400;
        @apply bg-gradient-to-b from-yellow-300 to-yellow-400;
        box-shadow: 0px 3px 0 0 rgb(194, 156, 6);
      }

      &-ghost {
        @apply text-white;
        @apply bg-blue-600/10;
        @apply border-2 border-blue-600/40;
      }
    }
  }
</style>
