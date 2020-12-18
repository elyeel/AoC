const input = require("fs")
  .readFileSync("./2020/day17/data.txt", "utf-8")
  .split("\n");

const checkNeighbours = (x, y, z, v, map) => {
  let neighbours = 0;
  for (const nX of [-1, 0, 1]) {
    for (const nY of [-1, 0, 1]) {
      for (const nZ of [-1, 0, 1]) {
        for (const nV of [-1, 0, 1]) {
          if (nX + x !== x || nY + y !== y || nZ + z !== z || nV + v !== v) {
            const neighbour =
              map.get(`${nX + x},${nY + y},${nZ + z},${nV + v}`) || false;
            if (neighbour) neighbours++;
          }
        }
      }
    }
  }
  return neighbours;
};

// console.log(checkNeighbours(1, 1, 0, 0, map)); // got correct # of neighbours

const runner = (map, d4 = false) => {
  // set boundary
  let minX = null;
  let maxX = null;
  let minY = null;
  let maxY = null;
  let minZ = null;
  let maxZ = null;

  let minV = null;
  let maxV = null;

  const keys = map.keys();

  for (const key of keys) {
    const [x, y, z, v] = key.split(",").map((x) => parseInt(x));
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (z < minZ) minZ = z;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
    if (z > maxZ) maxZ = z;

    if (v < minV) minV = v;
    if (v > maxV) maxV = v;
  }

  const newMap = new Map();

  for (let x = minX - 1; x <= maxX + 1; ++x) {
    for (let y = minY - 1; y <= maxY + 1; ++y) {
      for (let z = minZ - 1; z <= maxZ + 1; ++z) {
        for (let v = minV - 1; v <= maxV + 1; ++v) {
          const neighbours = checkNeighbours(x, y, z, v, map);
          const cube = map.get(`${x},${y},${z},${v}`) || false;
          if (
            (cube && [2, 3].includes(neighbours)) ||
            (!cube && neighbours === 3)
          ) {
            newMap.set(`${x},${y},${z},${v}`, true);
          }
        }
      }
    }
  }

  // console.log(newMap);
  return newMap;
};

// let nodes = runner(map);
// let nodes2 = runner(nodes);
// let nodes3 = runner(nodes2);
// let nodes4 = runner(nodes3);
// let nodes5 = runner(nodes4);
// let nodes6 = runner(nodes5);

const cycleRun = (input) => {
  let map = new Map();
  input.forEach((line, y) => {
    line.split("").forEach((node, x) => {
      if (node === "#") map.set(`${x},${y},0,0`, true);
    });
  });
  // console.log(input);

  for (let i = 0; i < 6; i++) {
    const newMap = runner(map);
    map = newMap;
  }

  return map;
};

const result = cycleRun(input);
let total = 0;
for (const res of result) {
  total++
}
console.log(total);
