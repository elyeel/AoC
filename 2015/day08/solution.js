const fs = require("fs");
const input = fs.readFileSync("./2015/day08/data.txt", "utf8").split("\n");
console.log(input.length);

const result = input.reduce((a, c) => a + (c.length - eval(c).length), 0);
console.log(result);
// console.log(
//   element,
//   ",",
//   element.length,
//   ",",
//   element[3],
//   ",",
//   eval(element.length)
// );
// const slashX = element.filter((slx) => slx === "\x31");
const result2 = input.reduce(
  (a, c) =>
    a + 2 + c.replace(/\\/g, "\\\\").replace(/"/g, '\\"').length - c.length,
  0
);

console.log(result2);
