let input = require("fs")
  .readFileSync("./2020/day24/data.txt", "utf-8")
  .trim()
  .split("\n");

const parseInput = (data) => {
  const result = [];
  const regex = /e|se|sw|w|nw|ne/g;
  for (const line of data) {
    const directions = [...line.matchAll(regex)].map((x) => x[0]);
    result.push(directions);
  }
  return result;
};
// console.log(parseInput(input));

const dirToHex = {
  nw: { dx: 0, dy: -1 },
  ne: { dx: 1, dy: -1 },
  e: { dx: 1, dy: 0 },
  w: { dx: -1, dy: 0 },
  sw: { dx: -1, dy: 1 },
  se: { dx: 0, dy: 1 },
};

const numBlackTiles = (lines, checkAdjacent = false) => {
  const blackTiles = new Set();

  for (const line of lines) {
    let x = 0,
      y = 0;

    for (const direction of line) {
      x += dirToHex[direction].dx;
      y += dirToHex[direction].dy;
    }

    const key = x + "#" + y;
    if (blackTiles.has(key)) blackTiles.delete(key);
    else blackTiles.add(key);
  }
  // console.log(blackTiles);
  return checkAdjacent ? blackTiles : blackTiles.size;
};
console.log(numBlackTiles(parseInput(input)));

// Part 2

const adjacent = (key) => {
  // adjacents coord and key
  const [x, y] = key.split("#").map((x) => parseInt(x));
  let result = [];
  for (const value of Object.values(dirToHex)) {
    result.push({ x: x + value.dx, y: y + value.dy });
  }
  return result;
};
// console.log(adjacent("3#2"));

const dayRunner = (data, day) => {
  let oldBlackTiles = numBlackTiles(parseInput(data), true);

  // loop for 100x
  for (let i = 0; i < day; i++) {
    let newBlackTiles = new Set();
    // check each black spot for neighbours and set/delete black spot
    for (const key of oldBlackTiles.keys()) {
      const adjacentTiles = adjacent(key);
      const [x, y] = key.split("#").map((x) => parseInt(x));
      adjacentTiles.push({ x, y });

      for (const tile of adjacentTiles) {
        const currId = `${tile.x}#${tile.y}`;
        const neighbours = adjacent(currId);
        const totalBlackTiles = neighbours.filter((n) =>
          oldBlackTiles.has(`${n.x}#${n.y}`)
        ).length;

        if (oldBlackTiles.has(currId)) {
          // if black
          if (totalBlackTiles === 0 || totalBlackTiles > 2)
            newBlackTiles.delete(currId);
          else newBlackTiles.add(currId);
        } else {
          // if white
          if (totalBlackTiles === 2) newBlackTiles.add(currId);
        }
      }
    }
    oldBlackTiles = newBlackTiles;
    // console.log(i, newBlackTiles.size);
  }
  return oldBlackTiles.size;
};

console.log(dayRunner(input, 100));
