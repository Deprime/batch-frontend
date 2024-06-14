<script>
  import { nanoid } from 'nanoid/non-secure'

  // Props
  export let cdn = false;
  export let src = '';
  export let alt = nanoid(6);

  // Data
  const cdnPrefix = 'https://ik.imagekit.io/uwr6ux5m6/';
  let isHidden = true;

  const onLoad = () => {
    isHidden = false;
  };
</script>


<img
  {...$$restProps}
  {alt}
  src={cdn ? `${cdnPrefix}${src}` : src}
  class="transition-all duration-300 {$$props.class}"
  class:opacity-0={isHidden}
  on:load={onLoad}
/>
