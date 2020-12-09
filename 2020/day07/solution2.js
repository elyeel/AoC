const fs = require("fs");
const input = fs.readFileSync("./2020/day07/control.txt", "utf8").split("\n");
console.log(input.length);

// Part 2
const regexBag = /(\d) (\w+ \w+) bag/;
const inputData = {};

for (const line of input) {
  const [bag, contains] = line.split(" bags contain ");
  let obj = {};
  const temp = [];
  if (contains === "no other bags.") {
    obj["no other"] = 0;
    temp.push(obj);
    // inputData[bag] = "no other";
  } else {
    contains.split(", ").map((elem) => {
      obj = {};
      const detail = elem.match(regexBag);
      obj[detail[2]] = +detail[1];
      temp.push(obj);
    });
  }
  inputData[bag] = temp;
}

// console.log(inputData);

let total = 0;
let totalBags = 0;

const hasShinyGold = (colour) => {
  if (colour == "shiny gold") return true;
  if (colour == undefined) return false;
  if (colour === "no other") return false;

  const hasBags = inputData[colour];
  if (hasBags === undefined) return false;

  for (const bagObj of hasBags) {
    // console.log(bagObj);
    for (const [bag, value] of Object.entries(bagObj)) {
      // console.log(bag, value)
      const test = hasShinyGold(bag);
      if (test === true) {
        return test;
      }
    }
  }
};
const colours = Object.keys(inputData);

for (const colour of colours) {
  if (colour !== "shiny gold" && hasShinyGold(colour)) {
    total++;
  }
}

const canContain = (colour) => {
  const hasBags = inputData[colour];

  for (const bagObj of hasBags) {
    for (const [bag, value] of Object.entries(bagObj)) {
      console.log(value);
      if (bag == "no other") {
        return totalBags;
      } else {
        totalBags += value;
        canContain(bag);
        // console.log(bag)
      }
    }
  }
};
canContain("shiny gold");
console.log(total, totalBags);
