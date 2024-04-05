<script lang="ts">

  type UVariants = 'secondary' | 'primary'
  export let variant: UVariants = 'secondary';
</script>

<div class="bt-plate bt-plate--variant-{variant} {$$props.class ?? ''}">
  <slot />
</div>

<style lang="scss">
  .bt-plate {
    @apply rounded-xl px-6 py-5;

    &--variant {
      &-secondary {
        @apply text-white bg-gradient-to-br from-slate-600 to-slate-700;
      }
    }
  }
</style>
