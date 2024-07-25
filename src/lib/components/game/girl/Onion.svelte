<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import confetti from 'canvas-confetti';
  import type { Shape } from 'canvas-confetti';

  // Components
  import Image from "$lib/components/ui/image/Image.svelte";
  // import GirlProgressBar from "./GirlProgressBar.svelte";
  import ProgressBar from './ProgressBar.svelte';

  // Helpers
  import Animate from '$lib/helpers/animate';
  import { numberFormat, fibo } from '$lib/helpers/math';

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
  let clicked = false;
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
   * On girl click
   * @param event
   */
  const onTap = (event: PointerEvent ) => {
    try {
      if ($girlsStore.data[index]) {
        const {
          exp,
          exp_limit,
          // feed_price,
          // feed_multiplier,
          token_per_feed,
          level
        } = $girlsStore.data[index];
        // const price = feed_price + (level - 1);
        const price = level;

        if ($userStore.data && $userStore.data?.energy > 0) {
          clicked = true;
          // $userStore.data.candy -= price;
          const newFeedPerClick = token_per_feed+25;
          $userStore.data.token += newFeedPerClick;
          $girlsStore.data[index].token_balance += newFeedPerClick;

          const x = event.layerX;
          const y = event.layerY;
          animate.tokenFly(x, y, girl.id, newFeedPerClick);

          $userStore.data.energy -= 1;
          // candyAnimation(price);

          if (exp < exp_limit) {
            $girlsStore.data[index].exp += newFeedPerClick;
          }
          else {
            onLevelUp(exp_limit);
          }

          setTimeout(() => {
            clicked = false;
          }, 50)
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

    const $$girl = {...$girlsStore.data[index]};
    const newLevel = $$girl.level + 1;
    $$girl.level = newLevel;
    $$girl.feed_price += 1;

    const newTokenPerFeed = parseFloat(numberFormat($$girl.token_per_feed + (fibo(newLevel) * 0.33)));
    $$girl.token_per_feed = newTokenPerFeed;
    $$girl.exp = 0;

    // Update exp limit
    const newExpLimit = parseInt(exp_limit * 1.6);
    $$girl.exp_limit = newExpLimit;

    // Update box points
    let step = 5;
    // if (newLevel > 2) {
    //   step = 4;
    // }
    // if (newLevel > 5) {
    //   step = 5;
    // }
    // if (newLevel >= 9) {
    //   step = 6;
    // }
    const partition = Math.floor(newExpLimit / step);
    const boxPoints = Array(step - 1).fill(0).map((_, i) => {
      return partition * (i + 1);
    });
    $$girl.box_points = [...boxPoints];

    $girlsStore.data[index] = {...$$girl};

    // Dispatch levelup event
    dispatcher('levelup', { girl: $$girl, prize: 250 });
  }
</script>

<div class="w-full flex flex-col justify-center gap-y-8 py-4">
  <figure class="w-full flex justify-center items-center py-4  relative z-[4]">
    <div
      class="flex justify-center items-center relative"
    >
      <button
        disabled={locked}
        on:pointerup={onTap}
        bind:this={chanElement}
        class="relative flex justify-center items-center z-[4] size-72"
      >
      </button>
      <Image
        src="/images/onion.png"
        class="h-72 absolute z-[2] transition-all duration-[50ms] {!locked && clicked ? 'translate-y-0.5 scale-[0.90]' : ''} "
      />
      <!-- <span class="absolute size-5 z-[2]" id="candy-magnit" /> -->
      <div class="absolute z-[3] size-72" id="girl-{girl.id}-clicker" />
    </div>
  </figure>
  <ProgressBar {girl} />
</div>
