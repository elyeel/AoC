const fs = require("fs");
const input = fs
  .readFileSync("./texts/text05.txt", "utf8")
  .split(",")
  .map(Number); //convert string to number
console.log(input);
