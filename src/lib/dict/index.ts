export function search(sheet: string[][], tokensArray: string[][], query: string) {
  const q = query.toLowerCase().trim();

  const filtered = filter(sheet, tokensArray, q);

  return sort(filtered, tokensArray, q);
}

function filter(sheet: string[][], tokensArray: string[][], q: string) {
  if (q.length == 0) return sheet;

  return sheet.filter((row) => {
    if (row[1].toLowerCase().includes(q) || row[3].toLowerCase().includes(q)) return true;

    return tokensArray[+row[0]].join(" ").includes(q.replaceAll(/[ ~-]/g, ""));
  });
}

function sort(filtered: string[][], tokensArray: string[][], query: string) {
  return filtered.sort((a, b) => {
    const wordA = a[1].toLowerCase();
    const wordB = b[1].toLowerCase();

    if (query.length != 0) {
      // word
      if ((wordA == query) != (wordB == query)) return wordA == query ? -1 : 1;

      const wordStartsWith = [
        wordA.replace("-", "").startsWith(query),
        wordB.replace("-", "").startsWith(query),
      ];
      if (wordStartsWith[0] != wordStartsWith[1]) return wordStartsWith[0] ? -1 : 1;

      // definitions
      const q = query.replaceAll(/[ ~-]/g, "");
      const tokensA = tokensArray[+a[0]];
      const tokensB = tokensArray[+b[0]];

      const tokenIncludes = [tokensA.join(" ").includes(q), tokensB.join(" ").includes(q)];
      if (tokenIncludes[0] != tokenIncludes[1]) return tokenIncludes[0] ? -1 : 1;
      if (tokenIncludes[0] && tokenIncludes[1]) {
        const perfectMatches = [tokensA.includes(q), tokensB.includes(q)];
        if (perfectMatches[0] != perfectMatches[1]) return perfectMatches[0] ? -1 : 1;

        const tokens = [tokensA, tokensB];
        const index = [-1, -1];
        const jndex = [-1, -1];
        for (const n of [0, 1]) {
          let tmpI = -1;
          let tmpJ = -1;
          for (let i = 0, length = tokens[n].length; i < length; i++) {
            const token = tokens[n][i];

            const j = token.indexOf(q);
            if (j == -1) continue;

            if (tmpJ == -1 || j == 0 || j < tmpJ) {
              tmpI = i;
              tmpJ = j;
            }
            if (j == 0 && (!perfectMatches[n] || token == q)) break;
          }
          index[n] = tmpI;
          jndex[n] = tmpJ;
        }

        if (!perfectMatches[0] && jndex[0] != jndex[1]) return jndex[0] - jndex[1];
        if (index[0] != index[1]) return index[0] - index[1];
      }

      const dfnsIndex = [a[3].toLowerCase().indexOf(query), b[3].toLowerCase().indexOf(query)];
      if (dfnsIndex[0] != dfnsIndex[1]) {
        if (dfnsIndex[0] == -1) return 1;
        if (dfnsIndex[1] == -1) return -1;
        return dfnsIndex[0] - dfnsIndex[1];
      }
    }

    if (wordA < wordB) return -1;
    if (wordA > wordB) return 1;

    return +a[0] - +b[0];
  });
}

export function getTokensArray(sheet: string[][]) {
  const tokensArray: string[][] = [];
  for (const row of sheet) {
    const tokens = row[3]
      .toLowerCase()
      .replaceAll(/(\[[^\];\n]+?\])|(\([^);\n]{2,}?\))/g, "")
      .replaceAll(/[a-z\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]+/g, "")
      .replaceAll(/[ ~-]/g, "")
      .split(/[,;\n]/);

    const arr: string[] = [];
    for (const token of tokens) {
      if (!token.includes("/") && !/\(.\)/.test(token)) {
        arr.push(token);
        continue;
      }

      if (token.includes("/")) {
        const [a, b] = token.split("/");
        arr.push(a);
        arr.push(b);
        continue;
      }

      const [a, b, c] = token.split(/[()]/);
      arr.push(a + b + c);
      arr.push(a + c);
    }

    tokensArray[+row[0]] = arr;
  }

  return tokensArray;
}
