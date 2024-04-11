<script lang="ts">
	import { tick, onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

  // Components
  import { Modal } from '$lib/components/ui';
  import { Card, UserBar, WinScreen, FailScreen } from '$lib/components/game';

  import userStore from "$lib/stores/user";

  // Types
  import type { ICard } from '$lib/components/game/card/type';
	import type { IBasePlayer } from '$lib/types/game';

  // Helpers
  import { getRandomInt } from '$lib/helpers/math';

  // Data
  const VITE_APP_NAME = import.meta.env.VITE_APP_NAME;
  const DEFAULT_CARDS: ICard[] = [
    {id: 1, title: "Камень", src: "stone", selected: false, active: false,},
    {id: 2, title: "Ножницы", src: "sword", selected: false, active: false,},
    {id: 3, title: "Бумага", src: "paper",  selected: false, active: false,},
  ];
  let cards: ICard[] = DEFAULT_CARDS.map(el => ({...el}));

  // Players
  const DEFAULT_PLAYER: IBasePlayer = {
    hp: 3,
    activeCard: null,
  }
  let player: IBasePlayer = { ...DEFAULT_PLAYER };
  let enemy: IBasePlayer = { ...DEFAULT_PLAYER };

  const flyConfig = {
    delay: 150,
    duration: 700,
    x: 0,
    y: 10,
    opacity: 0,
    easing: quintOut
  };
  let tip = '';
  let showModal = false;
  let show = false;
  $: final = getFinalResults(player.hp, enemy.hp);

  const fadeConfig = {
    delay: 150,
    duration: 1800
  };

  // Methods
  const finishMatch = () => {
    setTimeout(() => {
      showModal = true;
    }, 2500);
  }

  /**
   *
   * @param playerHp
   * @param enemyHp
   */
  const getFinalResults = (playerHp: number, enemyHp: number) => {
    if (playerHp === 0) {
      finishMatch();
      return -1;
    }
    if (enemyHp === 0) {
      finishMatch();
      return 1;
    }
    return 0;
  }

  /**
   *
   */
  const resetPlayersActivity = () => {
    player.activeCard = null;
    enemy.activeCard = null;
  }

  /**
   *
   */
  const resetDeck = () => {
    cards = DEFAULT_CARDS.map(el => ({...el}));
  }

  const startRound = () => {
    resetDeck();
    resetPlayersActivity();
    tip = '';
  }

  const decEnemyHp = () => {
    enemy.hp = enemy.hp > 0 ? enemy.hp - 1 : 0;
  }

  const decPlayerHp = () => {
    player.hp = player.hp > 0 ? player.hp - 1 : 0;
  }

  /**
   *
   * @description -1 - lose, 0 - draft, 1 - win
   * @param result
   */
  const setRoundResult = (result: -1|0|1) => {
    switch (result) {
      case -1:
        tip = 'Ты проиграл раунд ☹️';
        break;
      case 1:
        tip = 'Ты выиграл раунд 👍';
        break;
      default:
        tip = 'Ничья';
    }
  }

  /**
   *
   */
  const calculateRoundResul = async () => {
    if (player.activeCard && enemy.activeCard) {
      const playerId = player.activeCard.id;
      const enemyId = enemy.activeCard.id;
      if (playerId === 1) {
        if (enemyId === 1) {
          setRoundResult(0);
        }
        if (enemyId === 2) {
          setRoundResult(1);
          decEnemyHp();
        }
        if (enemyId === 3) {
          setRoundResult(-1);
          decPlayerHp();
        }
      }
      if (playerId === 2) {
        if (enemyId === 1) {
          setRoundResult(-1);
          decPlayerHp();
        }
        if (enemyId === 2) {
          setRoundResult(0);
        }
        if (enemyId === 3) {
          setRoundResult(1);
          decEnemyHp();
        }
      }
      if (playerId === 3) {
        if (enemyId === 1) {
          setRoundResult(1);
          decEnemyHp();
        }
        if (enemyId === 2) {
          setRoundResult(-1);
          decPlayerHp();
        }
        if (enemyId === 3) {
          setRoundResult(0);
        }
      }
    }
    else {
      setRoundResult(0);
    }

    await tick();
    if (final === 0) {
      setTimeout(() => {
        startRound();
      }, 2000)
    }
  }

  /**
   * Set enemy active card
   * @param card
   */
  const setEnemyActiveCard = (card: ICard) => {
    enemy.activeCard = {...card};
    tip = 'Вычисляем результат...';

    setTimeout(() => {
      calculateRoundResul();
    }, 750);
  }

  /**
   * Set player active card
   * @param card
   */
  const setPlayerActiveCard = (card: ICard) => {
    player.activeCard = {...card};

    const randomIndex = (getRandomInt(1, 3)) - 1;
    setTimeout(() => {
      setEnemyActiveCard(DEFAULT_CARDS[randomIndex]);
    }, 1200);
  }

  /**
   * Activate card
   * @param card
   */
  const onActivate = (card: ICard) => {
    if (player.activeCard) {
      return;
    }

    if (card.selected) {
      const index = cards.findIndex(el => el.id === card.id) as number;
      cards[index].selected = false;
      cards[index].active = true;
      setPlayerActiveCard(card);
    }
    else {
      cards.forEach((el, index) => {
        cards[index].selected = el.id === card.id;
      });
    }
  }

  onMount(() => {
    show = true;
  })
</script>

<svelte:head>
	<title>{VITE_APP_NAME}</title>
	<meta name="description" content="Game session" />
</svelte:head>


<section class="h-full-dynamic relative">
  <div
    class="size-0 absolute z-[1] top-0 right-0 glow-purple"
    transition:fade={fadeConfig}
  />
  <!-- <div
    class="size-0 absolute z-[1] bottom-0 right-0 glow-blue"
    transition:fade={fadeConfig}
  /> -->
  <div class="h-full-dynamic py-5 flex flex-col justify-between relative z-[2]">
    <header class=" w-full flex justify-center gap-4 px-5">
      <div class="flex flex-shrink-0 items-center justify-center rounded-full size-11 -mr-6 ring-4 ring-slate-800 relative z-[1]">
        <figure
          class="size-11  bg-no-repeat bg-center bg-cover rounded-full"
          style="background-image: url('https://flagcdn.com/be.svg')"
        />
      </div>
      <UserBar username={'MegaVasiliy'} hp={enemy.hp}></UserBar>
    </header>

    <div  class=" flex justify-between gap-4 p-5">
      {#each DEFAULT_CARDS as card}
        <div
          class="transition-all duration-500 w-full max-w-[106px] bg-slate-600 rounded-md"
          class:opacity-20={enemy.activeCard}
        >
          <Card
            {card}
            flipped
            visible={!enemy.activeCard || final !== 0}
            disabled={final !== 0}
          />
        </div>
      {/each}
    </div>

    <div class="relative w-full flex flex-col flex-grow justify-center items-center px-5">
      {#if enemy.activeCard}
        <div class="absolute -top-14 z-20">
          <Card card={enemy.activeCard} />
        </div>
      {/if}

      <div class="bg-gray-700/30 w-full h-full flex justify-center items-center rounded-xl">
        {#if final === 0}
          <div class="text-sm font-medium text-gray-300">
            {#if tip.length > 0}
              {#key tip}
                <p in:fly={flyConfig}>{tip}</p>
              {/key}
            {:else}
              {#if !player.activeCard}
                <p in:fly={flyConfig}>Выбери карту...</p>
              {:else}
                <p in:fly={flyConfig}>Ждем хода соперника...</p>
              {/if}
            {/if}
          </div>
        {:else}
          <div class="text-xl font-medium ">
            {#if final === 1}
              <p in:fly={flyConfig} class="text-green-400">ТЫ ВЫИГРАЛ МАТЧ</p>
            {:else}
              <p in:fly={flyConfig} class="text-red-400">ТЫ ПРОИГРАЛ МАТЧ</p>
            {/if}
          </div>
        {/if}

      </div>

      {#if player.activeCard}
        <div class="absolute -bottom-14 z-20">
          <Card card={player.activeCard} />
        </div>
      {/if}
    </div>

    <div class=" flex justify-between gap-4 p-5">
      {#each cards as card}
        <div
          class="transition-all duration-500 w-full max-w-[106px] bg-slate-800 rounded-md"
          class:opacity-20={player.activeCard}
        >
          <Card
            {card}
            visible={!player.activeCard || final !== 0}
            disabled={final !== 0}
            on:click={() => { onActivate(card) }}
          />
        </div>
      {/each}
    </div>

    <footer class="w-full flex justify-center gap-4 px-5">
      <div class="flex flex-shrink-0 items-center justify-center rounded-full size-11 bg-[#4F4BE0] -mr-6 ring-4 ring-slate-900 relative z-[1]">
        <span class="text-lg">
          🚀
        </span>
      </div>
      <UserBar username={$userStore.data?.username ?? ''} hp={player.hp}></UserBar>
    </footer>
  </div>
</section>

<Modal show={showModal}>
  {#if final === 1}
    <WinScreen />
  {:else}
    <FailScreen />
  {/if}
</Modal>
