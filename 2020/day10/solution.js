const fs = require("fs");
const input = fs
  .readFileSync("./2020/day10/data.txt", "utf8")
  .split("\n")
  .map((x) => parseInt(x));
console.log(input.length);

// Part 1
const highestRated = Math.max(...input);
const builtInAdapter = highestRated + 3;
console.log(builtInAdapter);

const checkDiffWithinRange = (diff, allowed) => {
  return diff <= allowed && diff > 0 ? true : false;
};

const joltRangeArr = (jolt) => {
  const arr = [];
  for (let i = 0; i < 3; ++i) {
    arr.push(jolt + i + 1);
  }
  return arr;
};

// console.log(joltRangeArr(6));

const createAdapterSeq = (data) => {
  let jolt = 0;
  const result = [];

  for (let i = 0; i < data.length; ++i) {
    const withinRange = joltRangeArr(jolt);
    console.log(jolt, withinRange);
    const possibleAdapter = data.map((adapter, idx) => {
      if (withinRange.some((elem) => elem === adapter)) {
        return idx;
      }
    });

    const chosenAdapterIdx = Math.min(...possibleAdapter);
    // console.log(chosenAdapterIdx, possibleAdapter);
    jolt = data[chosenAdapterIdx];
    // console.log(jolt);
    result.push(data[chosenAdapterIdx]);
  }
  return result;
};

console.log(createAdapterSeq(input));
