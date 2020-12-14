const fs = require("fs");
const input = fs.readFileSync("./2020/day14/control2.txt", "utf8").split("\n");
// .map((x) => parseInt(x));
console.log(input.length);

const currMask = "";

function decToBin(dec) {
  const bin = (dec >>> 0).toString(2);
  const leadingZeros = "000000000000000000000000000000000000";
  const result = leadingZeros.substr(bin.length) + bin;
  return result;
}

// console.log(decToBin(101).length);

const applyMask = (mask, dec) => {
  let result = "";
  for (let i = 0; i < mask.length; ++i) {
    if (mask[i] === "X") result += dec[i];
    if (mask[i] === "1" || mask[i] === "0") result += mask[i];
  }
  return result;
};

// console.log(applyMask("000000000000000000000000000000X1001X", decToBin(100)));

const binToDec = (bin) => {
  return parseInt(bin, 2);
};

// console.log(binToDec("000000000000000000000000000001001001"));

const part1Runner = (data) => {
  const result = {};
  let currMask = "";

  data.forEach((mem) => {
    const [maskMem, value] = mem.split(" = ");

    if (maskMem === "mask") currMask = value;
    else {
      const memAddress = maskMem.match(/mem\[(\d+)\]/)[1];
      const bin = decToBin(value);
      const wMask = applyMask(currMask, bin);
      const finalValue = binToDec(wMask);
      // console.log(bin, wMask, finalValue);
      result[memAddress] = finalValue;
    }
  });

  return result;
};

const resultObj = part1Runner(input);
let sum = 0;
for (const entry of Object.values(resultObj)) {
  sum += entry;
}

console.log(sum);

// Part 2
const applyMask2 = (mask, bin) => {
  let result = [];

  const numX = mask.split("").reduce((a, c) => (c === "X" ? a + 1 : a + 0), 0);
  for (let x = 0; x < numX; ++x) {
    let res1 = "",
      res2 = "";
    for (let i = 0; i < mask.length; ++i) {
      if (mask[i] === "0") {
        res1 += bin[i];
        res2 += bin[i];
      }
      if (mask[i] === "1") {
        res1 += "1";
        res2 += "1";
      }
      if (mask[i] === "X") {
        if (x % 2 === 0) {
          res1 += "1";
          res2 += "0";
        } else {
          res1 += "0";
          res2 += "1";
        }
      }
    }
    result.push(res1);
    result.push(res2);
  }
  return result;
};

console.log(applyMask2("000000000000000000000000000000X1001X", decToBin(42)));
