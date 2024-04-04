<script>
	import './styles.scss';
  import { onMount } from 'svelte';

  // Components
  import { Loader } from '$lib/components/ui';

  // Data
  let loading = true;
  let show = false;

  onMount(() => {
    setTimeout(() => {
      show = true;
    }, 50);

    setTimeout(() => {
      loading = false;
    }, 2000)
  });
</script>

<main class="main-container h-full-dynamic bg-slate-900  bg-gradient-to-b from-slate-800 to-slate-950">
  {#if loading}
    <div class="w-full h-full flex justify-center items-center">
      <div class="transition-all duration-1000 {!show ? 'scale-0 opacity-20' : 'scale-100 opacity-100'}">
        <Loader />
      </div>
    </div>
  {:else}
    <slot />
  {/if}
</main>
