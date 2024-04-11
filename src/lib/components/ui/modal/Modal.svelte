<script lang="ts">
  import { fly, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

  // Props
  export let show = false;
  export let closable = false;
  export let bottomGlow: 'purple' = 'none'

  // Data
  const fadeConfig = {
    // delay: 150,
    duration: 100
  };
  const flyConfig = {
    delay: 10,
    duration: 300,
    y: -70,
    opacity: 0,
    easing: quintOut
  };

  // Methods
  const onFadeClick = () => {
    if (closable) {
      show = false;
    }
  }
</script>

{#if show}
  <aside class="fixed inset-0 z-30 flex flex-col justify-center items-center px-8">
    <!-- eslint-disable-next-line svelte/valid-compile -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class="absolute inset-0 bg-black/30 backdrop-blur-md z-[31]"
      transition:fade={fadeConfig}
      role="button"
      tabindex="0"
      on:click={onFadeClick}
    />
    <div
      class="bg-[#25335c] border border-white/10 rounded-2xl p-5 w-full max-w-xl relative z-[32] shadow-2xl shadow-black/60"
      transition:fly={flyConfig}
    >
      <slot />
    </div>
  </aside>
{/if}
