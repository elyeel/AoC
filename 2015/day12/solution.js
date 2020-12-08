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

// code below not resulting in good result yet
const altInput = JSON.parse(
  fs.readFileSync("./2015/day12/input.txt", "utf-8"),
  (key, value) => {
    if (Array.isArray(value)) {
      return value.reduce((a, c) => a + c, '');
    } else {
      return Object.values(value).reduce((a, c) => a + c, '');
    }
  }
);

// const altResult = JSON.stringify(altInput)
//   .match(regex)
//   .reduce((a, c) => a + Number(c), 0);
console.log(altInput);
