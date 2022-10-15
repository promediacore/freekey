<script>
  const fog = 24 
</script>

<table>
  {#each Array(fog) as _,y}
    <tr>
      {#each Array(fog) as _,x}
        <td>{x},{y}</td>
      {/each}
    </tr>
  {/each}
</table>


