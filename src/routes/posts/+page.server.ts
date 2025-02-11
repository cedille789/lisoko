import type { Post } from "$lib/posts/types";
import type { PageServerLoad } from "./$types";

export const prerender = true;

export const load = (async () => {
  let posts: Post[] = [];

  const paths = import.meta.glob("./**/+page.svx", { eager: true });

  for (const path in paths) {
    const file = paths[path];
    const id = path.split("/").at(-2)?.replace(".svx", "");

    if (file && typeof file === "object" && "metadata" in file && id) {
      const metadata = file.metadata as Omit<Post, "id">;
      const post = { ...metadata, id } satisfies Post;

      posts.push(post);
    }
  }

  posts = posts.sort((a, b) => +a.id - +b.id);

  return { posts };
}) satisfies PageServerLoad;
