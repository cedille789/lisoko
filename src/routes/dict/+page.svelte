<script lang="ts">
  import { page } from "$app/state";
  import { getTokensArray, search } from "$lib/dict";
  import { id } from "$lib/dict/state.svelte";
  import WordCard from "$lib/dict/WordCard.svelte";
  import WordInfo from "$lib/dict/WordInfo.svelte";
  import type { PageServerData } from "./$types";

  const { data }: { data: PageServerData } = $props();

  // WordInfo
  $effect(() => {
    id.value = page.url.hash.slice(1);
  });
  let currentWord = $derived(data.sheet.find((row) => row[0] == id.value));

  // search
  let query = $state(page.url.searchParams.get("q") || "");
  let result = $state(data.sheet);
  const tokensArray = getTokensArray(data.sheet);

  $effect(() => {
    query;
    result = search(data.sheet.slice(), tokensArray, query);
  });
</script>

<svelte:head>
  <title>사전 - Lisoko</title>
</svelte:head>

<svelte:window {onhashchange} />

<div class="container mx-auto px-4 py-8">
  <div class="mb-8 flex flex-col items-center gap-4">
    <h2 class="text-4xl font-semibold">사전</h2>
    <input
      type="text"
      spellcheck="false"
      autocomplete="off"
      autocapitalize="off"
      autocorrect="off"
      placeholder="검색"
      class="w-full max-w-84 rounded-none border-b-2 border-gray-500 px-4 py-2 outline-none dark:border-neutral-500"
      bind:value={query}
    />
  </div>

  <div class="flex gap-4">
    <div class="flex flex-1 flex-col items-center gap-4">
      {#each result as row (row[0])}
        <WordCard {row} sheet={data.sheet} />
      {/each}
    </div>

    {#key id.value}
      {#if currentWord}
        <WordInfo row={currentWord} sheet={data.sheet} />
      {/if}
    {/key}
  </div>
</div>
