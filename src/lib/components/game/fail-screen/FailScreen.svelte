<script lang="ts">
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
	import { goto } from '$app/navigation';

  // Components
  import { Button } from '$lib/components/ui';

  // Data
  let show = false;
  const amount = tweened(1, {
		duration: 3000,
		easing: cubicOut
	});

  // Methods
  const onNext = () => {
    goto('/')
  }

  onMount(() => {
    setTimeout(() => {
      show = true;
      $amount = 320;
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

  <h2 class="h2 text-center text-red-300 mb-6">
    Вы проиграли матч!
  </h2>


  <footer class="w-full flex justify-center">
    <Button on:click={onNext} variant="secondary" class="!px-20">
      Далее
    </Button>
  </footer>
</div>
