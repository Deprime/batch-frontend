<script lang="ts">
  import Image from "$lib/components/ui/image/Image.svelte";
  // import Button from "$lib/components/ui/button/Button.svelte";
  import GirlProgressBar from "./GirlProgressBar.svelte";

  // Data
  let exp = 0;

  // Methods
  /**
   * On girl click
   */
  const onClick = () => {
    exp += 1;
  }
</script>

<div class="w-full flex flex-col justify-center gap-y-4 py-4">
  <GirlProgressBar {exp} />
  <figure class="w-full flex justify-center items-center p2-4 relative z-10">
    <button on:click={onClick}>
      <Image
        cdn
        src="1-common.png?updatedAt=1718335979109"
        class="h-[300px] active:translate-y-1 active:scale-90 transition-all duration-[50ms]"
      />
    </button>
  </figure>

  <div class="flex items-center font-bold">
    <p class="text-white">
      Lolly-chan
    </p>
  </div>

  <footer class="flex w-full gap-5 bg-white/10 rounded-lg border-t border-t-black/40 divide-x divide-black/40">
    <div class="flex flex-col items-center gap-1 w-full py-2 px-4">
      <p class="font-bold text-white flex items-center gap-2">
        2 <img src="/images/candy.png" alt="" class="size-5">
      </p>
      <p class="text-xs text-white/70">Feed cost</p>
    </div>

    <div class="flex flex-col items-center gap-1 w-full py-2 px-4">
      <p class="font-bold text-white flex items-center gap-2">
        1  <span class="text-xs font-medium">(exp {exp})</span>
      </p>
      <p class="text-xs text-white/70">Level</p>
    </div>

    <div class="flex items-center gap-3 w-full py-2.5 px-4">
      <div class="flex bg-blue-400 px-3 py-1 relative overflow-hidden rounded-md">
        <div class="absolute inset-x-0 top-0 w-full h-1/2 z-[1] bg-white/30" />
        <span class="text-sm font-extrabold uppercase text-blue-950 relative z-[2] ">
          Rare
        </span>
      </div>
    </div>
  </footer>
</div>
