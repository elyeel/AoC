const fs = require("fs");
const input = fs.readFileSync("./2020/day04/data.txt", "utf8").split("\n");
console.log(input.length);

const separateArray = (input) => {
  const separatedArr = [];
  let tempObj = {};
  for (let i = 0; i < input.length; ++i) {
    let putIn = true;
    if (input[i] !== "") {
      // console.log(input[i].split(" "));
      input[i].split(" ").map((x) => {
        [key, value] = x.split(":");

        if (key === "byr") {
          isNaN(Number(value))
            ? console.log("look", value)
            : (value = Number(value, 10));
          value <= 2002 && value >= 1920 ? putIn : (putIn = false);
        }

        if (key === "iyr") {
          isNaN(Number(value))
            ? console.log("look", value)
            : (value = Number(value, 10));
          value <= 2020 && value >= 2010 ? putIn : (putIn = false);
        }

        if (key === "eyr") {
          isNaN(Number(value))
            ? console.log("look", value)
            : (value = Number(value, 10));
          value <= 2030 && value >= 2020 ? putIn : (putIn = false);
        }

        if (key === "ecl") {
          ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].some(
            (x) => x === value
          )
            ? value
            : (putIn = false);
        }

        if (key === "pid") {
          value.length === 9 ? value : (putIn = false);
        }

        if (key === "hgt") {
          const regexHeight = /([0-9]+)(cm|in)/;
          regexHeight.test(value) ? value : (putIn = false);
          const height = value.match(regexHeight);
          if (putIn)
            height[2] === "cm" || height[2] === "in" ? value : (putIn = false);
          if (putIn) {
            (height[1] >= 59 && height[1] <= 76 && height[2] === "in") ||
            (height[1] >= 150 && height[1] <= 193 && height[2] === "cm")
              ? (value)
              : (putIn = false);
          }
        }

        if (key === "hcl") {
          const regexHair = /#([0-9a-f]{6})/g;
          value.length === 7 ? value : (putIn = false);
          value[0] === "#" ? value : (putIn = false);
          // for (i = 1; i < 7; ++1) {

          // }
          regexHair.test(value) ? value : (putIn = false);
        }

        //last part to put in key value pair
        if (key !== "cid" && putIn) {
          tempObj[key] = value;
        }
      });
    } else {
      if (Object.keys(tempObj).length >= 7) {
        separatedArr.push(tempObj);
      }
      // console.log(tempObj);
      tempObj = {};
    }
    // if (i === input.length - 1) separatedArr.push(tempObj); unnecessary to include the last item
  }
  return separatedArr;
};

console.log(separateArray(input).length);
