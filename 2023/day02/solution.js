import fs from "fs";
const inputs = fs
  .readFileSync("./2023/day02/control.txt", "utf8")
  .split("\n")
  .map((x) => x.split(": "));

// const response = await fetch("https://adventofcode.com/2023/day/2/input");
// const txt = await response.text();
// const inputs = txt.trim().split("\n");

console.log(inputs);
const blueRegex = /(?<num>\d+) blue/g;
const greenRegex = /(?<num>\d+) green/g;
const redRegex = /(?<num>\d+) red/g;

// build the data
const data = inputs.map((line, i) => {
  let count = 0;
  const game = {};
  const sets = line[1].split("; ");
  const blueSets = [...line[1].matchAll(blueRegex)].sort(
    (a, b) => +a.groups.num - +b.groups.num
  );
  const greenSets = [...line[1].matchAll(greenRegex)].sort(
    (a, b) => +a.groups.num - +b.groups.num
  );
  const redSets = [...line[1].matchAll(redRegex)].sort(
    (a, b) => +a.groups.num - +b.groups.num
  );
  console.log(greenSets);

  redSets.forEach((set) => {
    if (+set.groups.num > 12) ++count;
  });
  greenSets.forEach((set) => {
    if (+set.groups.num > 13) ++count;
  });
  blueSets.forEach((set) => {
    if (+set.groups.num > 14) ++count;
  });

  if (count <= 0) return i + 1;
});

const result = data.reduce((a, c) => a + (c ? c : 0), 0);
const resultPart2 = data.reduce(
  (a, c) =>
    a +
    redSets[redSets.length - 1].groups.num *
      greenSets[greenSets.length - 1].groups.num *
      blueSets[blueSets.length - 1].groups.num
);
console.log(result, resultPart2);
