<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { quartOut } from 'svelte/easing';

  // Components
	import { BatteryCharging } from 'lucide-svelte';

  // Stores
  import { userStore } from '$lib/stores';

  // Helpers
  import { round, numberFormat } from "$lib/helpers/math";

  // Types
	import type { IGirl, IDrop } from "$lib/types/girl";
  interface IBox {
    drop: IDrop;
    padding: number;
    done: boolean
  }

  // Props
  export let girl: IGirl;

  // Data
  const tweenConfig = {
    duration: 750,
    easing: quartOut,
  }
  let width = 0;
  let boxProgress: IBox[] = [];
  let tokenTweened = tweened(girl.exp ?? 0, tweenConfig);

  // Reactive
  $: onProgressChange(girl.exp);

  // Methods
  /**
   * Get bar width
   */
  const getProgressWidth = ($$exp: number) => {
    $tokenTweened = $$exp;

    if (girl.exp_limit === 0)
      width = 100;

    const currentWidth = girl.exp_limit === $$exp
      ? 100
      : round(($$exp*100)/girl.exp_limit, 3);
    width = currentWidth;
  }

  /**
   * On duck progress change
   **/
  function onProgressChange($$exp: number) {
    getProgressWidth($$exp);

    boxProgress = girl.box_points.map((drop: IDrop): IBox => {
      const padding = round((drop?.exp * 100) / girl.exp_limit)
      const done = $$exp >= drop?.exp;
      return { drop, padding, done }
    });
  }
</script>

<div class="w-full flex flex-col">
  <div class="flex items-center justify-center mb-8">
    <div class="bg-purple-dark rounded-md font-medium w-full h-4 mr-5 flex items-center relative">
      <div
        class="bg-coral-base rounded-md absolute inset-0.5 z-0 transition-all duration-500 overflow-hidden"
        style="width: {width}%"
      />

      {#each boxProgress as box}
        <div
          class="absolute z-[3] -top-3 -ml-5 transition-all duration-700"
          style="left: {box.padding}%"
        >
          <span
            class="
              flex justify-center items-center rounded-full size-10
              ring-2 ring-[var(--purple-base)]
              transition-all duration-700
              {box.done ? "bg-coral-base" : "bg-purple-dark"}
            "
            id="girl-{girl.id}-box-progress-{box.drop?.exp}"
          >
            <img
              src={`/images/gifts/icon-${box.drop?.reward}.png`}
              alt={box.drop?.reward}
              class="size-8"
            />
          </span>
        </div>
      {/each}
    </div>
  </div>

  <div class="w-full flex flex-col justify-center text-center mb-4">
    <p class="text-2xl font-semibold flex justify-center gap-x-1">
      <span class="w-[110px] text-right">
        {numberFormat($tokenTweened, 0)}
      </span>
      <span class="w-3 text-center">/</span>
      <span class="w-[110px] text-left">
        {numberFormat(girl.exp_limit)}
      </span>
    </p>
    <p>
      До участия в турнире {numberFormat(girl.exp_limit)} кликов
    </p>
  </div>

  <div class="flex justify-center items-center gap-x-2 font-bold">
    <BatteryCharging size="32" /> <span class="w-10">{$userStore.data?.energy}</span>
  </div>
</div>
