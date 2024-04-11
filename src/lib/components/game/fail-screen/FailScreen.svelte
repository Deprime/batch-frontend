<script lang="ts">
  import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
  import { delay } from '$lib/helpers/async';

  // Components
  import { Button } from '$lib/components/ui';

  // Data
  let show = false;
  let loading = false;

  // Methods
  const onNext = async () => {
    loading = true;
    await delay(1000)
    goto('/')
  }

  onMount(() => {
    setTimeout(() => {
      show = true;
    }, 250)
  });
</script>

<div class="pb-5 flex flex-col items-center">
  <picture class="static block w-[240px] h-[240px] -mt-24 mb-6">
    <img src="/images/fail-picture.png" alt="win" class=" transition-all duration-1000 size-auto"
      class:scale-50={!show}
      class:opacity-0={!show}
      class:scale-100={show}
      class:opacity-100={show}
    />
  </picture>

  <h2 class="h2 text-center text-rose-300 mb-6">
    Вы проиграли матч
  </h2>

  <footer class="w-full flex justify-center">
    <Button on:click={onNext} variant="secondary" {loading} disabled={loading} class="!px-20">
      Далее
    </Button>
  </footer>
</div>
