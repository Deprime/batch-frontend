<script lang="ts">
  import emblaCarouselSvelte from 'embla-carousel-svelte'

  // Components
  import Button from "$lib/components/ui/button/Button.svelte";
  import Slide1 from "./Slide1.svelte";
  import Slide2 from "./Slide2.svelte";

  // Methods

  const onNext = () => {}
  const onPrev = () => {}
</script>

<section class="h-full-dynamic w-full flex flex-col justify-between relative">
  <div class="size-0 absolute z-[1] top-10 right-10 glow-purple" />
  <div class="size-0 absolute z-[1] bottom-32 left-10 glow-blue" />

  <div class="embla embla--first-login" use:emblaCarouselSvelte>
    <div class="embla__container">
      <div class="embla__slide">
        <Slide1 />
      </div>
      <div class="embla__slide">
        <Slide2 />
      </div>
    </div>
  </div>

  <footer class="flex flex-shrink-0 justify-center pb-8">
    <Button variant="secondary">
      Next
    </Button>
  </footer>
</section>

<style lang="scss">
  .embla--first-login {
    @apply h-full w-full;
    @apply flex flex-col flex-grow justify-center;
  }
</style>
