import fs from "fs";
const startTime = Date.now();

// inputs -> splitted per line; input -> oneliner string
const inputs = fs.readFileSync("./2024/day03/data.txt", "utf8").split("\n");
const input = fs.readFileSync("./2024/day03/data.txt", "utf-8").trim();

console.log(inputs.length, input.length);

const regex = /mul\((\d+),(\d+)\)/g;

const solution = (lines) => {
  let result = 0;
  lines.forEach((line) =>
    [...line.matchAll(regex)].forEach((mult) => (result += mult[1] * mult[2]))
  );
  return result;
};

console.log("part 1 : ", solution(inputs));

// splitting the dos and don'ts then merge them after removing anything after don'ts
const splitterMerger = (data) => {
  // console.log(data);
  // split do()s
  const splitDo = data.map((x) => x.split("do()"));
  // console.log(splitDo);
  // split Don't()
  const splitDont = splitDo.map((x) => {
    // console.log("splitDo : ", splitDo);
    const resDont = x.map((y) => y.split("don't()")[0]);
    return resDont;
  });
  return splitDont;
};

// console.log("Result = ", splitterMerger(inputs));

// do solution for part2 -> the result is too high!
const part2 = (data) =>
  splitterMerger(data).map((x) => {
    let result = 0;
    x.map((y) => {
      // console.log("here ", y); -> already a string
      [...y.matchAll(regex)].forEach((mul) => (result += mul[1] * mul[2]));
    });
    return result;
  }); //solution(y))); //y.map((z) => solution(z))));

console.log(
  "part 2 : ",
  part2(inputs).reduce((a, c) => a + c, 0)
);

// a redo of the solution assuming input is a oneliner
const solutionB = (data) => {
  console.log(data.length);
  let result = 0;
  [...data.matchAll(regex)].forEach((mul) => (result += mul[1] * mul[2]));
  return result;
};

// removing all don't section from the string by:
// adding 'do()' at the beginning then split the string by "don't()"
// then split again by "do()"
// remove the first element from the result before
// join result into a string again

const conditionalString = ("do()" + input)
  .split("don't()")
  .flatMap((e) => e.split("do()").slice(1))
  .join();

console.log("Part 1 : ", solutionB(input));
console.log("Part 2 : ", solutionB(conditionalString));

console.log("solved in " + (Date.now() - startTime) + " ms.");
