const fs = require("fs");
const input = fs.readFileSync("./2020/day08/data.txt", "utf8").split("\n");
console.log(input.length);

let value = 0

const doInfiniteLoop = (data) => {
  value = 0;
  const howMany = {};

  for (i = 0; i < data.length; ++i) {
    const [op, val] = data[i].split(" ");
    if (howMany[i]) howMany[i]++;
    else howMany[i] = 1;
    if (howMany[i] > 1) {
      i += data.length;
      // console.log(value, i + 1);
      return false;
    }
    if (op === "nop");
    if (op === "acc") value += parseInt(val);
    if (op === "jmp") i += parseInt(val) - 1;
    // console.log(value);
    if (i >= data.length - 1) return true;
  }
};

console.log(doInfiniteLoop(input));

const opCodeIdx = [];

for (i = 0; i < input.length; ++i) {
  const [op, value] = input[i].split(" ");
  if (op === "jmp" || op === "nop") opCodeIdx.push(i);
}
console.log(opCodeIdx);

const bruteForce = (data) => {
  for (const idx of opCodeIdx) {
    const origin = data[idx];
    let [op, value] = origin.split(" ");
    if (op === "jmp") op = "nop";
    else if (op === "nop") op = "jmp";
    data[idx] = `${op} ${value}`;
    console.log(data[idx]);
    if (doInfiniteLoop(data)) return idx;
    else data[idx] = origin;
  }
};

console.log(bruteForce(input), value);
