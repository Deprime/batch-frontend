<script lang="ts">
  // Props
  export let size: 'xs'|'sm'|'md'|'lg'|'xl' = 'md';
</script>

<div class="rounded-full border-4 border-blue-900/35 border-r-sky-400/50 bt-loader bt-loader--size-{size}" />

<style lang="scss">
  .bt-loader {
    animation: spinner 0.7s infinite linear;
    transition: all 400ms ease-in-out;

    &--size {
      &-xs {
        @apply size-4 border-[2px];
      }
      &-sm {
        @apply size-6 border-[3px];
      }
      &-md {
        @apply size-8 border-[4px];
      }
      &-lg {
        @apply size-10 border-[6px];
      }
      &-xl {
        @apply size-16 border-[7px];
      }
    }
  }

  @keyframes spinner {
    to {
      transform: rotate(1turn);
    }
  }
</style>
