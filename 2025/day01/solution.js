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
      distance: +instr[2] % 100, // to avoid overflows in circular array
      distanceP2: +instr[2], // for part 2 counting full rounds
    };
  });

console.log("Data length : ", inputs.length, "- data line #10 : ", inputs[9]);

// 1st attempt: cutting L and R instructions separately did not work
const solutionPart1 = (data, orgPosition) => {
  let counter = 0,
    zeroPassed = 0,
    linesProcessed = 0;

  const zeroPosition = data.map((x) => {
    if (x.direction === "L") {
      orgPosition = orgPosition - x.distance;
      // if (orgPosition === 0 && x.distanceP2 === 0) ++zeroPassed;
      if (orgPosition < 0) {
        orgPosition += 100;
        zeroPassed++;
      }
    }
    if (x.direction === "R") {
      zeroPassed += x.distanceP2;
      if (orgPosition + x.distance >= 100) {
        zeroPassed++;
      }
      orgPosition = (orgPosition + x.distance) % 100;
    }
    orgPosition == 0 ? counter++ : null;
    linesProcessed++;
  });
  return { part1Secret: counter, linesProcessed, Part2: zeroPassed };
};

// 2nd attempt: process all instructions in one pass

const solutionV2 = (data, orgPosition) => {
  let counter = 0,
    zeroPassed = 0,
    linesProcessed = 0;

  const zeroPosition = data.map((x) => {
    if (x.direction === "L") {
      if (orgPosition === 0) {
        // from 0, left moves hit 0 every 100 steps
        zeroPassed += Math.trunc(x.distanceP2 / 100);
        orgPosition = (orgPosition - (x.distanceP2 % 100) + 100) % 100;
      } else {
        if (x.distanceP2 < orgPosition) {
          // won't reach 0
          orgPosition = (orgPosition - (x.distanceP2 % 100) + 100) % 100;
        } else {
          // will hit 0 at least once
          const remaining = x.distanceP2 - orgPosition; // steps after first hit
          zeroPassed += 1 + Math.trunc(remaining / 100);
          orgPosition = (orgPosition - (x.distanceP2 % 100) + 100) % 100;
        }
      }
    }

    if (x.direction === "R") {
      zeroPassed += Math.trunc((orgPosition + x.distanceP2) / 100);
      orgPosition = (orgPosition + x.distanceP2) % 100;
      // if (orgPosition === 0) zeroPassed++;
    }
    orgPosition == 0 ? counter++ : null;
    linesProcessed++;
  });
  return { part1Secret: counter, linesProcessed, Part2: zeroPassed };
};

console.log("Solution Part 1 : ", solutionPart1(inputs, 50));
console.log("Solution V2 : ", solutionV2(inputs, 50));

console.log("Execution time (ms): ", Date.now() - startTime);
