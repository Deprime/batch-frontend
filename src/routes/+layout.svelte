<script>
	import './styles.scss';
  import { onMount } from 'svelte';

  // Components
  import { Loader } from '$lib/components/ui';
  import { delay } from '$lib/helpers/async';
	import userStore from '$lib/stores/user';
  import { DEV_MODE_USER } from '$lib/constants/mock';

  // Data
  let loading = true;
  let show = false;

  const onAuth = async (mocked = false) => {
    if (mocked && !$userStore.data?.candy) {
      userStore.setData(DEV_MODE_USER);
      await delay(550);
      loading = false;
      return;
    }

    try {
      userStore.setData(DEV_MODE_USER);
      await delay(550);
    }
    catch (err) {
      console.log(err)
    }
    finally {
      loading = false;
    }
  }

  onMount(async () => {
    await delay(50);
    show = true;
    await onAuth(true);
  });
</script>

<main class="max-w-[640px] mx-auto h-full-dynamic overflow-y-scroll">
  {#if loading}
    <div class="w-full h-full flex justify-center items-center">
      <div class="transition-all duration-1000 {!show ? 'scale-0 opacity-20' : 'scale-100 opacity-100'}">
        <Loader size="xl" />
      </div>
    </div>
  {:else}
    <slot />
  {/if}
</main>
