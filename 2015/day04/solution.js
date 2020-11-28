const fs = require("fs");
const input = fs.readFileSync("./2015/day04/data.txt", "utf8");
console.log(input.length);

const crypto = require("crypto");
const INPUT = input;

const md5 = (data) => crypto.createHash("md5").update(data).digest("hex");
const isStartsWithFiveZeros = (data) => data.slice(0, 5) === "00000";

let counter = 0;
while (!isStartsWithFiveZeros(md5(`${INPUT}${counter}`))) counter++;

console.log(counter);