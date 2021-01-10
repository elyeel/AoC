const [p1, p2] = require("fs")
  .readFileSync("./2020/day22/data.txt", "utf-8")
  .trim()
  .split(/\n\n/);

const p1Cards = p1.split("\n").filter((x, i) => (i !== 0 ? x : null));
const p2Cards = p2.split("\n").filter((x, i) => (i !== 0 ? x : null));
// console.log(p1Cards);

const turn = (cards1, cards2) => {
  let count = 1;
  while (cards1.length >= 1 && cards2.length >= 1) {
    // console.log(count, cards1, cards2);
    const p1Draw = cards1.shift();
    const p2Draw = cards2.shift();
    if (parseInt(p1Draw) > parseInt(p2Draw)) {
      cards1.push(p1Draw);
      cards1.push(p2Draw);
    } else {
      cards2.push(p2Draw);
      cards2.push(p1Draw);
    }
    // count++;
  }
  return cards1.length > 0 ? cards1 : cards2;
};

const l = p1Cards.length + p2Cards.length;
// const part1Result = turn(p1Cards, p2Cards).reduce(
//   (a, c, i) => a + c * (l - i),
//   0
// );
// console.log(part1Result);
// Part 2
const recurCombat = (cards1, cards2) => {
  const playedRound = new Set();

  let count = 1;
  while (cards1.length >= 1 && cards2.length >= 1) {
    // console.log(count, cards1, cards2);
    const currRound = cards1.join(",") + "-" + cards2.join(",");
    const p1Draw = cards1.shift();
    const p2Draw = cards2.shift();

    if (playedRound.has(currRound)) {
      return {
        winner: 1,
        cards: cards1,
      };
    }
    playedRound.add(currRound);

    // going into recursive combat situation
    let winning;
    if (
      parseInt(p1Draw) <= cards1.length &&
      parseInt(p2Draw) <= cards2.length
    ) {
      // playing recursive combat here
      const { winner, cards } = recurCombat(
        cards1.slice(0, p1Draw),
        cards2.slice(0, p2Draw)
      );
      winning = winner;
      // console.log("Winner player :", winning);
    } else {
      winning = parseInt(p1Draw) > parseInt(p2Draw) ? 1 : 2;
    }

    if (winning == 1) {
      cards1.push(p1Draw);
      cards1.push(p2Draw);
    } else {
      cards2.push(p2Draw);
      cards2.push(p1Draw);
    }

    count++;
  }
  return {
    winner: cards1.length > 0 ? 1 : 2,
    cards: cards1.length > 0 ? cards1 : cards2,
  };
};

const part2Result = recurCombat(p1Cards, p2Cards);
console.log(part2Result.cards.reduce((a, c, i) => a + c * (l - i), 0));
