const fs = require("fs");
const input = fs.readFileSync("./2020/day14/data.txt", "utf8").split("\n");
// .map((x) => parseInt(x));
console.log(input.length);

const currMask = "";

function decToBin(dec) {
  const bin = (dec >>> 0).toString(2);
  const leadingZeros = "000000000000000000000000000000000000";
  const result = leadingZeros.substr(bin.length) + bin;
  return result;
}

// console.log(decToBin(101));

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
const genBinaryCombo = (numX) => {
  const replaceXWith = [];
  for (let j = 0; j < 2 ** numX; j++) {
    replaceXWith.push((j >>> 0).toString(2).padStart(numX, 0));
  }
  return replaceXWith;
};
// console.log(genBinaryCombo(3));

const applyMask2 = (mask, bin) => {
  let result = [];

  const numX = mask.split("").reduce((a, c) => (c === "X" ? a + 1 : a + 0), 0);
  const binComboArr = genBinaryCombo(numX);

  for (let x = 0; x < 2 ** numX; ++x) {
    let res = "";
    let xNo = 0;

    for (let i = 0; i < mask.length; ++i) {
      if (mask[i] === "0") {
        res += bin[i];
      }
      if (mask[i] === "1") {
        res += "1";
      }
      if (mask[i] === "X") {
        res += binComboArr[x][xNo];
        xNo++;
      }
    }
    result.push(res);
  }
  return result;
};

// console.log(applyMask2("00000000000000000000000000000000X0XX", decToBin(26)));

const part2Runner = (lines) => {
  const resultMap = new Map();
  let currMask;

  for (const line of lines) {
    const [maskMem, value] = line.split(" = ");
    if (maskMem === "mask") {
      currMask = value;
      continue;
    }

    const addr = maskMem.match(/(\d+)/)[1];
    const bin = decToBin(addr);
    const memAddress = applyMask2(currMask, bin);
    memAddress.forEach((mem) => {
      const address = binToDec(mem);
      resultMap.set(parseInt(address), parseInt(value));
    });
  }

  return resultMap;
};

const memory = part2Runner(input);
let memorySum = 0;
memory.forEach((x) => (memorySum += x));
console.log(memorySum);
