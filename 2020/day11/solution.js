const fs = require("fs");
const oldSeats = fs
  .readFileSync("./2020/day11/data.txt", "utf8")
  .split("\n");
// .map((x) => parseInt(x));
console.log(oldSeats[8].length);

// Part 1
// Always create a new array of seats, never change the array value directly

// check adjacent seats, returns occupied #
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

const checkByDirection = (seats, cX, cY) => {
  // for part 2, added check in each direction
  let filledAdjc = 0;
  const direction = [
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: -1, y: -1 },
    { x: 1, y: 1 },
    { x: 1, y: -1 },
    { x: -1, y: 1 },
  ];

  direction.forEach((obj) => {
    let found = false;
    let coordX = cX + obj.x;
    let coordY = cY + obj.y;
    while (
      !found &&
      coordX >= 0 &&
      coordX < seats[cY].length &&
      coordY >= 0 &&
      coordY < seats.length
    ) {
      if (seats[coordY][coordX] === "L") found = true;
      // this line added to fix issue of checking only for "#"
      else if (seats[coordY][coordX] === "#") {
        filledAdjc++;
        found = true;
      } else {
        coordX += obj.x;
        coordY += obj.y;
      }
    }
  });

  return filledAdjc;
};

// console.log("Should get 8 :", checkByDirection(oldSeats, 3, 0)); // this run okay
// console.log(checkAdjacent(oldSeats, 2, 3)); // run okay

const fillSeats = (seats, limit, adjacent) => {
  let newSeats = [];
  let firstLimit = 0;

  for (let i = 0; i < seats.length; ++i) {
    // i = y
    let rowSeats = "";
    for (let j = 0; j < seats[i].length; ++j) {
      //j = x
      let count = 0;
      if (adjacent) {
        count = checkAdjacent(seats, j, i);
      } else {
        count = checkByDirection(seats, j, i);
      }

      if (seats[i][j] === "L" && count == 0) rowSeats += "#";
      else if (seats[i][j] === "#" && count >= limit) rowSeats += "L";
      else if (seats[i][j] === ".") rowSeats += ".";
      else rowSeats += seats[i][j];
    }
    // console.log(rowSeats);
    newSeats.push(rowSeats);
  }
  return newSeats;
};

// console.log(JSON.stringify(fillSeats(oldSeats), null, 2)); // run okay
// const testSeats = fillSeats(oldSeats);
// console.log(JSON.stringify(fillSeats(testSeats), null, 2)); // run okay

const runFillUntilSettled = (seats, limit, adjacent) => {
  let changed = true;
  let oldSeats = fillSeats(seats, limit, adjacent);
  while (changed) {
    const newSeats = fillSeats(oldSeats, limit, adjacent);
    if (JSON.stringify(oldSeats) === JSON.stringify(newSeats)) changed = false;
    else oldSeats = newSeats;
  }
  return oldSeats;
};

const stableSeats = runFillUntilSettled(oldSeats, 4, true);

const occupiedSeats = (seats) => {
  let count = 0;
  seats.forEach((element) => {
    element.split("").forEach((elem) => {
      elem === "#" ? ++count : null;
    });
  });
  return count;
};

// console.log(JSON.stringify(runFillUntilSettled(oldSeats), null, 2));
// console.log(JSON.stringify(stableSeats, null, 2));
console.log(occupiedSeats(stableSeats));

// Part 2
// take five or more occupied before emptying a seat
const stableSeatsW5 = runFillUntilSettled(oldSeats, 5, false);
// console.log(JSON.stringify(stableSeats, null, 2));
console.log(occupiedSeats(stableSeatsW5));
