const [p1, p2] = require("fs")
  .readFileSync("./2020/day22/data.txt", "utf-8")
  .trim()
  .split(/\n\n/);

const p1Cards = p1.split("\n").filter((x, i) => (i !== 0 ? x : null));
const p2Cards = p2.split("\n").filter((x, i) => (i !== 0 ? x : null));
console.log(p1Cards);

const turn = (cards1, cards2) => {
  let count = 1;
  while (cards1.length >= 1 && cards2.length >= 1) {
    // console.log(count, cards1, cards2);
    if (parseInt(cards1[0]) > parseInt(cards2[0])) {
      cards1.push(cards1[0]);
      cards1.push(cards2[0]);
      cards2.shift();
      cards1.shift();
    } else {
      cards2.push(cards2[0]);
      cards2.push(cards1[0]);
      cards2.shift();
      cards1.shift();
    }
    // count++;
  }
  return cards1.length > 0 ? cards1 : cards2;
};

const l = p1Cards.length + p2Cards.length;
const part1Result = turn(p1Cards, p2Cards).reduce(
  (a, c, i) => a + c * (l - i),
  0
);
console.log(part1Result);
