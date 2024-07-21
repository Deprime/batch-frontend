<script>
	import '../app.scss';
  import { onMount } from 'svelte';

  // Components
  import { Loader } from '$lib/components/ui';
  import { FirstLogin } from '$lib/components/widgets';
  import { Navigation } from '$lib/components/structure';

  // Services
  import { delay } from '$lib/helpers/async';
	import { appStore, userStore, girlsStore } from '$lib/stores';
  import telegramService from "$lib/services/telegram";
  import authService from '$lib/services/auth';

  // Data
  let loading = true;
  let isTelegram = false;

  /**
   * Init telegram web app
   */
  const onAppInit = async () => {
    const telegram = window.Telegram;
    const initData = telegram.WebApp.initData;
    isTelegram = initData.length > 0;
    const engine = isTelegram ? 'telegram' : 'web';
    appStore.setEgine(engine);

    if (isTelegram) {
      await telegramService.preconfig(telegram)
      await authService.telegram(telegram)
    }
    else {
      await authService.webapp()
    }
  };

  const onClearState = () => {
    appStore.clear();
    userStore.clear();
    girlsStore.clear();
    location.reload();
  }

  onMount(async () => {
    try {
      for (let i = 0; i < 1000; i++) {
        if (window.Telegram) {
          await onAppInit();
          break;
        }
        await delay(400);
      }
    } catch(err) {
      console.log(err)
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <script src="https://telegram.org/js/telegram-web-app.js"></script>
</svelte:head>

<main class="max-w-[640px] mx-auto h-full-dynamic overflow-y-scroll relative">
  {#if loading}
    <div class="w-full h-full flex justify-center items-center">
      <Loader size="xl" />
    </div>
  {:else}

    {#if $userStore.data}
      {#if $userStore.data.last_played_at}
        <button on:click={onClearState} class="absolute top-1 right-1 text-xs bg-slate-600/50 px-1 rounded">
          Clear state
        </button>
        <slot />
        <Navigation />
      {:else}
        <FirstLogin />
      {/if}
    {:else}
      <div>
        Authorization error
      </div>
    {/if}
  {/if}
</main>
