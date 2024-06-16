<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { quartOut } from 'svelte/easing';

  import confetti from 'canvas-confetti';
  import type { Shape } from 'canvas-confetti';

  // Components
  import { CandyIcon, TokenIcon } from "$lib/components/icons";
  import Image from "$lib/components/ui/image/Image.svelte";
  import GirlProgressBar from "./GirlProgressBar.svelte";

  // Helpers
  import Animate from '$lib/helpers/animate';
  import { numberFormat } from '$lib/helpers/math';

  // Types
	import type { IGirl } from "$lib/types/girl";

  // Stores
  import { girlsStore, userStore } from "$lib/stores";

  // Props
  export let girl: IGirl;
  export let index: number;

  // Data
  const dispatcher = createEventDispatcher();
  let locked = false;
  let chanElement: HTMLSpanElement;
  const animate = new Animate();
  const confettiConfig = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.95,
    startVelocity: 10,
    particleCount: 200,
    scalar: 0.6,
    shapes: <Shape[]> ["square"],
  };
  const tweenConfig = {
    duration: 500,
    easing: quartOut,
  }
  let tokenTweened = tweened(girl.token_balance ?? 0, tweenConfig);

  // Reactive
  $: $tokenTweened = girl.token_balance ?? 1;

  // Methods
  const showConfetti = async () => {
    if (chanElement) {
      var rect = chanElement.getBoundingClientRect();
      const x = (rect.left + (rect.width/2)) / document.body.clientWidth;
      const y = (rect.top + (rect.height/2)) / document.body.clientHeight;
      const origin = { x, y };

      const cfg = {
        ...confettiConfig,
        origin
      }

      // confetti(cfg);
      for (let i = 1; i <= 3; i++) {
        setTimeout(() => {
          confetti(cfg);
        }, 450 * i)
      }
    }
  }

  /**
   * Candy feed animation
   * @param count
   */
  const candyAnimation = (count = 1) => {
    const startEl = document.getElementById(`candy-magnit`);
    const targetEl = document.getElementById(`candy-magnit`);
    if (targetEl && startEl) {
      animate.candyFeed(startEl, targetEl, count)
    }
  }

  /**
   * On girl click
   * @param event
   */
  const onClick = (event: MouseEvent ) => {
    try {
      if ($girlsStore.data[index]) {
        const { exp, exp_limit, feed_price, feed_multiplier, token_per_feed, level } = $girlsStore.data[index];
        // const price = feed_price + (level - 1);
        const price = level;

        if ($userStore.data && $userStore.data?.candy >= price) {
          $userStore.data.candy -= price;
          $userStore.data.token += token_per_feed;
          $girlsStore.data[index].token_balance += token_per_feed;

          const {  x, y } = event;
          animate.tokenFly(x, y, token_per_feed)
          // candyAnimation(price)

          if (exp < exp_limit) {
            $girlsStore.data[index].exp += 1;
          }
          else {
            onLevelUp(exp_limit);
          }
        }
        else {
          console.log('Not enough candy');
        }
      }
    }
    catch (e) {
      console.error(e);
    }
  }

  /**
   * On level up
   */
  const onLevelUp = (exp_limit: number) => {
    locked = true;
    setTimeout(() => {
      locked = false;
    }, 2000)

    // Level up
    showConfetti();
    const newLevel = $girlsStore.data[index].level + 1;
    $girlsStore.data[index].level = newLevel;
    $girlsStore.data[index].feed_price += 1;
    $girlsStore.data[index].exp = 0;

    // Update exp limit
    const newExpLimit = parseInt(exp_limit * 1.6);
    $girlsStore.data[index].exp_limit = newExpLimit;

    // Update box points
    let step = 3;
    if (newLevel > 2) {
      step = 4;
    }
    if (newLevel > 5) {
      step = 5;
    }
    if (newLevel >= 9) {
      step = 6;
    }
    const partition = Math.floor(newExpLimit / step);
    const boxPoints = Array(step - 1).fill(0).map((_, i) => {
      return partition * (i + 1);
    });
    $girlsStore.data[index].box_points = [...boxPoints];

    // Dispatch levelup event
    dispatcher('levelup', { girl: $girlsStore.data[index], prize: 250 });
  }
</script>

<div class="w-full flex flex-col justify-center gap-y-4 py-4">
  <GirlProgressBar {girl} />
  <figure class="w-full flex justify-center items-center p2-4 relative z-[4]">
    <button disabled={locked} on:click={onClick} bind:this={chanElement} class="relative z-[2]">
      <Image
        cdn
        src={girl.image}
        class="h-72 {locked ? '' : 'active:translate-y-1.5 active:scale-90 transition-all duration-[40ms]'} "
      />
    </button>

    <span class="absolute size-5 z-[1]" id="candy-magnit" />

    <div class="flex flex-col  absolute bottom-0 left-0">
      <p class="font-bold text-white">
        {girl.name}
      </p>
      <p class="label-small">
        idx {index}
      </p>
    </div>
  </figure>

  <footer class="flex w-full bg-white/10 rounded-lg border-t border-t-black/40 divide-x divide-black/40">
    <div class="flex gap-2 items-center justify-center w-1/3 py-2 px-4">
      <span class="font-bold text-white">
        {girl.feed_price}
      </span>
      <CandyIcon />
    </div>

    <div class="flex gap-3 items-center justify-end w-1/3 py-2 pr-4 ">
      <span class="font-bold text-yellow-200">
        {numberFormat($tokenTweened, 2)}
      </span>
      <TokenIcon />
    </div>

    <div class="flex items-center justify-center gap-3 w-1/3 py-2.5 px-4">
      <span class="text-xs font-extrabold uppercase text-sky-400 relative z-[2] ">
        {girl.rarity}
      </span>
    </div>
  </footer>
</div>
