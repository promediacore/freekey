<script>
  import Pressure from 'pressure'
  import { onMount } from 'svelte'
  import { css } from '@emotion/css'
  import { elasticInOut } from 'svelte/easing'

  function roll (minn,maxx) {
    return Math.random() * (maxx - minn) + minn
  }

  const transition = () => {
    return {
      css: (t) => {
        return `
        opacity: ${t};
        `
      },
      easing: elasticInOut,
      duration: roll(300,1000),
      delay: roll(0,100)
    }
  }

  let el
  onMount(async () => {
    Pressure.set(el, {
      change: function(force, event) {
        console.log(event)
      }
    })
  })

  const min = 25
  const max = 255

  let innerWidth = null
  let innerHeight = null

  let scale = 50
  let gap = 0.05
  $: mult = Math.max(Math.min(scale,max),Math.max(scale,min))
  $: spacing = mult * gap 

  $: w = Math.floor(innerWidth/scale)
  $: h = Math.floor(innerWidth/scale)

  $: gridW = w % 2 == 0 ? w+1 : w 
  $: gridH = h % 2 == 0 ? h+1 : h 
  $: n = gridW * gridH
  $: height = gridH * mult
  $: width = gridW * mult
 
  $: mx = Math.round(gridW / 2)
  $: my = Math.round(gridH / 2)

  let claimed = []
  function claim (target) {
    
  }
</script>

<svelte:window 
  bind:innerWidth={innerWidth} 
  bind:innerHeight={innerHeight}
/>

<section bind:this={el} class="fixed flex justify-center items-center inset-0 bg-blue">
  <ul class="fixed bg-black text-white p-2 top-0 left-0 z-50">
    <li>gw: {gridW}</li>
    <li>gh: {gridH}</li>
    <li>n: {n}</li>
    <li>
      <label>Scale</label>
      <input type="range" {min} {max} bind:value={scale}>
      {scale}
    </li>
  </ul>

  <table class="border-separate" style="border-spacing:{spacing}px">
    {#each Array(gridH) as a,y}
      <tr style="height:{mult}px">
        {#each Array(gridW) as b,x}
          <td 
            class="relative inset-0 text-xs text-center bg-red-500" 
            transition:transition
            style="width:{mult}px;"
          >
            {x},{y}
            {#if y+1 == my && x+1 == mx}
              <div class="bg-yellow-500 absolute inset-0" />
            {/if}
          </td>
        {/each}
      </tr>
    {/each}
  </table>

</section>

