<script lang="ts">
  import { onMount } from 'svelte';
  import { confetti } from '@neoconfetti/svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
	import { goto } from '$app/navigation';
  import { delay } from '$lib/helpers/async';

  import type { ConfettiParticleShape } from '@neoconfetti/svelte';

  // Components
  import { Button } from '$lib/components/ui';

  // Data
  let show = false;
  let loading = false;
  const confettiConfig = {
    particleCount: 100,
    particleSize: 8,
    spread: 10,
    startVelocity: 45,
    stageWidth: 900,
    colors: ['#FFF176', '#FFD84F', '#FFA012'],
    duration: 4000,
    particleShape:<ConfettiParticleShape> 'rectangles',
    origin: { y: 0.5, x: 0.5 },
  };

  const amount = tweened(1, {
		duration: 3000,
		easing: cubicOut
	});


  // Methods
  const onNext = async () => {
    loading = true;
    await delay(1000)
    goto('/')
  }

  onMount(() => {
    setTimeout(() => {
      show = true;
      $amount = 320;
    }, 250)
  });
</script>

<div class="pb-5 flex flex-col items-center">
  <picture class="static block w-[240px] h-[240px] -mt-24 mb-6">
    <div class="absolute top-1/2 left-1/2 " use:confetti={confettiConfig} />
    <img src="/images/win-picture.png" alt="win" class=" transition-all duration-1000 size-auto"
      class:scale-50={!show}
      class:opacity-0={!show}
      class:scale-100={show}
      class:opacity-100={show}
    />
  </picture>

  <h2 class="h2 text-center text-white mb-4">
    Вы выиграли матч!
  </h2>

  <div class="w-full text-center mb-8">
    <p class="text-slate-300">
      Ваш выигрыш:
    </p>
    <h1 class="h1 text-white flex justify-center items-center gap-2">
      <img src="/images/ton_symbol.svg" alt="ton" class="size-5">
      <span class="w-14">
        {parseInt(`${$amount}`)}
      </span>
    </h1>
  </div>

  <footer class="w-full flex justify-center">
    <Button on:click={onNext} {loading} disabled={loading} class="!px-20">
      Далее
    </Button>
  </footer>
</div>
