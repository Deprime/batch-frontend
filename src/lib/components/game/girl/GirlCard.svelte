<script lang="ts">
  // Components
  import Image from "$lib/components/ui/image/Image.svelte";
  import GirlProgressBar from "./GirlProgressBar.svelte";

  // Types
	import type { IGirl } from "$lib/constants/mock";

  import { girlsStore } from "$lib/stores";

  // Props
  export let girl: IGirl;
  export let index: number;

  // Data

  let exp = 0;

  // Methods
  /**
   * On girl click
   */
  const onClick = () => {
    try {
      if ($girlsStore.data[index]) {
        const { exp, exp_limit } = $girlsStore.data[index];
        if (exp < exp_limit) {
          $girlsStore.data[index].exp += 1;
        }
        else {
          $girlsStore.data[index].level += 1;
          $girlsStore.data[index].exp = 0;
          $girlsStore.data[index].exp_limit = parseInt(exp_limit * 1.6);
        }
      }
    }
    catch (e) {
      console.error(e);
    }
  }
</script>

<div class="w-full flex flex-col justify-center gap-y-4 py-4">
  <GirlProgressBar exp={girl.exp} max={girl.exp_limit} />
  <figure class="w-full flex justify-center items-center p2-4 relative z-10">
    <button on:click={onClick}>
      <Image
        cdn
        src={girl.image}
        class="h-72 active:translate-y-1 active:scale-90 transition-all duration-[40ms]"
      />
    </button>
  </figure>

  <div class="flex items-center font-bold">
    <p class="text-white">
      idx {index} {girl.name}
    </p>
  </div>

  <footer class="flex w-full gap-5 bg-white/10 rounded-lg border-t border-t-black/40 divide-x divide-black/40">
    <div class="flex flex-col items-center justify-center gap-1 w-1/3 py-2 px-4">
      <p class="font-bold text-white flex justify-end items-center gap-2 w-full">
        {girl.feed_price} <img src="/images/candy.png" alt="" class="size-5">
      </p>
      <!-- <p class="label-small">Feed cost</p> -->
    </div>

    <!--
    <div class="flex flex-col items-center justify-center gap-1 w-full py-2 px-4">
      <p class="font-bold text-white flex items-center gap-2">
        {girl.level} <span class="text-xs font-medium">(exp {girl.exp})</span>
      </p>
    </div>
    -->

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
