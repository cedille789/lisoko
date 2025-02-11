<script lang="ts">
  import type { Snippet } from "svelte";
  import type { Post } from "./types";

  const {
    title,
    date,
    lastModified,
    categories,
    children,
  }: Omit<Post, "id"> & { children: Snippet } = $props();
</script>

<svelte:head>
  <title>{title} - Lisoko</title>
</svelte:head>

<div class="container mx-auto flex flex-col gap-4 px-4 py-8">
  <div>
    <div>
      <span class="mr-0.5 align-middle text-2xl font-semibold">{title}</span
      >{#each categories ?? [] as category}
        <span class="tag ml-0.5 bg-gray-200 dark:bg-neutral-600">{category}</span>
      {/each}
    </div>

    {date}
    {#if lastModified && date != lastModified}
      <span class="text-sm">(마지막 수정: {lastModified})</span>
    {/if}
  </div>
  <hr />
  <div>
    {@render children?.()}
  </div>
</div>
