const fs = require("fs");
const input = fs.readFileSync("./2020/day03/data.txt", "utf8").split("\n");
console.log(input.length);

const slopes = [1, 3, 5, 7, "12"];

const findTree = (input, right, down) => {
  let count = 0;
  // console.log(right, down);
  let position = right;
  for (let i = down; i < input.length; i += down) {
    // position > 30 ? (position = 0) : position;
    if (position > 30) {
      position -= 31;
    }
    // console.log(input[i].split("")[position]);
    input[i][position] === "#" ? count++ : count;
    position += right;
  }
  return count;
};

const findTreeAll = (slopes) => {
  const result = slopes.map((x) => {
    // console.log(x);
    if (x !== "12") {
      return findTree(input, x, 1);
    } else {
      return findTree(input, 1, 2);
    }
    // Number(x) ?  : ;
  });
  return result;
};


let multiply = 1;
console.log(
  "Part1 = ",
  findTreeAll([3]),
  "Part2 = ",
  findTreeAll(slopes).map((x) => {
    return multiply *= x;
  })
);
