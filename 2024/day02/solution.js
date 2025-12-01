import fs from "fs";
const startTime = Date.now();

const inputs = fs
  .readFileSync("./2024/day02/test.txt", "utf8")
  .split("\n")
  .map((x) => x.split(/\s+/).map((y) => +y));

console.log("Data length : ", inputs.length, "- data line #8 : ", inputs[4]);
console.log(inputs);

const solution1 = (data) => {
  // mapping of each number occurance
  data.map((element) => {
    // determine trend
    // detect occurances increase or decrease
    const trend = element[1] > element[0] ? +1 : -1;

    element.forEach((num, i) => {
      if (trend > 0) {
        // increasing
        if (num[i + 1] < num) {
          console.log("break at ", num, " index ", i);
        }
      } else {
        // decreasing
        if (num[i + 1] > num) {
          console.log("break at ", num, " index ", i);
        }
      }
    });
  });

  return { part1: 0, part2: 0 };
};
