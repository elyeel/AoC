const fs = require("fs");
const defLamps = fs
  .readFileSync("./2015/day18/control.txt", "utf8")
  .split("\n");
// .map((x) => parseInt(x));
console.log(defLamps[5].length);

const checkAdjacent = (seats, x, y) => {
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
      if (lamps[y][x] === "#" && (count === 2 || count === 3)) rowLamps += "#";
      else if (lamps[y][x] === "." && count === 3) rowLamps += ".";
      else rowLamps += ".";
    }
    newLamps.push(rowLamps);
  }
};
