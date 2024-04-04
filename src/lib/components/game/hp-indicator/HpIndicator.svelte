<script lang="ts">
  import { onMount } from "svelte";


  export let hp: number = 0;
  let max = 0;

  $: width = getWidth(hp);

  const getWidth = () => {
    if (max === 0)
      return 100;

    return  max === hp
      ? 100
      : Math.floor((hp*100)/max);
  }

  onMount(() => {
    max = hp;
  })
</script>

<div class="rounded-lg bg-gray-300/20 px-4 py-2 text-white font-medium flex items-center relative">
  <div class="rounded-lg absolute inset-0 z-0 bg-red-200 transition-all duration-1000" style="width: {width}%" />
  <span class="relative z-10">
    ❤️ {hp}
  </span>
</div>
