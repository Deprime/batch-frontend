<script lang="ts">
  import confetti from 'canvas-confetti';
  import type { Shape } from 'canvas-confetti';

  // Components
  import CandyIcon from "$lib/components/icons/CandyIcon.svelte";
  import Image from "$lib/components/ui/image/Image.svelte";
  import GirlProgressBar from "./GirlProgressBar.svelte";

  // Helpers
  import Animate from '$lib/helpers/animate';

  // Types
	import type { IGirl } from "$lib/types/girl";

  // Stores
  import { girlsStore, userStore } from "$lib/stores";

  // Props
  export let girl: IGirl;
  export let index: number;

  // Data
  let locked = false;
  let chanElement: HTMLSpanElement;
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
    // colors: ['FB1010', 'BA0000', 'BA2100']
  };
  const animate = new Animate();

  // Methods
  const showConfetti = async () => {
    if (chanElement) {
      var rect = chanElement.getBoundingClientRect();
      const x = (rect.left + (rect.width/2)) / document.body.clientWidth;
      const y = (rect.top + (rect.height/2)) / document.body.clientHeight;
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
      }, 400)

      setTimeout(() => {
        confetti({
        ...confettiConfig,
          origin
        });
      }, 800)
    }
  }

  /**
   * On girl click
   */
  const onClick = () => {
    try {
      if ($girlsStore.data[index]) {
        const { exp, exp_limit, feed_price, feed_multiplier, token_per_feed, level } = $girlsStore.data[index];
        // const price = feed_price + (level - 1);
        const price = level;

        if ($userStore.data && $userStore.data?.candy >= price) {
          $userStore.data.candy -= price;
          $userStore.data.token += token_per_feed;
          $girlsStore.data[index].token_balance += token_per_feed;

          const startEl = document.getElementById(`candy-magnit`);
          const targetEl = document.getElementById(`candy-magnit`);
          if (targetEl && startEl) {
            animate.candyFly(startEl, targetEl, price)
          }

          if (exp < exp_limit) {
            $girlsStore.data[index].exp += 1;
          }
          else {
            locked = true;
            setTimeout(() => {
              locked = false;
            }, 2000)

            // Level up
            showConfetti();
            $girlsStore.data[index].level += 1;
            $girlsStore.data[index].feed_price += 1;
            $girlsStore.data[index].exp = 0;
            $girlsStore.data[index].exp_limit = parseInt(exp_limit * 1.6);

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
</script>

<div class="w-full flex flex-col justify-center gap-y-4 py-4">
  <GirlProgressBar exp={girl.exp} max={girl.exp_limit} level={girl.level} />
  <figure class="w-full flex justify-center items-center p2-4 relative z-[4]">
    <button disabled={locked}  on:click={onClick} bind:this={chanElement} class="relative z-[2]">
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

  <footer class="flex w-full gap-5 bg-white/10 rounded-lg border-t border-t-black/40 divide-x divide-black/40">
    <div class="flex flex-col items-center justify-center gap-1 w-1/3 py-2 px-4">
      <p class="font-bold text-white flex justify-end items-center gap-2 w-full">
        {girl.feed_price} <CandyIcon />
      </p>
      <!-- <p class="label-small">Feed cost</p> -->
    </div>

    <div class="flex items-center gap-3 w-2/3 py-2.5 px-4">
      <div class="flex flex-grow justify-center bg-blue-400 px-2 py-1 relative overflow-hidden rounded">
        <div class="absolute inset-x-0 top-0 w-full h-1/2 z-[1] bg-white/30" />
        <span class="text-sm font-extrabold uppercase text-blue-950 relative z-[2] ">
          {girl.rarity}
        </span>
      </div>
    </div>
  </footer>
</div>
