import fs from "fs";
const input = fs
  .readFileSync("./2021/day25/control1.txt", "utf-8")
  .split("\n")
  .map((x) => x.split(""));

// console.log(input);

const solution = (input, step = 1) => {
  while (step > 0) {
    // eastbound first
    for (let y = 0; y < input.length; ++y) {
      for (let x = 0; x < input[y].length; ++x) {
        if (input[y][x] === ">") {
          if (x === input[y].length - 1) {
            if (input[y][0] === ".") {
              input[y][0] = ">";
              input[y][x] = ".";
            }
          } else if (!input[y][x][1]) {
            if (input[y][x + 1] === ".") {
              input[y][x + 1] = [">", true];
              input[y][x] = ".";
              // ++x;
            }
          }

          // console.log(input[y][x], x, y);
        } else if (input[y][x][1]) input[y][x] = input[y][x][0];
      }
    }

    // southbound last
    for (let y = 0; y < input.length; ++y) {
      // let flag = false;
      for (let x = 0; x < input[y].length; ++x) {
        if (input[y][x] === "v") {
          if (y === input.length - 1) {
            if (input[0][x] === ".") {
              input[y][x] = ".";
              input[0][x] = "v";
            }
            // if (flag) ++y;
          } else {
            if (input[y + 1][x] === ".") {
              input[y][x] = ".";
              input[y + 1][x] = ["v", true];
              // flag = true;
            }
          }
        } else if (input[y][x][1]) input[y][x] = input[y][x][0];
        // if (x === input[y].length - 1 && flag) ++y;
        // return array of a string and a flag to a string
      }
    }
    --step;
  }
  return input.map((x) => x.join(""));
};

const solution1 = (input, step = 1) => {
  while (step > 0) {
    // eastbound first
    for (let y = 0; y < input.length; ++y) {
      for (let x = 0; x < input[y].length; ++x) {
        // if '>>>>' check right of it then moves/stay
        if (input[y][x] === ">") {
          // empty right -> moves
          if (input[y][x + 1] === ".") {
            input[y][x + 1] = [">", true];
            input[y][x] = ".";
          }
          // ends -> check x = 0 -> empty -> moves
          if (input[y].length - 1 === x) {
            if (input[y][0] === ".") {
              input[y][0] = [">", true];
              input[y][x] = ".";
            }
          }
        }
        // ignore everything else
      }
    }

    // southbound last
    for (let y = 0; y < input.length; ++y) {
      for (let x = 0; x < input[y].length; ++x) {
        // if 'vvvv' check below of it then moves/stay
        if (input[y][x] === "v") {
          // empty below -> moves
          if (y !== input.length - 1) {
            if (input[y + 1][x] === ".") {
              input[y + 1][x] = ["v", true];
              input[y][x] = ".";
            }
          }
          // ends -> check y = 0 -> empty -> moves
          if (input.length - 1 === y) {
            if (input[0][x] === ".") {
              input[0][x] = ["v", true];
              input[y][x] = ".";
            }
          }
        }
        // ignore everything else
      }
    }

    // remove true from input
    for (let y = 0; y < input.length; ++y) {
      for (let x = 0; x < input[y].length; ++x) {
        if (input[y][x][1]) input[y][x] = input[y][x][0];
      }
    }
    --step;
  }
  return input.map((x) => x.join(""));
};

console.log(solution1(input, 1));
