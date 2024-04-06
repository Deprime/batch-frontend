<script lang="ts">
  export let show = false;
</script>

{#if show}
  <aside class="fixed inset-0 z-30 flex flex-col justify-center items-center px-5">
    <div class="absolute inset-0 bg-black/40 backdrop-blur-lg z-[31]" />
    <div class=" bg-gradient-to-b from-slate-700 to-slate-800 rounded-3xl p-5 w-full max-w-2xl relative z-[32]">
      <slot />
    </div>
  </aside>
{/if}
