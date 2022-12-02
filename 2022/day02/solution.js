import fs from "fs";
const input = fs
  .readFileSync("./2022/day02/data.txt", "utf-8")
  .split("\n")
  .map((x) => x.split(" "));

// console.log(input);

const decodeList = {
  A: 1,
  B: 2,
  C: 3,
  X: 1,
  Y: 2,
  Z: 3,
};

// const decodeListP2 = {

// }

const solution = (input) => {
  const result = input.map((x) => {
    let num = 0;
    //draw
    if (decodeList[x[0]] === decodeList[x[1]]) num = decodeList[x[1]] + 3;
    //lose
    if (decodeList[x[0]] === decodeList[x[1]] + 1) num = decodeList[x[1]];
    if (decodeList[x[0]] + 2 === decodeList[x[1]]) num = decodeList[x[1]];
    //win
    if (decodeList[x[0]] + 1 === decodeList[x[1]]) num = decodeList[x[1]] + 6;
    if (decodeList[x[0]] === decodeList[x[1]] + 2) num = decodeList[x[1]] + 6;
    return num;
  });
  return result.reduce((a, c) => a + c);
};

console.log(solution(input));

const solution2 = (input) => {
  const result = input.map((x) => {
    let num = 0;
    // draw
    if (x[1] === "Y") num = decodeList[x[0]] + 3;

    // lose
    if (x[1] === "X") {
      if (decodeList[x[0]] === 3) num = 2;
      if (decodeList[x[0]] === 1) num = 3;
      if (decodeList[x[0]] === 2) num = 1;
    }

    // win
    if (x[1] === "Z") {
      if (decodeList[x[0]] === 3) num = 1 + 6;
      if (decodeList[x[0]] === 1) num = 2 + 6;
      if (decodeList[x[0]] === 2) num = 3 + 6;
    }

    return num;
  });
  return result.reduce((a, c) => a + c);
};

console.log(solution2(input));
