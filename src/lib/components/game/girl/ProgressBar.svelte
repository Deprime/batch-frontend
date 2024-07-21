<script lang="ts">
	import type { IGirl, IDrop } from "$lib/types/girl";

  // Helpers
  import { round } from "$lib/helpers/math";

  // Types
  interface IBox {
    drop: IDrop;
    padding: number;
    done: boolean
  }

  // Props
  export let girl: IGirl;

  // Data
  let width = 0;
  let boxProgress: IBox[] = [];

  // Reactive
  $: onProgressChange(girl.exp);

  // Methods
  /**
   * Get bar width
   * @param {Number} $$val
   */
  const getProgressWidth = ($$val: number) => {
    if (girl.exp_limit === 0)
      width = 100;

    const currentWidth = girl.exp_limit === $$val
      ? 100
      : round(($$val*100)/girl.exp_limit);
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

<div class="w-full flex flex-col gap-y-8">
  <div class="flex items-center justify-center">
    <div class="bg-purple-dark rounded-md font-medium w-full h-4 mr-3 flex items-center relative">
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

  <div class="w-full flex flex-col justify-center text-center">
    <span>{girl.exp} / {girl.exp_limit}</span>
    <p>
      Осталось до участия в турнире
    </p>
  </div>
</div>
