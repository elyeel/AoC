const fs = require("fs");
const { parse } = require("path");
const input = fs.readFileSync("./2020/day04/data.txt", "utf8").split("\n");
console.log(input.length);

const separateArray = (input) => {
  const separatedArr = [];
  let tempObj = {};
  for (let i = 0; i < input.length; ++i) {
    if (input[i] !== "") {
      // console.log(input[i].split(" "));
      input[i].split(" ").map((x) => {
        [key, value] = x.split(":");
        tempObj[key] = value;
      });
    } else {
      if (Object.keys(tempObj).length >= 7) {
        separatedArr.push(tempObj);
      }
      // console.log(tempObj);
      tempObj = {};
    }
    if (i === input.length - 1) separatedArr.push(tempObj);
  }
  return separatedArr;
};
console.log(separateArray(input).length);

let valid = 0,
  valid2 = 0;
separateArray(input).map((elem) => {
  // console.log(elem.byr);
  if (
    elem.byr &&
    elem.iyr &&
    elem.eyr &&
    elem.hgt &&
    elem.hcl &&
    elem.ecl &&
    elem.pid
  ) {
    valid++;
  }
});
console.log("done", valid);
const regexHeight = /([0-9]+)(cm|in)/;
const regexHair = /#([0-9a-f]{6})/g;
const regexEye = /amb|blu|brn|gry|grn|hzl|oth/;

const separateArray2 = (input) => {
  const separatedArr = [];
  let tempObj = {};
  for (let i = 0; i < input.length; ++i) {
    if (input[i] !== "") {
      // console.log(input[i].split(" "));
      input[i].split(" ").map((x) => {
        [key, value] = x.split(":");
        tempObj[key] = value;
      });
    } else {
      if (
        Object.keys(tempObj).length >= 7 &&
        tempObj.pid &&
        tempObj.pid.length === 9 &&
        tempObj.byr &&
        parseInt(tempObj.byr, 10) >= 1920 &&
        parseInt(tempObj.byr, 10) <= 2002
      ) {
        separatedArr.push(tempObj);
      }
      // console.log(tempObj);
      tempObj = {};
    }
    if (i === input.length - 1) separatedArr.push(tempObj);
  }
  console.log(separatedArr.length);
  return separatedArr;
};

separateArray2(input).map((elem) => {
  let height = 0;
  let hair = "";
  let unit = "";
  // console.log(elem.ecl, regexEye.test(elem.ecl));
  // elem.pid ? console.log(elem.pid, elem.pid.length) : console.log(elem.pid);
  // elem.hgt ? console.log("1", elem.hgt) : console.log("1", elem.hgt);
  if (elem.hgt && elem.hgt.match(regexHeight)) {
    // console.log(elem.hgt, elem.hgt.match(regexHeight));
    elem.hgt.match(regexHeight)[2] === "cm" ||
    elem.hgt.match(regexHeight)[2] === "in"
      ? ((height = elem.hgt.match(regexHeight)[1]),
        (unit = elem.hgt.match(regexHeight)[2]))
      : (height = undefined);
    // console.log(height);
  }
  // console.log(elem.hcl);
  if (elem.hcl && regexHair.test(elem.hcl)) {
    hair = elem.hcl.match(regexHair)[0];
    // console.log("result", hair);
  } else {
    hair = false;
  }
  // console.log(regexEye.test(elem.ecl) ? elem.ecl : elem.ecl);
  if (
    elem.byr &&
    elem.byr.length === 4 &&
    parseInt(elem.byr) >= 1920 &&
    parseInt(elem.byr) <= 2002 &&
    elem.iyr &&
    elem.iyr.length === 4 &&
    parseInt(elem.iyr) >= 2010 &&
    parseInt(elem.iyr) <= 2020 &&
    elem.eyr &&
    elem.eyr.length === 4 &&
    parseInt(elem.eyr) >= 2020 &&
    parseInt(elem.eyr) <= 2030 &&
    elem.hgt &&
    height &&
    ((height >= 150 && height <= 193 && unit === "cm") ||
      (height <= 76 && height >= 59 && unit === "in")) &&
    elem.hcl &&
    hair &&
    hair.length === 7 &&
    regexEye.test(elem.ecl) &&
    elem.pid &&
    elem.pid.length === 9
  ) {
    valid2++;
  } else {
    // console.log(elem);
  }
});
console.log(valid2);
