const fs = require("fs");
const input = fs.readFileSync("./2015/day01/data.txt", "utf8").split("");
// console.log(input)
let count = 0;
const step = [];
input.map((x, i) => {
  x === "(" ? count++ : count--;
  count === -1 ? step.push(i + 1) : null;
});
console.log(count, step);
