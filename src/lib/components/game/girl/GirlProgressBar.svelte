<script lang="ts">
  // Props
  export let exp = 0;

  // Data
  let max = 20;
  let state = 1;

  $: width = getWidth(exp);

  /**
   * Get bar width
   * @param {Number} $$val
   */
  const getWidth = ($$val: number) => {
    if (max === 0)
      return 100;

    const currentWidth = max === $$val
      ? 100
      : Math.floor(($$val*100)/max);

    if (currentWidth > 80) {
      state = 5;
    }

    if (currentWidth < 80 && currentWidth >= 60) {
      state = 4;
    }

    if (currentWidth < 60 && currentWidth >= 40) {
      state = 3;
    }

    if (currentWidth < 40 && currentWidth >= 20) {
      state = 2;
    }

    if (currentWidth < 20) {
      state = 1;
    }

    return currentWidth;
  }
</script>

<div class="rounded-lg bg-gray-300/20 px-4 py-2 text-white font-medium w-full h-full flex items-center relative overflow-hidden">
  <div
    class="rounded-lg absolute inset-0 z-0 transition-all duration-1000  overflow-hidden"
    class:bg-amber-500={state === 5}
    class:bg-amber-400={state === 4}
    class:bg-yellow-400={state === 3}
    class:bg-yellow-300={state === 2}
    class:bg-yellow-200={state === 1}
    style="width: {width}%"
  >
    <div class="absolute inset-x-0 top-0 w-full h-1/2 z-[1] bg-white/30" />
  </div>
</div>
