const fs = require("fs");
const input = fs
  .readFileSync("./texts/text05.txt", "utf8")
  .split(",")
  .map(Number); //convert string to number

const intCode = data => {
  for (let i = 0; i < data.length; i += 4) {
    if (data[i] === 99) {
      return data;
    }
    if (data[i] === 1) {
      data[data[i + 3]] = data[data[i + 1]] + data[data[i + 2]];
    }
    if (data[i] === 2) {
      data[data[i + 3]] = data[data[i + 1]] * data[data[i + 2]];
    }
  }
};
console.log(input[input.length - 1]);
