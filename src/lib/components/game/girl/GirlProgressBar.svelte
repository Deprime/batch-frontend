<script lang="ts">
  import { Modal } from "$lib/components/ui";
	import type { IGirl } from "$lib/types/girl";

  // Props
  export let girl: IGirl;

  // Data
  let state = 1;
  let width = 0;
  let boxProgress = [];

  $: onProgressChange(girl.exp);

  /**
   * Get bar width
   * @param {Number} $$val
   */
  const getProgressWidth = ($$val: number) => {
    if (girl.exp_limit === 0)
      width = 100;

    const currentWidth = girl.exp_limit === $$val
      ? 100
      : Math.floor(($$val*100)/girl.exp_limit);

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

    width = currentWidth;
  }

  /**
   * On duck progress change
   **/
  function onProgressChange($$exp: number) {
    getProgressWidth($$exp);

    boxProgress = girl.box_points.map(exp => {
      const padding = parseInt((exp * 100) / girl.exp_limit)
      const done = $$exp >= exp;
      return { exp, padding, done }
    });
  }
</script>

<div class="flex items-center justify-center">
  <div
    class="relative overflow-hidden z-[2] w-9 h-7 flex justify-center items-center rounded-md flex-shrink-0 ring-2 ring-black/60"
    class:bg-amber-500={state === 5}
    class:bg-amber-400={state === 4}
    class:bg-yellow-400={state === 3}
    class:bg-yellow-300={state === 2}
    class:bg-yellow-200={state === 1}
  >
    <div class="absolute inset-x-0 top-0 w-full h-1/2 z-[1] bg-white/30" />
    <span class="flex text-base leading-4 font-extrabold text-black">
      {girl.level}
    </span>
  </div>
  <div class="rounded-md bg-gray-300/20 px-4 py-2 -ml-2 text-white font-medium w-full h-4 flex items-center relative">
    <div
      class="rounded-r-md absolute inset-0 left-2 z-0 transition-all duration-500 overflow-hidden"
      class:bg-amber-500={state === 5}
      class:bg-amber-400={state === 4}
      class:bg-yellow-400={state === 3}
      class:bg-yellow-300={state === 2}
      class:bg-yellow-200={state === 1}
      style="width: {width}%"
    >
      <div class="absolute inset-x-0 top-0 w-full h-1/2 z-[1] bg-white/30" />
    </div>

    {#each boxProgress as box}
      <div
        class="absolute top-[-3px] z-[3] ml-[-4px] transition-all duration-700 {box.done ? "opacity-0 scale-[2.5]" : ""}"
        style="left: {box.padding}%"
      >
        <span
          class="flex justify-center items-center rounded-full size-5 bg-amber-400 text-sm text-black/85 font-extrabold"
          id="girl-{girl.id}-box-progress-{box.exp}"
        >
          ?
        </span>
      </div>
    {/each}
  </div>
</div>
