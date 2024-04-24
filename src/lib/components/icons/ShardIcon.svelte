<script>
  import { twMerge } from 'tailwind-merge';
  let cssClass = twMerge('size-6 brightness-125', $$props.class);
</script>

<img
  src="/images/shard.png"
  alt="shard"
  class={cssClass}
>
