let input = require("fs")
  .readFileSync("./2020/day18/data.txt", { encoding: "utf-8" })
  .trim()
  .split("\n");

// console.log(input[1].split(" "));

const calculate = (lineInput) => {
  const line = lineInput.split(" ");
  let total = parseInt(line[0]);
  for (i = 1; i < line.length; i += 2) {
    if (line[i] === "+") {
      total += parseInt(line[i + 1]);
    }
    if (line[i] === "*") {
      total *= parseInt(line[i + 1]);
    }
  }
  return total;

  // let tokens = lineInput.split(" ");
  // while (tokens.length > 1) {
  //   tokens = [eval(tokens.slice(0, 3).join(""))].concat(tokens.slice(3));
  // }
  // return tokens[0];
};

const calcWithParanthesis = (string, calculate) => {
  while (/\(/.test(string)) {
    string = string.replace(/\(([^()]+)\)/g, (match, group) =>
      calculate(group)
    );
  }
  return calculate(string);
};

console.log(calcWithParanthesis(input[3], calculate));

const part1Runner = (data) => {
  let total = 0;
  data.forEach((element) => {
    total += calcWithParanthesis(element, calculate);
  });
  return total;
};

console.log(part1Runner(input));

// Part 2
const calculate2 = (lineInput) => {
  while (/\+/.test(lineInput)) {
    lineInput = lineInput.replace(
      /(\d+) \+ (\d+)/g,
      (match, firstNum, secondNum) => {
        // console.log(firstNum, secondNum);
        return parseInt(firstNum) + parseInt(secondNum);
      }
    );
  }
  // console.log(lineInput);
  return eval(lineInput);
};

console.log(calcWithParanthesis(input[3], calculate2));

const part2Runner = (data) => {
  let total = 0;
  data.forEach((elem) => {
    total += calcWithParanthesis(elem, calculate2);
  });
  return total;
};

console.log(part2Runner(input));
