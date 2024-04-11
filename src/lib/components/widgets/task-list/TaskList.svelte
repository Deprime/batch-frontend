
<script lang="ts">
  // Components
  import {  Plate } from '$lib/components/ui';

  // Data
  const tasks = [
    {title:  'Сыграй 3 матча', tip: ''},
    {title:  'Пригласи друга', tip: ''},
    {title:  'Сыграй первый матч на ставку', tip: ''},
  ]
</script>

<Plate class="flex flex-col gap-2 !pb-5">
  <h4 class="h4 mb-2">
    Задания
  </h4>
  <ul class="text-sm flex flex-col gap-2">
    {#each tasks as task}
      <li class="bg-black/15 py-2 px-3 rounded-lg">
        {task.title}
      </li>
    {/each}
  </ul>
</Plate>
