import fs from "fs";
const regexInput = /(\d+)\-(\d+),(\d+)-(\d+)/;
const decodeRange = (line) => {
  const range = line.match(regexInput);
  // console.log(x, range);
  return {
    e1Bottom: +range[1],
    e1Up: +range[2],
    e2Bottom: +range[3],
    e2Up: +range[4],
    e1Array: Array.from(
      { length: +range[2] - range[1] + 1 },
      (_, i) => i + +range[1] // generating an array from the range of elves 1
    ),
    e2Array: Array.from(
      { length: +range[4] - range[3] + 1 },
      (_, i) => i + +range[3]
    ),
  };
};

const input = fs
  .readFileSync("./2022/day04/data.txt", "utf-8")
  .split("\n")
  .map((x) => decodeRange(x));

console.log(input.length);

const solution = (lines) => {
  let count = 0;
  const result = lines.forEach((line) => {
    if (
      (line.e1Bottom >= line.e2Bottom && line.e1Up <= line.e2Up) ||
      (line.e2Bottom >= line.e1Bottom && line.e2Up <= line.e1Up)
    )
      ++count;
  });
  return count;
};

console.log(solution(input));

const solution2 = (lines) => {
  let count = 0;
  const result = lines.forEach((line) => {
    if (
      line.e1Array.includes(line.e2Bottom) ||
      line.e1Array.includes(line.e2Up) ||
      line.e2Array.includes(line.e1Bottom) ||
      line.e2Array.includes(line.e1Up)
    )
      ++count;
  });
  return count;
};

console.log(solution2(input));
