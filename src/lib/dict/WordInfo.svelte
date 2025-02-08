<script lang="ts">
  import { pushState } from "$app/navigation";
  import { page } from "$app/state";
  import X from "lucide-svelte/icons/x";
  import { onMount } from "svelte";
  import { id } from "./state.svelte";
  import { replaceId, wordLink } from "./wordLink";

  const { sheet }: { sheet: string[][] } = $props();

  const row = sheet.find((row) => row[0] == id.value)!;
  const word = row[1];
  const poss = row[2].split("\n");
  const definitions = row[3]
    .split("\n")
    .map((dfns) => dfns.split(";").map((dfn) => replaceId(dfn, sheet)));

  onMount(() => {
    document.querySelectorAll("#word-info .word-link").forEach((element) => {
      element.addEventListener("click", () => {
        id.value = (element as HTMLElement).dataset.id!;
      });
    });
  });

  function close() {
    id.value = "";
    page.url.hash = "";
    pushState(page.url, page.state);
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div
  class="max-md:fixed max-md:top-0 max-md:left-0 max-md:flex max-md:h-full max-md:w-full max-md:items-center max-md:bg-gray-500/50 max-md:p-4 max-md:backdrop-blur-md md:flex-1 dark:max-md:bg-neutral-700/50"
  onclick={close}
>
  <div
    id="word-info"
    class="max-h-full w-full overflow-y-auto bg-white max-md:rounded-lg max-md:p-4 md:h-full dark:bg-neutral-800"
    onclick={(e) => {
      e.preventDefault();
      e.stopPropagation();
    }}
  >
    <div class="mb-4">
      <div class="flex">
        <div>
          <span class="text-sm font-medium">{row[0]}</span>
          <span class="text-3xl font-semibold">{word}</span>
          {#if row[4]}
            <sup
              class="rounded-full bg-sky-200 px-1.25 py-0.5 text-xs text-nowrap break-keep whitespace-nowrap dark:bg-sky-600"
            >
              {row[4]}
            </sup>
          {/if}
        </div>

        <div class="ml-auto">
          <button
            type="button"
            onclick={close}
            class="cursor-pointer rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-neutral-700"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {#if row[6]}
        <div class="text-gray-600 dark:text-neutral-400">
          &lt; {@html row[6]
            .replaceAll("<", "&lt;")
            .replaceAll(/[0-9]+/g, (id) => wordLink(id, sheet))}
        </div>
      {/if}
    </div>

    <div class="flex flex-col gap-1">
      {#each definitions as dfns, i}
        {@const pos = poss[i]}
        {#if dfns.length == 1}
          <div><span class="pos">{pos}</span> {@html dfns[0]}</div>
        {:else}
          <div class="flex flex-col gap-1">
            <span class="pos">{pos}</span>
            <ol class="flex list-inside list-decimal flex-col gap-1">
              {#each dfns as dfn}
                <li>{@html dfn}</li>
              {/each}
            </ol>
          </div>
        {/if}
      {/each}
    </div>

    {#if row[5]}
      <hr class="mt-4 mb-2" />
      <div>
        {@html replaceId(row[5], sheet)}
      </div>
    {/if}
  </div>
</div>
