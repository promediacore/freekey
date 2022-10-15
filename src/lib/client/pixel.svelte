<script>
  import { onMount } from 'svelte
  onMount(async () => {

  })

  const m = 255
  export let data = {
    r:m,
    g:m,
    b:m,
    a:m,
    x:m,
    y:m,
    z:m,
    p:1
  }
</script>

<svelte:window on:keydown={handleKeydown} />

