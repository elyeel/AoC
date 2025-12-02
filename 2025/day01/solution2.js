import fs from "fs";
const startTime = Date.now();

const regex = /([LR])(\d+)/;

// Prefer puzzle `data.txt`; fall back to `test.txt` for quick runs
const inputPath = fs.existsSync("./2025/day01/data.txt")
  ? "./2025/day01/data.txt"
  : "./2025/day01/test.txt";

const inputs = fs
  .readFileSync(inputPath, "utf8")
  .split(/\r?\n/)
  .filter(Boolean)
  .map((x) => {
    const instr = x.match(regex);
    if (!instr) throw new Error(`Bad input line: ${x}`);
    return { direction: instr[1], distance: +instr[2] };
  });

console.log(`Using input: ${inputPath}`);
console.log("Data length:", inputs.length, "— sample:", inputs.slice(0, 5));

// Directions: 0 = North, 1 = East, 2 = South, 3 = West
const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];

let dir = 0; // facing North initially
let x = 0;
let y = 0;

// For part 2: track visited positions step-by-step
const visited = new Set();
visited.add(`${x},${y}`);
let firstRevisit = null;

for (const instr of inputs) {
  if (instr.direction === "L") dir = (dir + 3) % 4;
  else dir = (dir + 1) % 4;

  for (let step = 0; step < instr.distance; step++) {
    x += dx[dir];
    y += dy[dir];
    const key = `${x},${y}`;
    if (!firstRevisit) {
      if (visited.has(key)) {
        firstRevisit = { x, y };
      } else {
        visited.add(key);
      }
    }
  }
}

const manhattan = Math.abs(x) + Math.abs(y);
console.log("Part 1 — final position:", { x, y }, "Manhattan distance:", manhattan);

if (firstRevisit) {
  const dist2 = Math.abs(firstRevisit.x) + Math.abs(firstRevisit.y);
  console.log("Part 2 — first revisited position:", firstRevisit, "Manhattan distance:", dist2);
} else {
  console.log("Part 2 — no revisited position found in the path");
}

console.log("Elapsed:", Date.now() - startTime, "ms");
