
<script lang="ts">
  // Components
  import { Plate } from '$lib/components/ui';
  import { Gamepad2 } from 'lucide-svelte';
  import userStore from '$lib/stores/user';
</script>

<Plate class="flex justify-between">
  <div>
    <h3 class="h3 mb-2">
      {$userStore.data?.username}
    </h3>
    <p class="text-sm text-gray-200">
      Уровень 4
    </p>
    <p class="text-sm text-gray-200">
      Бронзовая лига
    </p>
  </div>

  <figure class="size-20 rounded-lg bg-slate-500/40 border-4 border-slate-200/50 flex justify-center items-center text-white">
    <Gamepad2 size={40} />
  </figure>
</Plate>
