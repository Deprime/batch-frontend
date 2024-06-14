<script>
  import { twMerge } from 'tailwind-merge';
  let cssClass = twMerge('size-5', $$props.class);
</script>

<img src="/images/candy.png" alt="candy-coin" class={cssClass}>
