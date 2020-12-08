const fs = require("fs");
const input = fs.readFileSync("./2020/day06/data.txt", "utf8").split("\n");
console.log(input.length);
const inputGroup = [];

let tempArr = [];
for (i = 0; i < input.length; ++i) {
  if (input[i] === "") {
    inputGroup.push(tempArr);
    tempArr = [];
  } else {
    tempArr.push(input[i]);
  }
  if (i === input.length - 1) inputGroup.push(tempArr);
}

const result = [];
const result2 = [];
inputGroup.forEach((group) => {
  const groupObj = {};
  const person = group.length;
  for (let person of group) {
    person
      .split("")
      .map((q) => (groupObj[q] ? groupObj[q]++ : (groupObj[q] = 1)));
  }
  result.push(Object.keys(groupObj).length);
  let count = 0;
  for (const [key, value] of Object.entries(groupObj)) {
    value === person ? count++ : null;
  }
  result2.push(count);
});

const finalResult = result.reduce((a, c) => a + c, 0);
const finalResult2 = result2.reduce((a, c) => a + c, 0);

console.log(inputGroup.pop());
console.log(finalResult, finalResult2);
