const fs = require("fs");
const input = fs
  .readFileSync("./2020/day10/data.txt", "utf8")
  .split("\n")
  .map((x) => parseInt(x));
console.log(input.length);

// Part 1
const highestRated = Math.max(...input);
const builtInAdapter = highestRated + 3;
const resultObj = {};

const result = input.sort((a, b) => a - b);
result.push(builtInAdapter);
result.unshift(0);

for (let i = 0; i < result.length - 1; ++i) {
  const num = result[i + 1] - result[i];
  resultObj[num] ? resultObj[num]++ : (resultObj[num] = 1);
}

console.log(result, resultObj);

// Part 2
const getPrev3Num = (arr, idx) => {
  const prev3NumArr = [];
  for (let j = idx - 1; j >= 0; --j) {
    if (idx - j <= 3) prev3NumArr.push(arr[j]);
  }
  return prev3NumArr;
};
// console.log(getPrev3Num(input, 2));

const distinctCombination = (data) => {
  const routes = {};
  routes["0"] = 1;

  for (let i = 1; i < data.length; ++i) {
    routes[data[i]] = 0;
    getPrev3Num(data,i).map(elem => {
      if (data[i] - elem <= 3) routes[data[i]] += routes[elem]
    })
  }

  return routes;
};

console.log(distinctCombination(input));
