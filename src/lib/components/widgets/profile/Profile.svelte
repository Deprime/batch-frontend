
<script lang="ts">
  // Components
  import { Gamepad2 } from 'lucide-svelte';
  import { TonIcon, GoldIcon, ShardIcon } from '$lib/components/icons';
  import userStore from '$lib/stores/user';
</script>

<section class="flex flex-col w-full ">
  <div class="flex justify-between items-center text-white bg-white/10 py-2.5 px-3 rounded-t-lg">
    <header class="w-full">
      <h4 class="h4 mb-1">
        {$userStore.data?.username}
      </h4>
      <div class="flex gap-4 mb-1">
        <p class="text-sm text-gray-200">
          Ур. 4
        </p>
        <p class="text-sm text-gray-200">
          Бронзовая лига
        </p>
      </div>
    </header>

    <figure class="size-16 rounded-lg bg-slate-500/40 border-4 border-slate-200/50 flex flex-shrink-0 justify-center items-center text-white">
      <Gamepad2 size={32} />
    </figure>
  </div>

  <footer class="flex w-full gap-5 bg-white/10 rounded-b-lg border-t border-t-black/40 divide-x divide-black/40">
    <div class="flex items-center gap-3 w-full py-2.5 px-4">
      <TonIcon />
      <span
        class="text-blue-200 font-bold"
        id="wallet-ton"
      >
        24
      </span>
    </div>

    <div class="flex items-center gap-3 w-full py-2.5 px-4">
      <GoldIcon />
      <span
        class="text-yellow-200 font-bold"
        id="wallet-gold"
      >
        53408
      </span>
    </div>

    <div class="flex items-center gap-3 w-full py-2.5 px-4">
      <ShardIcon />
      <span
        class="text-red-200 font-bold"
        id="wallet-shard"
      >
        24
      </span>
    </div>
  </footer>
</section>
