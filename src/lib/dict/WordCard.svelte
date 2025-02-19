<script lang="ts">
  import { setId } from "./state.svelte";
  import { replaceId } from "./wordLink";

  const { row, sheet }: { row: string[]; sheet: string[][] } = $props();

  const word = row[1];
  const poss = row[2].split("\n");
  const definitions = row[3].split("\n").map((dfn) => replaceId(dfn, sheet));
</script>

<button
  id="word-card-{row[0]}"
  class="flex w-full max-w-128 cursor-pointer flex-col gap-1 rounded-xl bg-gray-100 px-4 py-3 text-left hover:bg-gray-200 dark:bg-neutral-700 dark:hover:bg-neutral-600"
  onclick={() => setId(row[0])}
>
  <div class="text-2xl font-semibold">{word}</div>

  <div class="flex flex-col">
    {#each definitions as definition, i}
      <div>
        <span class="pos">{poss[i]}</span>
        <span class="align-middle">{definition}</span>
      </div>
    {/each}
  </div>
</button>
