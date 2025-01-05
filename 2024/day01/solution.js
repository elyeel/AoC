import fs from "fs";
const startTime = Date.now();

const inputs = fs
  .readFileSync("./2024/day01/data.txt", "utf8")
  .split("\n")
  .map((x) => x.split(/\s+/).map((y) => +y));

console.log("Data length : ", inputs.length, "- data line #8 : ", inputs[7]);

const solution = (data) => {
  // mapping of each number occurance
  const rightOccurances = {};
  data.forEach((element, i) => {
    // console.log(element[1], rightOccurances[element[1]]);
    rightOccurances[element[1]]
      ? rightOccurances[element[1]]++
      : (rightOccurances[element[1]] = 1);
  });

  // sort data [x, y]
  const leftData = data.map((pair) => pair[0]).sort((a, b) => a - b);
  const rightData = data.map((pair) => pair[1]).sort((a, b) => a - b);

  // console.log(leftData);
  // console.log("=> ", rightOccurances[3]);

  // result1 is part 1 solution
  const result1 = data
    .map((pair, i) => Math.abs(rightData[i] - leftData[i]))
    .reduce((a, c) => a + c);

  // result2 is part 2 solution
  const result2 = data
    .map((pair) =>
      rightOccurances[pair[0]] ? pair[0] * rightOccurances[pair[0]] : 0
    )
    .reduce((a, c) => a + c);

  return { part1: result1, part2: result2 };
};

console.log(solution(inputs));

console.log("solved in " + (Date.now() - startTime) + " ms.");
