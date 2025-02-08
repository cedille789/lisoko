<script lang="ts">
  import { page } from "$app/state";

  const errors: Record<number, string[]> = {
    [404]: ["Not Found", "페이지를 찾을 수 없습니다."],
    [429]: [
      "Too Many Requests",
      "서버가 동시에 너무 많은 양의 요청을 받았습니다.<br />잠시 후에 다시 시도해 주세요.",
    ],
    [500]: ["Internal Server Error", "오류가 발생했습니다."],
  };
</script>

<div class="container mx-auto px-4 py-8">
  <div class="mb-6">
    <h1 class="mb-4 text-4xl font-semibold">{page.status} {errors[page.status]?.[0] || ""}</h1>
    <div class="text-lg">{@html errors[page.status]?.[1] || ""}</div>
  </div>

  <div>
    <button type="button" class="button" onclick={() => history.back()}>이전 페이지</button>
    <a href="/" class="button button-primary">홈으로</a>
  </div>
</div>
