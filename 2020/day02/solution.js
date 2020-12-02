const fs = require("fs");
const input = fs.readFileSync("./2020/day02/data.txt", "utf8").split("\n");
console.log(input.length);

const regex = /(\d+)-(\d+) (\w): (\w+)/;

const parsePw = (pw) => {
  const passRule = pw.match(regex);
  // console.log(passRule);
  return {
    num1: +passRule[1],
    num2: +passRule[2],
    char: passRule[3],
    test: passRule[4],
  };
};

console.log(parsePw(input[5]));

const result = input.map((entry) => {
  const test = parsePw(entry);

  const testResult = test.test.split("").filter((char) => char === test.char);
  return testResult.length <= test.num2 && testResult.length >= test.num1;
});

const finalResult = result.filter((x) => x === true);
console.log(finalResult.length);

const result2 = input.map((entry) => {
  const test = parsePw(entry);

  const testResult = test.test.split("");
  if (
    testResult[test.num1-1] === test.char &&
    testResult[test.num2-1] === test.char
  )
    return false;
  if (
    testResult[test.num1-1] === test.char ||
    testResult[test.num2-1] === test.char
  )
    return true;
});

const finalResult2 = result2.filter((x) => x === true);
console.log(finalResult2.length);
