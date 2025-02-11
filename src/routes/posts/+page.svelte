<script lang="ts">
  import type { PageServerData } from "./$types";

  let { data }: { data: PageServerData } = $props();

  let query = $state("");
  let posts = $state(data.posts);

  $effect(() => {
    query;
    const q = query.toLowerCase().trim();

    const filtered = data.posts.slice().filter((post) => {
      if (!q) return true;
      return post.title.includes(q);
    });

    const sorted = filtered.sort((a, b) => {
      if (q) {
        const titleA = a.title;
        const titleB = b.title;

        const titleIndex = [titleA.indexOf(q), titleB.indexOf(q)];
        if (titleIndex[0] != titleIndex[1]) return titleIndex[0] - titleIndex[1];

        const perfectMatches = [titleA == q, titleB == q];
        if (perfectMatches[0] != perfectMatches[1]) return perfectMatches[0] ? -1 : 1;
      }

      return +a.id - +b.id;
    });

    posts = sorted;
  });
</script>

<svelte:head>
  <title>게시물 - Lisoko</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <div class="mb-8 flex flex-col items-center gap-4">
    <h2 class="text-4xl font-semibold">게시물</h2>
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

  <div class="mx-auto flex max-w-128 flex-col items-center gap-2">
    {#each posts as post (post.id)}
      <a href="/posts/{post.id}" class="flex w-full items-center">
        <!-- <div class="mr-1 w-9 flex-none text-right text-sm">{post.id}</div> -->
        <div class="mr-0.5 overflow-hidden align-middle break-all text-ellipsis whitespace-nowrap">
          {post.title}
        </div>
        <div class="flex-none">
          {#each post.categories ?? [] as category}
            <span class="tag mr-1 ml-0.5 bg-gray-200 dark:bg-neutral-600">{category}</span>
          {/each}
        </div>
        <div class="ml-auto w-20 flex-none text-right text-sm">
          {post.date}
        </div>
      </a>
    {/each}
  </div>
</div>
