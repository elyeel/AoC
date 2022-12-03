import fs from "fs";
const input = fs
  .readFileSync("./2022/day03/data.txt", "utf-8")
  .split("\n")
  .map((x) => {
    const half = x.length / 2;
    const left = x.substring(0, half);
    const right = x.substring(half);
    return [left, right];
  });

console.log(input.length);
const customCharPriority =
  "-abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const solution = (input) => {
  const result = input.map((rucksack) => {
    let found;
    rucksack[0].split("").forEach((element) => {
      if (rucksack[1].includes(element)) found = element;
    });
    return found;
  });
  return result
    .map((x) => customCharPriority.indexOf(x))
    .reduce((a, c) => a + c);
};

console.log(solution(input));

const solution2 = (input) => {
  const result = [];
  for (let i = 0; i < input.length; i += 3) {
    const strSet = new Set(input[i].join("").split(""));

    strSet.forEach((elem) => {
      if (
        input[i + 1].join("").includes(elem) &&
        input[i + 2].join("").includes(elem)
      )
        result.push(customCharPriority.indexOf(elem));
    });
  }
  return result.reduce((a, c) => a + c);
};

console.log(solution2(input));
