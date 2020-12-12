const fs = require("fs");
const result = [];
const result2 = [];
const tape = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
};
const tapeKeys = Object.keys(tape);

const input = fs
  .readFileSync("./2015/day16/data.txt", "utf8")
  .split("\n")
  .forEach((x) => {
    let count = 0;
    let count2 = 0;
    const tempObj = {};
    const line = x.match(/Sue (\d+): (\w+): (\d+), (\w+): (\d+), (\w+): (\d+)/);
    tempObj[line[1]] = {};
    tempObj[line[1]][line[2]] = +line[3];
    tempObj[line[1]][line[4]] = +line[5];
    tempObj[line[1]][line[6]] = +line[7];

    const inputKeys = [line[2], line[4], line[6]];
    inputKeys.forEach((elem) => {
      if (tapeKeys.some((tape) => tape === elem)) {
        if (tempObj[line[1]][elem] == tape[elem]) { // Part 1
          count++;
        }
        // Part 2
        if (elem === "cats" && tempObj[line[1]].cats > tape.cats) count2++;
        if (elem === "trees" && tempObj[line[1]].trees > tape.trees) count2++;
        if (elem === "pomeranians" && tempObj[line[1]].pomeranians < tape.pomeranians)
          count2++;
        if (elem === "goldfish" && tempObj[line[1]].goldfish < tape.goldfish)
          count2++;
        else if (tempObj[line[1]][elem] == tape[elem]) count2++;
      }
    });
    if (count >= 3) result.push(tempObj);
    if (count2 >= 3) result2.push(tempObj);
  });
console.log(result, result2);
