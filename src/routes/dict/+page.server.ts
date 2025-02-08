import { SHEETS_ID, SHEETS_KEY } from "$env/static/private";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_ID}/values/사전?key=${SHEETS_KEY}`,
  );
  const json = await response.json();

  if ((json as { error: { code: number } }).error) {
    const { error: err } = json as { error: { code: number } };
    if (err.code == 429) error(429, "Too Many Requests");

    throw err;
  }

  const { values: sheet } = json as { values: string[][] };
  sheet.shift();

  return { sheet };
}) satisfies PageServerLoad;
