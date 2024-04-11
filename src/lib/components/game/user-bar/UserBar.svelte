<script lang="ts">
  import { onMount } from "svelte";
  import confetti from 'canvas-confetti';
  import type { Shape } from 'canvas-confetti';

  // Props
  export let username: string;
  export let hp: number = 0;

  // Data
  let max = 0;
  let state = 4;

  let hpElement: HTMLSpanElement;
  const confettiConfig = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.95,
    startVelocity: 10,
    particleCount: 200,
    scalar: 0.6,
    shapes: <Shape[]> ["square"],
    // flat: true,
    colors: ['FB1010', 'BA0000', 'BA2100']
  };

  $: showConfetti(hp)
  $: width = getWidth(hp);

  // Methods
  const showConfetti = async (_hp: number) => {
    if (hpElement) {
      var rect = hpElement.getBoundingClientRect();
      const x = rect.left / document.body.clientWidth;
      const y = rect.top / document.body.clientHeight;
      const origin = { x, y };

      confetti({
        ...confettiConfig,
        scalar: 0.4,
        origin
      });
      setTimeout(() => {
        confetti({
        ...confettiConfig,
          origin
        });
      }, 200)

      setTimeout(() => {
        confetti({
        ...confettiConfig,
          origin
        });
      }, 350)
    }
  }

  /**
   * Get bar width
   * @param {Number} $$hp
   */
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

<div class="rounded-r-lg border-stone-400/50 border w-full">
  <div class="rounded-r-lg bg-gray-300/20 px-4 py-2 text-white font-medium w-full h-full flex items-center relative">
    <div
      class="rounded-r-lg absolute inset-0 z-0 transition-all duration-1000"
      class:bg-green-500={state === 4}
      class:bg-yellow-500={state === 3}
      class:bg-orange-500={state === 2}
      class:bg-red-500={state === 1}
      style="width: {width}%"
    />
    <div class="relative z-10 flex w-full">
      <h4 class="h4 flex flex-grow">
        <span class="bg-slate-900/50 inline-flex px-2 rounded">
          {username}
        </span>
      </h4>
      <span bind:this={hpElement} class="relative font-bold">
        ❤️ {hp}
      </span>
    </div>
  </div>
</div>
