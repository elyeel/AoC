const fs = require("fs");
const input = fs.readFileSync("./2020/day09/data.txt", "utf8").split("\n");
console.log(input.length);

// console.log(input.slice(9, 15));
const checkInvalid = (arr) => {
  const lastNum = arr.pop();
  for (let num of arr) {
    const searchNum = lastNum - parseInt(num);
    const idx = arr.indexOf(`${searchNum}`);
    if (idx !== -1 && searchNum !== 0.5 * lastNum) {
      // console.log(arr[idx]);
      return true;
    }
  }
  return false;
};

const getInvalidNumber = (data, preamble) => {
  for (i = 0; i < data.length - preamble - 1; ++i) {
    const arr = data.slice(i, i + preamble + 1);
    // console.log(arr);
    if (!checkInvalid(arr)) return data[i + preamble];
    // console.log(checkInvalid(arr), data[i+preamble]);
  }
};
console.log("Part1 Result =", getInvalidNumber(input, 25)); // getInvalidNumber(input, preamble)
// console.log(checkInvalid(input.slice(9, 15)));

// Part 2
const firstErrNum = parseInt(getInvalidNumber(input, 25));
const errIdx = input.indexOf(`${firstErrNum}`);
// console.log(errIdx);
const arrToCheck = input.slice(0, errIdx).map((x) => parseInt(x));
// console.log(arrToCheck.slice(2, 6).reduce((a, c) => a + c, 0));

// const target = firstErrNum;
const checkValid = (data, target, noOfNumbers) => {
  for (i = 0; i < data.length - noOfNumbers; ++i) {
    const arr = data.slice(i, i + noOfNumbers);
    // const arr = data

    const result = arr.reduce((a, c) => a + c, 0);
    // console.log(arr, result);
    if (result === target) return arr;
  }
  return false;
};

// console.log(checkValid(arrToCheck, firstErrNum, 4));
const findContigousSet = (data) => {
  let j = 2;
  while (!checkValid(data, firstErrNum, j)) {
    ++j;
  }
  return checkValid(data, firstErrNum, j);
};

const resultArr = findContigousSet(arrToCheck).sort((a, b) => a - b);
console.log("Part2 Result =", resultArr.shift() + resultArr.pop());
