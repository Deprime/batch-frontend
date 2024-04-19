
<script lang="ts">
  // Components
  import { Plate } from '$lib/components/ui';
  import { Gamepad2 } from 'lucide-svelte';
  import userStore from '$lib/stores/user';
</script>

<Plate>
  <div class="flex justify-between items-center mb-3">
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

  <footer class="flex w-full gap-5 bg-white/10 py-2.5 px-3 rounded-lg">
    <div class="flex items-center gap-3 w-full">
      <img src="/images/ton.png" alt="ton" class="size-6 brightness-125">
      <span
        class="text-blue-200 font-bold"
        id="wallet-ton"
      >
        24
      </span>
    </div>

    <div class="flex items-center gap-3 w-full">
      <img src="/images/chainlink.png" alt="gold" class="size-6 brightness-95">
      <span
        class="text-yellow-200 font-bold"
        id="wallet-gold"
      >
        53408
      </span>
    </div>

    <div class="flex items-center gap-3 w-full">
      <img src="/images/shard.png" alt="shard" class="size-6 brightness-125">
      <span
        class="text-red-200 font-bold"
        id="wallet-shard"
      >
        24
      </span>
    </div>
  </footer>
</Plate>
