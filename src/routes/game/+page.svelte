<script lang="ts">
	import { tick } from 'svelte';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

  // Components
  import { Button } from '$lib/components/ui';
  import { Card, HpIndicator } from '$lib/components/game';
  import { RefreshCcw } from 'lucide-svelte';

  // Types
  import type { ICard } from '$lib/components/game/card/type';
	import type { IBasePlayer } from '$lib/types/game';

  import { getRandomInt } from '$lib/helpers/math';
	import { goto } from '$app/navigation';

  // Data
  const VITE_APP_NAME = import.meta.env.VITE_APP_NAME;
  const DEFAULT_CARDS: ICard[] = [
    {id: 1, title: "Камень", src: "stone-default", selected: false, active: false,},
    {id: 2, title: "Ножницы", src: "sword-default", selected: false, active: false,},
    {id: 3, title: "Бумага", src: "paper-default",  selected: false, active: false,},
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
  $: final = getFinalResults(player.hp, enemy.hp);

  // Methods
  const leaveMatch = () => {
    setTimeout(() => {
      goto('/')
    }, 3000);
  }
  /**
   *
   * @param playerHp
   * @param enemyHp
   */
  const getFinalResults = (playerHp: number, enemyHp: number) => {
    if (playerHp === 0) {
      leaveMatch();
      return -1;
    }
    if (enemyHp === 0) {
      leaveMatch();
      return 1;
    }
    return 0;
  }

  const resetGame = () => {
    resetDeck();
    player = { ...DEFAULT_PLAYER }
    enemy = { ...DEFAULT_PLAYER }
    tip = '';
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
</script>

<svelte:head>
	<title>{VITE_APP_NAME}</title>
	<meta name="description" content="Game session" />
</svelte:head>

<section class="h-full-dynamic py-5 flex flex-col justify-between relative">
  <header class="w-full flex justify-center gap-4 px-5">
    <div class="flex flex-grow rounded-lg bg-gray-300/20 px-4 py-2 text-white font-medium items-center">
      Player MegaVasiliy
    </div>
    <HpIndicator hp={enemy.hp} />
  </header>

  <div  class="grid grid-cols-3 gap-4 p-5">
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
      <div class="absolute -top-12 z-20">
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
            <p in:fly={flyConfig} class="text-red-400">ТЫ ПРОГИРАЛ МАТЧ</p>
          {/if}
        </div>
      {/if}

    </div>

    {#if player.activeCard}
      <div class="absolute -bottom-12 z-20">
        <Card card={player.activeCard} />
      </div>
    {/if}
  </div>

  <div class="flex justify-between gap-4 p-5">
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
    <div>
      <Button variant="secondary" on:click={resetGame}>
        <RefreshCcw />
      </Button>
    </div>

    <div class="flex flex-grow">
      <Button class="!w-full" disabled={final !== 0}>
        <span class="absolute left-5">
          🚀
        </span>
        Boosters
      </Button>
    </div>

    <HpIndicator hp={player.hp} />
  </footer>
</section>
