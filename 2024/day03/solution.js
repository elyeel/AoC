import fs from "fs";
const inputs = fs.readFileSync("./2024/day03/data.txt", "utf8").split("\n");

console.log(inputs.length);

const regex = /mul\((\d+),(\d+)\)/g;

const solution = (lines) => {
  let result = 0;
  lines.forEach((line) =>
    [...line.matchAll(regex)].forEach((mult) => (result += mult[1] * mult[2]))
  );
  return result;
};

console.log(solution(inputs));
