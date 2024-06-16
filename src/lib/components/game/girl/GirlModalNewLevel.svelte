<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  // Components
  import { TokenIcon, CandyIcon, StarIcon } from '$lib/components/icons';
  import { Button, Modal, Image } from '$lib/components/ui';

	import type { IGirl } from '$lib/types/girl';

  // Props
  export let show = true;
  export let girl: IGirl|null = null;
  export let prize = 250;

  // Data
  const dispatcher = createEventDispatcher();

  // Methods
  const onOk = () => {
    show = false;
    dispatcher('close')
  }
</script>

<Modal bind:show>
  <div class="flex flex-col justify-center items-center">
    <header class="w-full text-center pt-2">
      <div class="flex gap-2 justify-center items-center w-full">
        <StarIcon />
        <h2 class="h2">
          {girl?.name}
        </h2>
        <StarIcon />
      </div>

      <h1 class="h1 mb-4">
        LEVEL UP!!
      </h1>
    </header>

    <div class="relative flex justify-center items-center h-48 w-48 mb-8">
      <Image src="/images/win-picture.png" alt="LevelUp" class="h-48 w-48 relative z-[2]" />
      <!-- <img src="/images/win-picture.png" alt="" class="h-48 w-48 relative z-[2]"> -->
      <span class="text-4xl leading-9 font-extrabold text-amber-700 absolute z-[3] pt-4">
        {girl?.level}
      </span>
      <div class="size-0 absolute z-[1] top-1/2 right-1/2 glow-yellow" />
    </div>

    <footer class=" flex gap-1 w-full relative z-[4] bg-white/10 rounded-lg border-t border-t-black/40 divide-x divide-black/40 mb-5">
      <div class="flex flex-col items-center justify-center gap-1 w-1/2 py-2.5 px-1">
        <p class="label-small">
          Prize
        </p>
        <div class="flex items-center justify-center gap-2">
          <span class="text-white font-bold">
            + {prize}
          </span>
          <CandyIcon />
        </div>
      </div>

      <div class="flex flex-col items-center justify-center gap-1 w-1/2 py-2.5 px-1">
        <p class="label-small">
          Token per feed
        </p>
        <div class="flex items-center justify-center gap-2">
          <span class="text-yellow-200 font-bold">
            {girl?.token_per_feed}
          </span>
          <TokenIcon />
        </div>
      </div>
    </footer>

    <Button class="!w-48" on:click={onOk}>
      GREAT
    </Button>
  </div>
</Modal>
