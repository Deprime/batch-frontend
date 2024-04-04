<script lang="ts">
  // Props
</script>
<div class="size-16 rounded-full border-4 border-purple-600 border-r-purple-300 bt-loader" />

<style lang="scss">
  .bt-loader {
    animation: spinner 1s infinite linear;
    transition: all 450ms ease;
  }

  @keyframes spinner {
    to {
      transform: rotate(1turn);
    }
  }
</style>
