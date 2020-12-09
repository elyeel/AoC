const fs = require("fs");
const input = fs.readFileSync("./2020/day07/data.txt", "utf8").split("\n");
console.log(input.length);

const regexInside = /(\d) (\w+.*) bag/;
const inputData = {};
for (i = 0; i < input.length; ++i) {
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
    inputData[key] = ["no other"];
  }
}

console.log(inputData);
let total = 0;

const hasShinyGold = (colour) => {
  if (colour == "shiny gold") return true;
  if (colour == undefined) return false;
  if (colour === "no other") return false;

  const hasBags = inputData[colour];
  if (hasBags === undefined) return false;

  for (const bag of hasBags) {
    const test = hasShinyGold(bag);
    if (test === true) return test;
  }
};
const colours = Object.keys(inputData);

for (const colour of colours) {
  if (colour !== "shiny gold" && hasShinyGold(colour)) {
    total++;
  }
}
console.log(total);
