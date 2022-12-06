import fs from "fs";
const stacks = fs
  .readFileSync("./2022/day05/stack.txt", "utf-8")
  .split("\n")
  .map((x) => x.split(","));

const regexMove = /move\s(\d+)\sfrom\s(\d)\sto\s(\d)/;
const decodeMove = (command) => {
  const move = command.match(regexMove);
  // console.log(move[0]);
  return {
    boxes: +move[1],
    from: +move[2],
    to: +move[3],
  };
};

const moves = fs
  .readFileSync("./2022/day05/data.txt", "utf-8")
  .split("\n")
  .map((x) => decodeMove(x));

console.log(stacks.length, moves.length, moves[30]);

const solution = (stacks, moves) => {
  moves.forEach((move) => {
    // console.log(move);
    let stacksRemoved;
    if (stacks[move.from].length <= move.boxes)
      stacksRemoved = stacks[move.from]
        .splice(-stacks[move.from].length)
        .reverse();
    if (stacks[move.from].length > move.boxes)
      stacksRemoved = stacks[move.from].splice(-move.boxes).reverse();
    // console.log(stacksRemoved);
    stacks[move.to] = stacks[move.to].concat(stacksRemoved);
    // console.log(move);
  });
  // console.log(stacks);
  const result = [];
  stacks.forEach((stack) => result.push(stack.slice(-1)));
  return result.slice(-9).join("");
};

// console.log(solution(stacks, moves)); // uncomment this line for solution 1, comment out this line to correctly get solution2

const solution2 = (stacks, moves) => {
  moves.forEach((move) => {
    // console.log(move);
    let stacksRemoved;
    if (stacks[move.from].length > 0) {
      if (stacks[move.from].length <= move.boxes)
        stacksRemoved = stacks[move.from].splice(-stacks[move.from].length);
      // .reverse();
      if (stacks[move.from].length > move.boxes)
        stacksRemoved = stacks[move.from].splice(-move.boxes);
      // console.log(stacksRemoved);
      stacks[move.to] = stacks[move.to].concat(stacksRemoved);
    }
    // console.log(move);
  });
  console.log(stacks);
  const result = [];
  stacks.forEach((stack) => result.push(stack.slice(-1)));
  return result.slice(-9).join("");
};

console.log(solution2(stacks, moves));
