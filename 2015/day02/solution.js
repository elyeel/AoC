const fs = require("fs");
const input = fs.readFileSync("./2015/day02/data.txt", "utf8").split("\n");
console.log(input.length);
let sqrFeet = 0;
let ribbon = 0;
input.map((present) => {
  const input = present.split("x");
  const l = parseInt(input[0]);
  const w = parseInt(input[1]);
  const h = parseInt(input[2]);

  const lowest = Math.min(l * w, w * h, l * h);
  sqrFeet += 2 * l * w + 2 * w * h + 2 * l * h + lowest;

  const lowestRibbon = Math.min(2 * l + 2 * w, 2 * l + 2 * h, 2 * w + 2 * h);
  // console.log(l + w, w + h, h + l, lowestRibbon);
  ribbon += lowestRibbon + l * w * h;
});

console.log(sqrFeet, ribbon);
