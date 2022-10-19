<script>
  import { u } from 'unist-builder'
  import { fromDom } from 'hast-util-from-dom'
  import Pixel from '$lib/client/pixel.svelte'
  import Pressure from 'pressure'
  import { onMount } from 'svelte'
  import { player, pixels } from '$lib/client'

  // Determine Player Scale off owned pixels
  const min = 10
  const max = 200
  $: s = Math.max(min,max - ($player.pixels.length * 5)) 
  $: sp = Math.round(s*0.05)

  // Figure out how many pixels to render to fill the client without burdoning their client.. as best as we can lol.
  let cw = null
  let ch = null
  $: gw = Math.round(cw/s)
  $: gh = Math.round(ch/s)
  $: fw = gw % 2 == 0 ? gw+1 : gw
  $: fh = gh % 2 == 0 ? gh+1 : gh 

  // Player Position
  $: hpx = Math.max(...$player.pixels.map(p => p.x))
  $: lpx = Math.min(...$player.pixels.map(p => p.x))
  $: hpy = Math.max(...$player.pixels.map(p => p.y))
  $: lpy = Math.min(...$player.pixels.map(p => p.y))
  $: e = [
    {
      x: hpx,
      y: hpy
    },
    {
      x: lpx,
      y: hpy
    },
    {
      x: hpx,
      y: lpy
    },
    {
      x: lpx,
      y: lpy
    }
  ]
  $: t1 = {
    x: (e[0].x + e[1].x + e[3].x)/3,
    y: (e[0].y + e[1].y + e[3].y)/3
  }
  $: t2 = {
    x: (e[1].x + e[2].x + e[3].x)/3,
    y: (e[1].y + e[2].y + e[3].y)/3
  }
  $: mx = Math.round((t1.x + t2.x)/2)
  $: my = Math.round((t1.y + t2.y)/2)
  $: dx = mx-Math.floor(fw/2)
  $: dy = my-Math.floor(fh/2)
  $: arrX = Array.from({length: fw}, (_, i) => i + dx) 
  $: arrY = Array.from({length: fh}, (_, i) => i + dy)

  // create grid element
  let loaded = false
  let el
  onMount(async () => {
    loaded = true
  })

  // Mouse Pixels
  $: sx = 0 
  $: sy = 0 

  $: ex = 0
  $: ey = 0
  function handleMouse (e) {
    const n = fromDom(e.target).properties
    ex = Number(e.x)
    ey = Number(e.y)
    sx = Number(n.x) || 0  
    sy = Number(n.y) || 0
  }
</script>

<svelte:window 
  bind:innerWidth={cw} 
  bind:innerHeight={ch}
/>

<div 
  bind:this={el} 
  class="fixed inset-0 flex justify-center items-center"
  on:mousemove={handleMouse}
>
  <table
    class="bg-checkers border-separate min-h-screen min-w-screen"
    style="border-spacing:{sp}px"
  >
    {#each arrY as y}
      <tr>
        {#each arrX as x}
          <td>
            <Pixel {x} {y} {s} />
          </td>
        {/each}
      </tr>
    {/each}
  </table>
</div>
