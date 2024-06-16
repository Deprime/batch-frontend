<script>
  import { twMerge } from 'tailwind-merge';
  let cssClass = twMerge('size-5 brightness-95', $$props.class);
</script>

<img
  src="/images/chainlink.png"
  alt="gold"
  class={cssClass}
>
