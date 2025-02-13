import { pushState } from "$app/navigation";
import { page } from "$app/state";

export const id = $state({ value: "" });

export function setId(newId: string) {
  page.url.hash = newId;
  pushState(page.url, page.state);
  id.value = newId;
}
