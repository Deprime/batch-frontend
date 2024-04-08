<script lang="ts">
  import { onMount } from "svelte";

  // Props
  export let username: string;
  export let hp: number = 0;

  // Data
  let max = 0;
  let state = 4;

  $: width = getWidth(hp);

  const getWidth = ($$hp: number) => {
    if (max === 0)
      return 100;

    const currentWidth = max === $$hp
      ? 100
      : Math.floor(($$hp*100)/max);

    if (currentWidth < 75 && currentWidth >= 50) {
      state = 3;
    }

    if (currentWidth < 50 && currentWidth >= 25) {
      state = 2;
    }

    if (currentWidth < 25) {
      state = 1;
    }

    return currentWidth;
  }

  onMount(() => {
    max = hp;
  })
</script>

<div class="rounded-lg bg-gray-300/20 px-4 py-2 text-white font-medium w-full flex items-center relative">
  <div
    class="rounded-lg absolute inset-0 z-0 transition-all duration-1000"
    class:bg-green-500={state === 4}
    class:bg-yellow-500={state === 3}
    class:bg-orange-500={state === 2}
    class:bg-red-500={state === 1}
    style="width: {width}%"
  />
  <div class="relative z-10 flex w-full">
    <h4 class="h4 flex flex-grow">
      <span class="bg-slate-900/50 inline-flex px-1.5 rounded-lg">
        {username}
      </span>
    </h4>
    <span>
      ❤️ {hp}
    </span>
  </div>
</div>
