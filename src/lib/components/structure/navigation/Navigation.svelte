
<script lang="ts">
	// import { goto } from '$app/navigation';
  // const VITE_APP_NAME = import.meta.env.VITE_APP_NAME;

  import type { Page } from '@sveltejs/kit';
  import { page } from "$app/stores";

  // Data
  const navs = [
    { title: "Заработать", id: "", url: '/earn', icon: 'nav-earn.png', badge: "", active: false },
    { title: "Рынок", id: "nav-market", url: '/market', icon: 'nav-market.png', badge: "", active: false},
    { title: "Чистить", id: "nav-home", url: '/', icon: 'nav-home.png', badge: "", active: true },
    { title: "Турниры", id: "nav-tournament", url: '/tournament', icon: 'nav-tournament.png', badge: "", active: false },
    { title: "Кошелек", id: "nav-wallet.png", url: '/wallet', icon: 'nav-wallet.png', badge: "", active: false},
  ];

  // Reactive
  $: navList = getNavList($page);

  function getNavList(_page: Page) {
    const path = $page.url.pathname;
    return navs.map(el => {
      return {
        ...el,
        badge: el.badge,
        active: path === el.url ,
        // active: path.includes(el.url) ,
      }
    });
  }
</script>

<div class="nav-wrapper fixed z-10 bottom-0 inset-x-0 bg-purple-base rounded-t-xl">
  <nav class="flex justify-between gap-2 px-3 pb-3 pt-2">
    {#each navList as nav}
      <a
        href={nav.url}
        id={nav.id}
        class="gap-2 flex flex-col items-center rounded-2xl py-2 w-[72px] transition-colors"
        class:bg-purple-dark={!nav.active}
        class:bg-purple-darkest={nav.active}
      >
        <figure>
          <img src="/images/nav/{nav.icon}" alt={nav.id}>
        </figure>
        <span class="text-[10px] leading-3 font-normal">
          {nav.title}
        </span>
      </a>
    {/each}
  </nav>
</div>

<style scoped lang="scss">
  .nav-wrapper {
    box-shadow: 0 0 15px 5px var(--purple-base), 0 0 30px 10px var(--purple-base);
  }
</style>
