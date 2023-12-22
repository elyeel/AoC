import fs from "fs";
const inputs = fs
  .readFileSync("./2023/day02/data.txt", "utf8")
  .split("\n")
  .map((x) => x.split(": "));

// const response = await fetch("https://adventofcode.com/2023/day/2/input");
// const txt = await response.text();
// const inputs = txt.trim().split("\n");

// console.log(inputs);
const blueRegex = /(?<num>\d+) blue/g;
const greenRegex = /(?<num>\d+) green/g;
const redRegex = /(?<num>\d+) red/g;
let resultPart2 = [];

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
  // console.log("Example of greensets : ", greenSets);

  redSets.forEach((set) => {
    if (+set.groups.num > 12) ++count;
  });
  greenSets.forEach((set) => {
    if (+set.groups.num > 13) ++count;
  });
  blueSets.forEach((set) => {
    if (+set.groups.num > 14) ++count;
  });
  game.red = +redSets[redSets.length - 1].groups.num;
  game.green = +greenSets[greenSets.length - 1].groups.num;
  game.blue = +blueSets[blueSets.length - 1].groups.num;
  resultPart2.push(game.red * game.green * game.blue);

  // console.log("Game :", game);
  // resultPart2.push(game);

  if (count <= 0) return i + 1;
});

// console.log(data, resultPart2);
const result = data.reduce((a, c) => a + (c ? c : 0), 0);
const result2 = resultPart2.reduce((a, c) => a + c, 0);
console.log(result, result2);
