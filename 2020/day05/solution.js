const fs = require("fs");
const input = fs.readFileSync("./2020/day05/data.txt", "utf8").split("\n");
console.log(input.length);

const decode = (str) => {
  const code = str.split("");
  const row = [],
    column = [];
  for (i = 0; i < 128; ++i) {
    row.push(i);
  }
  const result = [];
  for (i = 0; i < 8; ++i) {
    column.push(i);
  }

  let rows = [128, 64, 32, 16, 8, 4, 2];
  let remove = 0;
  for (let i = 0; i < 7; ++i) {
    remove = 0.5 * rows[i];
    if (code[i] === "F") {
      for (j = 0; j < remove; ++j) {
        row.pop();
      }
    } else {
      for (j = 0; j < remove; ++j) {
        row.shift();
      }
    }
  }
  result.push(row[0]);

  const columns = [8, 4, 2];
  remove = 0;
  for (i = 0; i < 3; ++i) {
    remove = 0.5 * columns[i];
    const num = i + 7;
    if (code[num] === "L") {
      for (j = 0; j < remove; ++j) {
        column.pop();
      }
    } else {
      for (j = 0; j < remove; ++j) {
        column.shift();
      }
    }
  }
  result.push(column[0]);
  return row[0] * 8 + column[0];
};

const result = input.map((x) => decode(x)).sort((a, b) => a - b);

console.log(result.length);
console.log("test", result[result.length - 1]);
console.log(Math.max(...result));

// console.log(result);
const res = result.map((x, i) => {
  // console.log(x);
  if (parseInt(x) !== i + 96) return x;
  else return "x";
});
// console.log(res);

let found = [];
for (i < 1; i < input.length - 1; ++i) {
  if (result[i - 1] != result[i] - 1 || result[i + 1] != result[i] + 1)
    found.push(result[i]);
}
console.log(found); //found 2 numbers, your seat is between those 2 numbers

// simpler code below
const binaryDecode = (str) => {
  //because "F" === "0" in binary and "B" = "1" in binary
  const code = str.split("");
  let row = "",
    column = "";
  for (i = 0; i < 7; ++i) {
    code[i] === "B" ? (row += "1") : (row += "0");
  }
  for (i = 7; i < 10; ++i) {
    code[i] === "R" ? (column += "1") : (column += "0");
  }
  return parseInt(row, 2) * 8 + parseInt(column, 2);
};

const resultWBinary = input
  .map((elem) => binaryDecode(elem))
  .sort((a, b) => a - b)
  .pop();

// console.log(binaryDecode("BFFFBBFRRR"));
// console.log(binaryDecode("FFFBBBFRRR"));
// console.log(binaryDecode("BBFFBBFRLL"));

console.log(resultWBinary); //part1


