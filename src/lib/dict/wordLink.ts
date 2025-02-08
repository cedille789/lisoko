export function replaceId(str: string, sheet: string[][]) {
  return str
    .trim()
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll(/#([0-9]+)/g, (_, id) => wordLink(id, sheet));
}

export function wordLink(id: string, sheet: string[][]) {
  const row = sheet.find((row) => row[0] == id)!;
  return `<a href="#${id}" class="word-link" data-id="${id}">${row[1]}</a>`;
}
