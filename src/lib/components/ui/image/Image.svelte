<script>
  import { nanoid } from 'nanoid/non-secure'

  // Props
  export let cdn = false;
  export let src = '';
  export let alt = nanoid(6);

  // Data
  const cdnPrefix = 'https://ik.imagekit.io/uwr6ux5m6/';
</script>

<img {...$$restProps} src={cdn ? `${cdnPrefix}${src}` : src} {alt}  />
