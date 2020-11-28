const fs = require("fs");
const input = fs.readFileSync("./2015/day04/data.txt", "utf8");
console.log(input.length);

const crypto = require("crypto");
const INPUT = input;

const md5 = (data) => crypto.createHash("md5").update(data).digest("hex");
const isStartsWithFiveZeros = (data) => data.slice(0, 5) === "00000";
const isStartsWithSixZeros = (data) => data.slice(0, 6) === "000000";

let counter = 0, counter6 = 0;
while (!isStartsWithFiveZeros(md5(`${INPUT}${counter}`))) counter++;
while (!isStartsWithSixZeros(md5(`${INPUT}${counter6}`))) counter6++;

console.log(counter, counter6);

