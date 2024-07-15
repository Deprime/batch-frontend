
<script lang="ts">
	import { goto } from '$app/navigation';
  const VITE_APP_NAME = import.meta.env.VITE_APP_NAME;

  // Components
  import {
    SwordsIcon,
    LoaderPinwheel,
    Wallet,
    Store,
    Coins
  } from 'lucide-svelte';
  import { Button } from '$lib/components/ui';
</script>

<nav class="flex justify-between gap-2 px-4 pb-8">
  <Button variant="secondary" class="gap-2 flex flex-col !px-1">
    <Coins />
    <span class="text-[10px] leading-3 font-normal">
      Заработать
    </span>
  </Button>

  <Button variant="secondary" class="gap-2 flex flex-col !px-1">
    <Store />
    <span class="text-[10px] leading-3 font-normal">
      Рынок
    </span>
  </Button>

  <Button variant="secondary" class="gap-2 flex flex-col !px-1">
    <LoaderPinwheel  />
    <span class="text-[10px] leading-3 font-normal">
      Чистить
    </span>
  </Button>

  <Button variant="secondary" class="gap-2 flex flex-col !px-1">
    <SwordsIcon />
    <span class="text-[10px] leading-3 font-normal">
      Турниры
    </span>
  </Button>

  <Button variant="secondary" class="gap-2 flex flex-col !px-1">
    <Wallet />
    <span class="text-[10px] leading-3 font-normal">
      Кошелек
    </span>
  </Button>
</nav>
