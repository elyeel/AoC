import fs from "fs";
const startTime = Date.now();

const inputs = fs
  .readFileSync("./2024/day01/data.txt", "utf8")
  .split("\n")
  .map((x) => x.split(/\s+/).map((y) => +y));

console.log("Data length : ", inputs.length, "- data line #8 : ", inputs[7]);

const solution = (data) => {
  // sort data [x, y]
  const leftData = data.map((pair) => pair[0]).sort((a, b) => a - b);
  const rightData = data.map((pair) => pair[1]).sort((a, b) => a - b);
  // console.log(leftData);

  const result = data
    .map((pair, i) => Math.abs(rightData[i] - leftData[i]))
    .reduce((a, c) => a + c);

  return result;
};

console.log(solution(inputs));

console.log("solved in " + (Date.now() - startTime) + " ms.");
