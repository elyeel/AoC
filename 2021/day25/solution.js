import fs from "fs";
const input = fs
  .readFileSync("./2021/day25/control.txt", "utf-8")
  .split("\n")
  .map((x) => x.split(""));

// console.log(input);

const solution = (input, step = 1) => {
  while (step > 0) {
    for (let y = 0; y < input.length; ++y) {
      for (let x = 0; x < input[y].length; ++x) {
        if (input[y][x] === ">") {
          if (x === input[y].length - 1) {
            if (input[y][0] === ".") {
              input[y][0] = ">";
              input[y][x] = ".";
            }
          } else {
            if (input[y][x + 1] === ".") {
              input[y][x + 1] = ">";
              input[y][x] = ".";
            }
          }
        }
        if (input[y][x] === "v") {
          if (y === input.length - 1) {
            if (input[0][x] === ".") {
              input[y][x] = ".";
              input[0][x] = "v";
            }
          } else {
            if (input[y + 1][x] === ".") {
              input[y][x] = ".";
              input[y + 1][x] = "v";
            }
          }
        }
      }
    }
    // for (let y = 0; y < input.length; ++y) {
    //   for (let x = 0; x < input[y].length; ++x) {
    //     if (input[y][x] === "v") {
    //       if (y === input.length - 1) {
    //         if (input[0][x] === ".") {
    //           input[y][x] = ".";
    //           input[0][x] = "v";
    //         }
    //       } else {
    //         if (input[y + 1][x] === ".") {
    //           input[y][x] = ".";
    //           input[y + 1][x] = "v";
    //         }
    //       }
    //     }
    //   }
    // }
    --step;
  }
  return input;
};

console.log(solution(input));
