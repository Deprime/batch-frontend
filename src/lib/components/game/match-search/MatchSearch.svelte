<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { goto } from '$app/navigation';

  // Components
  import { Button } from '$lib/components/ui';
  import userStore from '$lib/stores/user';
  import { delay } from '$lib/helpers/async';
  import { getRandomInt } from '$lib/helpers/math';

  // Data
  const dispatch = createEventDispatcher();
  let timerId;
  let counter = 1;
  let timeTracker = '00:01';
  let show = false;
  let successTimeout = getRandomInt(5000, 9000);
  let success = false;
  let timeoutId;
  let intervalId;

  let phrase = '';
  const phrases = [
    'Проверяем коды',
    'Подсчитываем варианты',
    'Ищем соперника',
    'Перетасовываем карты',
    'Вычисляем координаты соперника',
    'Пересчитываем gTON',
    'Расставляем приоритеты'
  ];
  const flyConfig = {
    duration: 950,
    x: 0,
    y: 20,
    opacity: 0,
    easing: quintOut
  };

  // Methods
  /**
   * Go to match
   */
  const onMatchFound = async () => {
    success = true;
    await delay(2000);
    goto('/game')
  }

  /**
   * On cancel
   */
  const onCancel = () => {
    dispatch('cancel');
  }

  /**
   * Get random phrase
   */
  const getPhrase = () => {
    const index = getRandomInt(1, phrases.length) - 1;
    phrase = phrases[index];
  }

  onMount(async () => {
    await delay(300);
    show = true;
    getPhrase();

    timerId = setInterval(() => {
      counter += 1;
      const min = Math.floor(counter / 60);
      const sec = counter - min * 60;
      timeTracker = `${min > 9 ? min : '0'+min}:${sec > 9 ? sec : '0'+sec}`
    }, 1000);

    intervalId = setInterval(() => {
      getPhrase();
    }, 4500);

    timeoutId = setTimeout(() => {
      onMatchFound()
    }, successTimeout)
  });

  onDestroy(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    if (timerId) {
      clearInterval(timerId);
    }
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  })
</script>

<div class="w-full flex flex-col items-center gap-6">
  <picture class="static block size-32 -mt-24">
    <img src="/images/dice.png" alt="dice" class=" transition-all duration-1000 size-auto"
      class:scale-50={!show}
      class:opacity-0={!show}
      class:scale-100={show}
      class:opacity-100={show}
    />
  </picture>

  <h3 class="h3 text-white">
    {#if success}
      <span in:fly={flyConfig}>
        Матч найден!
      </span>
    {:else}
      <span in:fly={flyConfig}>
        Поиск матча
      </span>
    {/if}
  </h3>
  <!-- <Loader /> -->

  {#if !success}
    <div class="mb-4 w-full flex flex-col items-center">
      <h4 class="h4 text-slate-100 text-center  bg-slate-800 w-20 mb-4 px-2 py-1 rounded-md">
        {timeTracker}
      </h4>
      {#key phrase}
        <p in:fly={flyConfig} class="text-sm text-gray-300 min-h-5">
          {phrase}
        </p>
      {/key}
    </div>

    <footer class="pb-4">
      <Button variant="secondary" on:click={onCancel}>
        Отмена
      </Button>
    </footer>
  {/if}
</div>
