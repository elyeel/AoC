const fs = require("fs");
const input = fs.readFileSync("./2020/day07/control.txt", "utf8").split("\n");
console.log(input.length);

const map = new Map();

const regexInside = /(\d) (\w+.*) bag/;
const inputData = {};
for (i = 0; i < 9; ++i) {
  // const obj = {};
  let [key, value] = input[i].split(" bags contain ");
  // console.log("key", key);
  if (value !== "no other bags." && value !== null) {
    const val = value.split(", ");
    const valArr = val.map((x, i) => {
      if (i === val.length - 1) {
        x = x.slice(0, -1);
        return x.match(regexInside)[2];
      }
      const temp = x.match(regexInside);
      // console.log(temp);
      return temp[2];
    });
    inputData[key] = valArr;
    // inputData.push(obj);
  } else {
    inputData[key] = [value];
  }
}

console.log(inputData);

const containsShinyGold = (colour) => {
  // console.log(colour);
  // const bagColour = inputData[colour];

  if (!inputData[colour].some((test) => test === colour)) return false;
  if (inputData[colour].some((x) => x === "shiny gold")) return true;
  if (inputData[colour] === null) return false;

  const bagContaining = inputData[colour];
  for (const bag of bagContaining) {
    return containsShinyGold(bag);
  }
};

const colours = Object.keys(inputData);
let total = 0;
// console.log(colours);

for (const colour of colours) {
  if (containsShinyGold(colour)) {
    console.log(colour);
    total++;
  }
}

console.log(total);

// const result = {};

// inputData.forEach(({ bags }, bagColour) => {
//   const { key, value } = bags;
//   if (Object.values(value).indexOf(bagColour)) {
//     inputData
//   }
// });

// const fillBags = (bag) => {
//   const bags = result[bag];
//   if (Object.values(bag).indexOf()) return;
// };

// class Bags {
//   constructor(data) {
//     this.data = data;
//     this.parent = null;
//     this.children = {};
//   }

//   hasShinyBag() {

//   }
// }
