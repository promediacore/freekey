<script>
  import { roll } from '$lib/client'
  export let x = undefined
  export let y = undefined
  export let s
  import { elasticInOut } from 'svelte/easing'

  const t = () => {
    return {
      css: (t) => {
        return `
        scale: ${t};
        opacity: ${t};
        `
      },
      easing: elasticInOut,
      duration: roll(300,1000),
      delay: roll(0,300)
    }
  }

  let r = roll(0,255)
  let g = roll(0,255)
  let b = roll(0,255)
  let a = roll(0,1)
  let active = false

  $: rgb = `rgba(${r},${g},${b},${a})`
  $: {
    if (x !== undefined || y !== undefined) {
      active = false
      setTimeout(() => {
        r = roll(255,255)
        g = roll(100,255)
        b = roll(0,100)
        a = roll(1,1)
        active = true
      },100)
    }
  }
</script>
{#if active}
  <div 
    {x}
    {y}
    transition:t
    style="height:{s}px; width:{s}px; background-color:{rgb};"
    class="hover:scale-110 hover:outline hover:outline-4 hover:outline-yellow-500 transform-gpu transition-transform"
  >
    {x},{y}
  </div>
{/if}
