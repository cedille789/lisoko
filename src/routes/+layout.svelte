<script lang="ts">
  import Moon from "lucide-svelte/icons/moon";
  import Sun from "lucide-svelte/icons/sun";
  import "../app.css";

  const { children } = $props();

  function toggleTheme() {
    if (document.documentElement.classList.contains("dark")) {
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
    } else {
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
    }
  }
</script>

<header
  class="sticky top-0 flex items-center border-b border-b-gray-300 bg-white dark:border-b-neutral-700 dark:bg-neutral-800"
>
  <nav class="container mx-auto flex items-center gap-6 px-4 py-3">
    <div class="text-2xl"><a href="/">Lisoko</a></div>
    <ul class="flex items-center gap-3">
      <li><a href="/dict">사전</a></li>
      <li><a href="/posts">게시물</a></li>
    </ul>
    <button
      type="button"
      onclick={() => toggleTheme()}
      class="ml-auto cursor-pointer rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-neutral-700"
    >
      <Sun class="not-dark:hidden" size={20} />
      <Moon class="dark:hidden" size={20} />
    </button>
  </nav>
</header>

{@render children()}
