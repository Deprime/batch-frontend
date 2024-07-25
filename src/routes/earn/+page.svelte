<script lang="ts">
  // Components
	import { CircleChevronRight, Copy } from "lucide-svelte";
  import { Button } from "$lib/components/ui";

  // Helpers
  import { numberFormat } from "$lib/helpers/math";

  interface IReward {
    type: "clicks" | "ton"
    amount: number
  }

  // Data
  let tasksDaily = [
    {
      action: () => {},
      text: 'Заходите в игру каждый день! Получайте до +180 000 кликов и боксы с предметами',
      hint: "",
      icon: 'calendar.png',
      rewards: [
        {
          type: 'clicks',
          amount: 5_000
        },
      ],
    },    {
      action: () => {},
      text: 'Продолжайте приглашать друзей. Вы молодец! Забирайте награду +200 000 кликов',
      hint: "",
      icon: 'partnership.png',
      rewards: [
        {
          type: 'clicks',
          amount: 5_000
        },
      ],
    },
  ];

  let tasksSuper = [
    {
      action: () => {},
      text: 'Оформи займ за 15 минут от Екапуста. Процент одобрения 95%.',
      hint: "Сумма до 30 000₽, Срок 7 - 30 дней, Возраст от 18 лет, Ставка от 0%",
      icon: '/partners/mfk/ekapusta.png',
      rewards: [
        {
          type: 'clicks',
          amount: 100_000
        },
      ],
    }, {
      action: () => {},
      text: 'Быстрые займы от Вебзайм. Процент одобрения 95%',
      hint: "Сумма до 30 000₽, Срок 7 - 30 дней, Возраст от 18 лет, Ставка от 0%",
      icon: '/partners/mfk/webzaim.png',
      rewards: [
        {
          type: 'clicks',
          amount: 100_000
        },
      ],
    }, {
      action: () => {},
      text: 'Займы Дозарплаты. Быстро за 15 минут. Процент одобрения 95%',
      hint: "Сумма до 100 000₽, Срок до 30 дней, Возраст от 18 лет, Ставка от 0%",
      icon: '/partners/mfk/do-zarplaty.png',
      rewards: [
        {
          type: 'clicks',
          amount: 100_000
        },
      ],
    }, {
      action: () => {},
      text: 'Оформи займ за 15 минут в Быстроденьги. Процент одобрения 95%',
      hint: "Сумма до 100 000₽, Срок 1 - 168 дней, Возраст от 18 лет, Ставка от 0%",
      icon: '/partners/mfk/bistrodengi.png',
      rewards: [
        {
          type: 'clicks',
          amount: 100_000
        },
      ],
    }, {
      action: () => {},
      text: 'Турброзайм. Процент одобрения 95%',
      hint: "Сумма до 100 000₽, Срок 1 - 168 дней, Возраст от 18 лет, Ставка от 0%",
      icon: '/partners/mfk/turbozaim.png',
      rewards: [
        {
          type: 'clicks',
          amount: 100_000
        },
      ],
    }, {
      action: () => {},
      text: 'Быстры займы в А деньги. Процент одобрения 95%',
      hint: "Сумма до 30 000₽, Срок 7 - 30 дней, Возраст от 18 лет, Ставка от 0%",
      icon: '/partners/mfk/a-dengi.png',
      rewards: [
        {
          type: 'clicks',
          amount: 100_000
        },
      ],
    }, {
      action: () => {},
      text: 'Credit plus. Деньги в кредит. Процент одобрения 96%',
      hint: "Сумма от 3 000 - 50 000₽, Срок 5 - 168 дней, Возраст от 18 лет, Ставка от 0%",
      icon: '/partners/mfk/credit-plus.png',
      rewards: [
        {
          type: 'clicks',
          amount: 100_000
        },
      ],
    }, {
      action: () => {},
      text: 'Займы в Webbankir за 15 минут. Процент одобрения 94%',
      hint: "Сумма до 15 000₽, Срок 7 - 31 дней, Возраст от 20 лет, Ставка от 0%",
      icon: '/partners/mfk/webbankir.png',
      rewards: [
        {
          type: 'clicks',
          amount: 100_000
        },
      ],
    }, {
      action: () => {},
      text: 'Быстрые займы Привет сосед. Процент одобрения 96%',
      hint: "Сумма 3 000 - 30 000₽, Срок 5 - 30 дней, Возраст от 18 лет, Ставка от 0,76%",
      icon: '/partners/mfk/privet-sosed.png',
      rewards: [
        {
          type: 'clicks',
          amount: 100_000
        },
      ],
    }, {
      action: () => {},
      text: 'Займер ваш любимый заемщик. Процент одобрения 92%',
      hint: "Сумма до 30 000₽, Срок 7 - 30 дней, Возраст от 18 - 75 лет, Ставка от 0%",
      icon: '/partners/mfk/zaimer.png',
      rewards: [
        {
          type: 'clicks',
          amount: 100_000
        },
      ],
    },
  ];
</script>

<section class="flex flex-col px-5 pt-10 pb-32 gap-4 h-screen overflow-y-scroll">
  <header class="w-full flex flex-col items-center mb-10">
    <div class="flex gap-x-4 items-center bg-purple-dark rounded-2xl p-4 mb-4">
      <img src="/images/posters/add-friend.png" class="size-8" alt="add-friend">
      <span class="text-3xl font-bold">
        3
      </span>
      <CircleChevronRight size="16"  />
    </div>

    <h2 class="h1 mb-2 text-center">
      Приглашенные друзья
    </h2>

    <p class="mb-4 text-center">
      Чем больше друзей вы приглашаете тем проще набрать очки, чтобы получить TON
    </p>

    <div class="w-full flex gap-2">
      <Button block>
        Пригласить друзей
      </Button>

      <Button>
        <Copy />
      </Button>
    </div>
  </header>

  <section class="w-full mb-8">
    <h3 class="h2 mb-2">
      Ежедневная награда
    </h3>

    <ul class="w-full flex flex-col gap-y-3 text-sm">
      {#each tasksDaily as task}
      <li class="flex gap-x-3 bg-purple-dark p-2 rounded-xl">
        <picture class="flex flex-shrink-0 size-8 mt-1">
          <img src="/images/posters/{task.icon}" alt="" class="size-8">
        </picture>
        <div class="flex flex-grow font-semibold">
          {task.text}
        </div>
      </li>
      {/each}
    </ul>
  </section>

  <section class="w-full mb-8">
    <h3 class="h2 mb-2">
      Супер задания
    </h3>

    <ul class="w-full flex flex-col gap-y-3 text-sm">
      {#each tasksSuper as task}
      <li class="bg-purple-dark p-2 rounded-xl">
        <div class="w-full flex items-center gap-x-3 mb-3">
          <picture class="flex justify-center items-center flex-shrink-0 size-12 bg-white overflow-hidden border border-white rounded-lg">
            <img src="/images/{task.icon}" alt="" class="w-12 h-fit">
          </picture>
          <div class="w-full flex flex-col flex-grow font-semibold">
            {task.text}
          </div>
        </div>

        <p class="text-[10px] mb-3">
          {task.hint}
        </p>

        <footer class="flex items-center gap-x-4">
          <Button class="min-w-40">
            Оформить
          </Button>
          <p class="font-bold">
            {#each task.rewards as reward}
              {#if reward.type === 'clicks'}
                <span>
                  + {numberFormat(reward.amount)} кликов
                </span>
              {/if}
            {/each}
          </p>
        </footer>
      </li>
      {/each}
    </ul>
  </section>

  <p class="text-center">
    Onion X не принуждает вас брать кредит, занимайте деньги если нуждаетесь в этом
  </p>
</section>
