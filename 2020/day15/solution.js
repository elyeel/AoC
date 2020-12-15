const fs = require("fs");
// const input = fs.readFileSync("./2020/day15/data.txt", "utf8").split("\n");
// // .map((x) => parseInt(x));
// console.log(input[5].length);
const input = [2, 15, 0, 9, 1, 20];
const control = [0, 3, 6];

const controlObj = {
  0: [1],
  3: [2],
  6: [3],
};

const inputObj = {
  2: [1],
  15: [2],
  0: [3],
  9: [4],
  1: [5],
  20: [6],
};

const sayNumber = (obj, lastNum, lastTurn) => {
  let nextNum = 0;
  let diff;

  if (obj[lastNum].length === 1) {
    obj[0].push(lastTurn + 1);
    nextNum = 0;
  } else if (obj[lastNum].length > 1) {
    const [a, b] = obj[lastNum].slice(-2);
    diff = b - a;

    if (obj[diff]) obj[diff].push(lastTurn + 1);
    else {
      obj[diff] = [];
      obj[diff].push(lastTurn + 1);
    }
    nextNum = diff;
  }
  // console.log(nextNum);
  return nextNum;
};

// console.log(sayNumber(controlObj, 6, 3));
// console.log(sayNumber(controlObj, 0, 4));
// console.log(sayNumber(controlObj, 3, 5));
// console.log(sayNumber(controlObj, 3, 6));
// console.log(controlObj);

const part1Runner = (obj, start, end, lastNumber) => {
  let nextNumber = 0;
  let prevNumber = lastNumber;

  for (i = start; i < end; ++i) {
    nextNumber = sayNumber(obj, prevNumber, i);
    prevNumber = nextNumber;
  }
  return nextNumber;
};
console.log(part1Runner(inputObj, 6, 30000000, 20)); //part 1 & 2 using the same runner, part2 took about 12 mins to get the result
// console.log(controlObj);
