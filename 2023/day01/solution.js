import fs from "fs";
const input = fs
  .readFileSync("./2023/day01/data.txt", "utf8")
  .split("\n")
  .map((x) => x.split(""));

console.log("Lines of data = ", input.length);
console.log(input[201]);

const solutionPart1 = (data) => {
  const numbersPerLine = data.map((x) =>
    x.map((y) => (Number.isInteger(+y) ? +y : null))
  );
  console.log(numbersPerLine);
};
solutionPart1(input);
