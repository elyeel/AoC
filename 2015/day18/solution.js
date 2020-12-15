const fs = require("fs");
const defLamps = fs
  .readFileSync("./2015/day18/data.txt", "utf8")
  .split("\n");
// .map((x) => parseInt(x));
console.log(defLamps[5].length);

const checkAdjacent = (seats, x, y, stuck = false) => {
  // added check in each direction
  let filledAdjc = 0;
  // top & bottom
  if (y - 1 >= 0 && seats[y - 1][x] === "#") filledAdjc++;
  if (y + 1 < seats.length && seats[y + 1][x] === "#") filledAdjc++;
  // left & right
  if (x - 1 >= 0 && seats[y][x - 1] === "#") filledAdjc++;
  if (x + 1 < seats[y].length && seats[y][x + 1] === "#") filledAdjc++;
  // 4 diagonals seat
  if (
    x + 1 < seats[y].length &&
    y + 1 < seats.length &&
    seats[y + 1][x + 1] === "#"
  )
    filledAdjc++;
  if (x - 1 >= 0 && y - 1 >= 0 && seats[y - 1][x - 1] === "#") filledAdjc++;
  if (x + 1 < seats[y].length && y - 1 >= 0 && seats[y - 1][x + 1] === "#")
    filledAdjc++;
  if (x - 1 >= 0 && y + 1 < seats.length && seats[y + 1][x - 1] === "#")
    filledAdjc++;

  return filledAdjc;
};

const turnLampsOn = (lamps) => {
  const newLamps = [];

  for (let y = 0; y < lamps.length; y++) {
    let rowLamps = "";
    for (let x = 0; x < lamps[y].length; ++x) {
      const adjacent = checkAdjacent(lamps, x, y);
      if (lamps[y][x] === "#" && (adjacent === 2 || adjacent === 3))
        rowLamps += "#";
      else if (lamps[y][x] === "." && adjacent === 3) rowLamps += "#";
      else rowLamps += ".";
    }
    newLamps.push(rowLamps);
  }
  return newLamps;
};

// console.log(JSON.stringify(turnLampsOn(defLamps), null, 2));

const part1Runner = (lights, cycle) => {
  let oldLights = lights;
  let onCounter = 0;
  for (i = 0; i < cycle; ++i) {
    const newLights = turnLampsOn(oldLights);
    oldLights = newLights;
    // console.log(JSON.stringify(newLights, null, 2));
  }

  oldLights.forEach((row) => {
    const lightsOnRow = row
      .split("")
      .reduce((a, c) => a + (c === "#" ? 1 : 0), 0);
    onCounter += lightsOnRow;
  });
  return onCounter;
};

console.log(part1Runner(defLamps, 100));

// Part 2
const setStuckLamps = (lamps) => {
  const stuckLamps = [];

  for (let y = 0; y < lamps.length; ++y) {
    let rowStuckLamps = "";
    for (let x = 0; x < lamps[y].length; ++x) {
      if (
        (x === 0 && y === 0) ||
        (x === lamps[y].length - 1 && y === 0) ||
        (x === 0 && y === lamps.length - 1) ||
        (x === lamps[y].length - 1 && y === lamps.length - 1)
      )
        rowStuckLamps += "#";
      else rowStuckLamps += lamps[y][x];
    }
    stuckLamps.push(rowStuckLamps);
  }

  return stuckLamps;
};

const turnLampsOn2 = (lamps) => {
  const oldLamps = setStuckLamps(lamps);
  const newLamps = [];

  for (let y = 0; y < oldLamps.length; y++) {
    let rowLamps = "";
    for (let x = 0; x < oldLamps[y].length; ++x) {
      if (
        (x === 0 && y === 0) ||
        (x === oldLamps[y].length - 1 && y === 0) ||
        (x === 0 && y === oldLamps.length - 1) ||
        (x === oldLamps[y].length - 1 && y === oldLamps.length - 1)
      ) {
        rowLamps += "#";
      } else {
        const adjacent = checkAdjacent(oldLamps, x, y, true);
        if (oldLamps[y][x] === "#" && (adjacent === 2 || adjacent === 3))
          rowLamps += "#";
        else if (oldLamps[y][x] === "." && adjacent === 3) rowLamps += "#";
        else rowLamps += ".";
      }
    }
    newLamps.push(rowLamps);
  }
  return newLamps;
};

// console.log(JSON.stringify(turnLampsOn2(defLamps), "-", 2));

const part2Runner = (lights, cycle) => {
  let oldLights = lights;
  let onCounter = 0;
  for (i = 0; i < cycle; ++i) {
    const newLights = turnLampsOn2(oldLights);
    oldLights = newLights;
    // console.log(JSON.stringify(newLights, null, 2));
  }

  oldLights.forEach((row) => {
    const lightsOnRow = row
      .split("")
      .reduce((a, c) => a + (c === "#" ? 1 : 0), 0);
    onCounter += lightsOnRow;
  });
  return onCounter;
};

console.log(part2Runner(defLamps, 100))