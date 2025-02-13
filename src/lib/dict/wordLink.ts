export function replaceId(str: string, sheet: string[][]) {
  return str.trim().replaceAll(/#([0-9]+)/g, (_, id) => getWord(id, sheet));
}

export function replaceIdWithLink(str: string, sheet: string[][]) {
  return str
    .trim()
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll(/#([0-9]+)/g, (_, id) => wordLink(id, sheet));
}

export function wordLink(id: string, sheet: string[][]) {
  return `<button class="word-link" data-id="${id}">${getWord(id, sheet)}</button>`;
}

function getWord(id: string, sheet: string[][]) {
  const row = sheet.find((row) => row[0] == id)!;
  return row[1];
}
