let tiles = require("fs")
  .readFileSync("./2020/day20/control.txt", "utf-8")
  .trim()
  .split("\n\n");

let tilesMap = {};
console.log(tiles.length);

const getSidesArray = (tile) => {
  const sideSet = [];
  const side = [];
  const top = tile[0].replace(/#/g, "1").replace(/\./g, "0");
  const bot = tile[tile.length - 1].replace(/#/g, "1").replace(/\./g, "0");

  const lSide = [];
  const rSide = [];
  for (let i = 0; i < tile.length; ++i) {
    lSide.push(tile[i][0]);
    rSide.push(tile[i][tile[i].length - 1]);
  }

  sideSet.push(parseInt(top, 2));
  sideSet.push(
    parseInt(rSide.join("").replace(/#/g, "1").replace(/\./g, "0"), 2)
  );
  sideSet.push(parseInt(bot, 2));
  sideSet.push(
    parseInt(lSide.join("").replace(/#/g, "1").replace(/\./g, "0"), 2)
  );
  sideSet.push(parseInt(top.split("").reverse().join(""), 2));
  sideSet.push(
    parseInt(rSide.reverse().join("").replace(/#/g, "1").replace(/\./g, "0"), 2)
  );
  sideSet.push(parseInt(bot.split("").reverse().join(""), 2));
  sideSet.push(
    parseInt(lSide.reverse().join("").replace(/#/g, "1").replace(/\./g, "0"), 2)
  );
  return sideSet;
};

for (const tile of tiles) {
  const line = tile.split("\n");
  const [t, id] = line[0].split(" ");
  const lines = [];
  for (let i = 1; i < line.length; ++i) {
    lines.push(line[i]);
  }
  tilesMap[id.slice(0, 4)] = getSidesArray(lines);
}

const entries = Object.entries(tilesMap);
// console.log(entries[2]); // [key, value] pair
const result = {};

for (let i = 0; i < entries.length; ++i) {
  const [iKey, iValues] = entries[i];
  let iCount = 0;
  for (let j = 0; j < entries.length; ++j) {
    if (i === j) continue;
    else {
      const [jKey, jValues] = entries[j];
      for (const iValue of iValues) {
        if (jValues.some((x) => x === iValue)) iCount++;
      }
      result[iKey] = iCount;
    }
  }
}

const finalResult = Object.entries(result).filter(([key, value]) => {
  return value < 5 ? key : null;
});

let mult = 1;
finalResult.map(([val, tally]) => (mult *= parseInt(val)));
console.log(mult);

// Part 2
let hashCount = 0;
for (const tile of tiles) {
  const line = tile.split("\n");
  for (const l of line) {
    l.split("").forEach((x) => (x === "#" ? hashCount++ : null));
  }
}
console.log(hashCount);
