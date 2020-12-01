const fs = require("fs");
const input = fs.readFileSync("./2020/day01/data.txt", "utf8").split("\n");
console.log(input.length);

const findPart1 = (data) => {
  for (let i = 0; i < data.length; ++i) {
    for (let j = 0; j < data.length; ++j) {
      const a = parseInt(data[i], 10);
      const b = parseInt(data[j], 10);
      if (a + b === 2020) {
        console.log(a, b);
        return a * b;
      }
    }
  }
};

console.log(findPart1(input));

const findStar = (data) => {
  for (let i = 0; i < data.length; ++i) {
    for (let j = 0; j < data.length; ++j) {
      for (let k = 0; k < data.length; ++k) {
        const a = parseInt(data[i], 10);
        const b = parseInt(data[j], 10);
        const c = parseInt(data[k], 10);
        if (a + b + c === 2020) {
          console.log(a, b, c);
          return a * b * c;
        }
      }
    }
  }
};

console.log(findStar(input));


