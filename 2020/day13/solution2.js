let data = require("fs")
  .readFileSync("./2020/day13/data.txt", { encoding: "utf-8" })
  .trim();
let lines = data.split(/\n/);

let requirements = lines[1]
  .split(",")
  .map((v, i) =>
    v === "x" ? false : { modulo: +v, remainder: (v - (i % v)) % v }
  )
  .filter(Boolean);

// bigger steps first

// requirements.sort(({ modulo: a }, { modulo: b }) => a - b);

console.log(requirements);

let val = 0;
let step = 1;

for (let pos = 0; pos < requirements.length; pos++) {
  while (val % requirements[pos].modulo !== requirements[pos].remainder)
    val += step;
  step *= requirements[pos].modulo;
  console.log(step);
}

console.log(val, step);

