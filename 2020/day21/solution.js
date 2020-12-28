let foodList = require("fs")
  .readFileSync("./2020/day21/control.txt", "utf-8")
  .trim()
  .split("\n");

console.log(foodList);
const obj = {}
for (const food of foodList) {
  const [foods, allergens] = food.split(" (contains ")
  
}