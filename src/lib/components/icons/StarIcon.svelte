<script>
  import { twMerge } from 'tailwind-merge';
  let cssClass = twMerge('size-5', $$props.class);
</script>

<img src="/images/star.png" alt="candy-coin" class={cssClass}>
