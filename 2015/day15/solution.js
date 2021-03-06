const fs = require("fs");
const input = fs.readFileSync("./2015/day15/data.txt", "utf8").split("\n");
// .map((x) => parseInt(x));
console.log(input.length);
inputObj = {};
input.forEach((elem) => {
  const [key, value] = elem.split(": ");
  inputObj[key] = {};
  const details = value.split(", ");
  details.forEach((elem) => {
    const [keyD, valueD] = elem.split(" ");
    inputObj[key][keyD] = +valueD;
  });
});
console.log(inputObj);

const countScore = (obj) => {
  const resultObj = {};
  const result = [];
  const resultWCalories = [];
  for (let i = 0; i <= 100; ++i) {
    for (let j = 0; j <= 100 - i; ++j) {
      for (let k = 0; k <= 100 - i - j; ++k) {
        const l = 100 - i - j - k;
        const capacity =
          obj.Frosting.capacity * i +
          obj.Candy.capacity * j +
          obj.Butterscotch.capacity * k +
          obj.Sugar.capacity * l;
        const durability =
          obj.Frosting.durability * i +
          obj.Candy.durability * j +
          obj.Butterscotch.durability * k +
          obj.Sugar.durability * l;
        const flavor =
          obj.Frosting.flavor * i +
          obj.Candy.flavor * j +
          obj.Butterscotch.flavor * k +
          obj.Sugar.flavor * l;
        const texture =
          obj.Frosting.texture * i +
          obj.Candy.texture * j +
          obj.Butterscotch.texture * k +
          obj.Sugar.texture * l;
        const calories =
          obj.Frosting.calories * i +
          obj.Candy.calories * j +
          obj.Butterscotch.calories * k +
          obj.Sugar.calories * l;
        const quality = capacity * durability * flavor * texture;
        if (capacity > 0 && durability > 0 && flavor > 0 && texture > 0) {
          result.push(quality);
          if (calories === 500) resultWCalories.push(quality);
        }
      }
    }
  }
  resultObj.result = result;
  resultObj.wCalories = resultWCalories;
  return resultObj;
};
const score = countScore(inputObj);
console.log(Math.max(...score.result));
console.log(Math.max(...score.wCalories));

// const getAboveZero = (arr) => {
//   const result = [];
//   arr.map((x, i) => {
//     x > 0 ? result.push(arr[i]) : null;
//   });
//   return result;
// };
// console.log(getAboveZero(score));
