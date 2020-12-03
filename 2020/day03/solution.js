const fs = require("fs");
const input = fs.readFileSync("./2020/day03/data.txt", "utf8").split("\n");
// console.log(input.length);

let count = 0,
  count2 = 0;
let position = 3;
const slopes = [1, 3, 5, 7, "12"];

const findTree = (input) => {
  for (let i = 1; i < input.length; i++) {
    // position > 30 ? (position = 0) : position;
    if (position > 30) {
      position -= 31;
    }
    // console.log(input[i].split("")[position]);
    input[i].split("")[position] === "#" ? count++ : count;
    position += 3;
  }
  return count;
};

// console.log(findTree(input));

const findTree2 = (input, pos) => {
  let count2 = 0;
  let position = pos;
  for (let i = 1; i < input.length; i++) {
    // position > 30 ? (position = 0) : position;
    if (position > 30) {
      position -= 31;
    }
    // console.log(input[i].split("")[position]);
    input[i].split("")[position] === "#" ? count2++ : count2;
    position += pos;
  }
  return count2;
};

const findTree3 = (input, pos) => {
  let count3 = 0;
  let position = pos;
  for (let i = 2; i < input.length; i += 2) {
    // position > 30 ? (position = 0) : position;
    if (position > 30) {
      position -= 31;
    }
    // console.log(input[i].split("")[position]);
    input[i].split("")[position] === "#" ? count3++ : count3;
    position += pos;
  }
  return count3;
};

console.log(findTree2(input, 1));
console.log(findTree2(input, 3));
console.log(findTree2(input, 5));
console.log(findTree2(input, 7));
console.log(findTree3(input, 1));
console.log(88 * 145 * 71 * 90 * 42);
