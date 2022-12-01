import fs from "fs";
const input = fs
  .readFileSync("./2022/day01/data.txt", "utf-8")
  .split("\n")
  .map((x) => +x);

// console.log(input);

const solution = (input) => {
  let temp = 0,
    l = input.length,
    sum = 0;

  // console.log(temp, l);

  const result = Math.max(
    ...input.map((x, i) => {
      // console.log(x);

      if (x !== 0 || i === l - 1) temp += x;
      else {
        sum = temp;
        temp = 0;
      }
      return sum;
    })
  );

  return result;
};

console.log(solution(input));

const solution2 = (input) => {
  const result = [];
  let temp = 0;
  input.forEach((element, i) => {
    if (i === input.length - 1) {
      temp += element;
      result.push(temp);
    } else {
      if (element) temp += element;
      else {
        result.push(temp);
        temp = 0;
      }
    }
  });
  return result
    .sort((a, b) => a - b)
    .slice(-3)
    .reduce((a, c) => a + c);
};

console.log(solution2(input));
