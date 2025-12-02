import fs from "fs";
const startTime = Date.now();

const regex = /([LR])(\d+)/;

// inputs parsing in array of objects
const inputs = fs
  .readFileSync("./2025/day01/data.txt", "utf8")
  .split("\n")
  .map((x) => {
    const instr = x.match(regex);
    // console.log(instr); // debug ---> correct  match
    return {
      direction: instr[1],
      distance: +instr[2] % 100,
    };
  });

console.log("Data length : ", inputs.length, "- data line #5 : ", inputs[4]);

// PART 1
const solutionPart1 = (data, orgPosition) => {
  let counter = 0;
  let linesProcessed = 0;

  const zeroPosition = data.map((x) => {
    if (x.direction === "L") {
      orgPosition = orgPosition - x.distance;
      if (orgPosition < 0) {
        orgPosition = 100 + orgPosition;
      }
    }
    if (x.direction === "R") {
      orgPosition = (orgPosition + x.distance) % 100;
    }
    orgPosition == 0 ? counter++ : null;
    linesProcessed++;
  });
  return { secret: counter, linesProcessed };
};

console.log("Solution Part 1 : ", solutionPart1(inputs, 50));
console.log("Execution time (ms): ", Date.now() - startTime);
