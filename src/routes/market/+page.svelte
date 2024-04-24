<script>
  import { Plate } from "$lib/components/ui";
  import { ShardIcon } from "$lib/components/icons";
  import { ChevronLeft } from "lucide-svelte";

  const tmp = [
    {
      id: 1,
      title: "Зелье исцеления",
      img: '/images/boosters/heal-potion.png',
      info: 'При использование, зелье восстанавливает одно очко здоровья',
      price: 3000,
    },
  ]

  const boosters = [
  ...tmp,
  ...tmp,
  ...tmp,
  ...tmp,
  ...tmp,
  ...tmp,
  ...tmp,
  ...tmp,
  ...tmp,
  ...tmp,
  ]
</script>

<header class="sticky top-0 flex items-center p-4 gap-4 text-white bg-black/20 backdrop-blur-sm">
  <a href="/">
    <ChevronLeft size="32" />
  </a>

  <h3 class="h3 text-center w-full pr-8">
    Маркет
  </h3>
</header>

<section class="flex flex-col p-4 pb-10 gap-4">
  {#each boosters as booster}
    <Plate class="flex gap-4">
      <img src={booster.img} alt={booster.title} class="size-20">
      <div>
        <h4 class="h4 mb-3">
          {booster.title}
        </h4>
        <!-- <p class="text-xs mb-3">
          {booster.info}
        </p> -->
        <p class="text-xs">
          Цена:
        </p>
        <div class="flex items-center gap-2 text-xs">
          <ShardIcon /> <strong>{booster.price}</strong>
        </div>
      </div>

    </Plate>
  {/each}
</section>
