const fs = require("fs");
const input = fs
  .readFileSync("./2015/day17/data.txt", "utf8")
  .split("\n")
  .map((x) => parseInt(x))
  .sort((a, b) => a - b);
console.log(input);

function count(total, n, i) {
  i = i || 0;

  if (n < 0) {
    return 0;
  } else if (total === 0) {
    return 1;
  } else if (i === input.length || total < 0) {
    return 0;
  } else {
    return count(total, n, i + 1) + count(total - input[i], n - 1, i + 1);
  }
}

console.log("Part One", count(150, input.length));

const recurComb = (total, n, i) => {

  if (n < 0) return 0;
  if (total === 0) return 1;
  if (i === input.length || total < 0) return 0;
  return count(total, n, i + 1) + count(total - input[i], n - 1, i + 1);
};
console.log(recurComb(150, input.length));

let result,
  i = 1;
while (!result) {
  result = count(150, i++);
}
console.log(result);
