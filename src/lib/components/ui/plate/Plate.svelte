<script lang="ts">

  type UVariants = 'secondary' | 'primary'
  export let variant: UVariants = 'secondary';
</script>

<div class="bt-plate bt-plate--variant-{variant} {$$props.class ?? ''}">
  <slot />
</div>

<style lang="scss">
  .bt-plate {
    @apply rounded-xl px-5 py-4;

    &--variant {
      &-secondary {
        @apply text-white;
        background-color: rgba(255, 255, 255, 0.1);
        // background-color: rgba(33, 72, 139, 0.6);
        // @apply text-whirgb(29, 59, 110)radient-to-br from-indigo-900 to-indigo-950;
      }

      &-primary {
        @apply text-white;
        @apply bg-sky-300/20;
      }
    }
  }
</style>
