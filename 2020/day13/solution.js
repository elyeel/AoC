const fs = require("fs");
const input = fs.readFileSync("./2020/day13/data.txt", "utf8").split("\n");
const time = parseInt(input[0]);
const bus = [];
input[1].split(",").map((t) => (t !== "x" ? bus.push(parseInt(t)) : null));
console.log(bus);

const getTime = (id, time) => {
  if (time % id === 0) return true;
  else return false;
};

const runner = (busArr, startTime) => {
  let got = false;
  let start = startTime;
  let result = 0;
  while (got === false) {
    busArr.forEach((bus) => {
      if (getTime(bus, start)) {
        result += bus;
        got = true;
      }
    });
    start++;
  }

  return (start - startTime - 1) * result;
};

console.log(runner(bus, time));

// Part 2
const busTime = [];
input[1]
  .split(",")
  .map((t) => (t !== "x" ? busTime.push(parseInt(t)) : busTime.push("x")));
// console.log(busTime);

let start = 0;
for (let i = 0; i < 19; ++i) {
  if ((560210000000000 + i) % 19 === 0) start = 560210000000000 + i;
}
console.log(start);

const timeRunner = (busArr) => {
  // this brute force took so long
  let time = 560210000000014; //; 555550000000000 
  let condition = false;
  const multiply = 19; //busTime[0]

  while (!condition) {
    let metTimeConst = 0;
    for (let i = 0; i < busArr.length; ++i) {
      if (busArr[i] === "x") continue;
      else metTimeConst += getTime(busArr[i], i + time);
    }
    if (metTimeConst >= bus.length) condition = true;
    else time += multiply;
    // console.log(time);
  }

  return time;
};

console.log(busTime);
console.log(timeRunner(busTime));

