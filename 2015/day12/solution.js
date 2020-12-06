const fs = require("fs");
const input = fs.readFileSync("./2015/day12/data.txt", "utf-8");

regex = /-?\d+/g;
result = input.match(regex).reduce((a, c) => a + Number(c), 0);
console.log(result);

const input2 = JSON.parse(
  fs.readFileSync("./2015/day12/input.txt", "utf-8"),
  (key, value) => {
    // value.isO console.log()
    if (!Array.isArray(value))
      return Object.keys(value)
        .map((key) => value[key])
        .indexOf("red") !== -1
        ? {}
        : value;
    return value;
  }
);

const result2 = JSON.stringify(input2)
  .match(regex)
  .reduce((a, c) => a + Number(c), 0);
console.log(result2);
