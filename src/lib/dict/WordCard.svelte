<script lang="ts">
  import { onMount } from "svelte";
  import { id } from "./state.svelte";
  import { replaceId } from "./wordLink";

  const { row, sheet }: { row: string[]; sheet: string[][] } = $props();

  const word = row[1];
  const poss = row[2].split("\n");
  const definitions = row[3].split("\n").map((dfn) => replaceId(dfn, sheet));

  onMount(() => {
    document.querySelectorAll(`#word-card-${row[0]} .word-link`).forEach((element) => {
      element.addEventListener("click", () => {
        id.value = (element as HTMLElement).dataset.id!;
      });
    });
  });
</script>

<div
  id="word-card-{row[0]}"
  class="flex w-full max-w-128 flex-col gap-1 rounded-xl bg-gray-100 px-4 py-3 text-left dark:bg-neutral-700"
>
  <div>
    <a
      href="#{row[0]}"
      onclick={() => {
        id.value = row[0];
      }}
      class="text-2xl font-semibold hover:underline"
    >
      {word}
    </a>
  </div>

  <div class="flex flex-col">
    {#each definitions as definition, i}
      <div>
        <span class="pos">{poss[i]}</span>
        <span>{@html definition}</span>
      </div>
    {/each}
  </div>
</div>
