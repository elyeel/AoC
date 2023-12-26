import fs from "fs";
const inputs = fs
  .readFileSync("./2023/day04/data.txt", "utf8")
  .split("\n")
  .map((x) => x.split(": "))
  .map((x) => x[1])
  .map((x) => x.split(" | "));

// const response = await fetch("https://adventofcode.com/2023/day/2/input");
// const txt = await response.text();
// const inputs = txt.trim().split("\n");

// console.log(inputs);
const solution = (cards) => {
  const result = cards.map((cardN, i) => {
    const matches = [];
    let count = 0;
    // console.log(cardN[1].split(/\s+/));
    // split without trim will produce an extra member below

    cardN[1]
      .trim()
      .split(/\s+/)
      .forEach((combo) => {
        if (
          cardN[0]
            .trim()
            .split(/\s+/)
            .some((elem) => elem == combo)
        )
          ++count;
        // matches.length <= 0 ? matches.push(1) : matches.push(2);
        // ++count;

        // ? matches.push(1)
        // : matches.push(0);
      });
    // return matches;
    //console.log(i, "->", count, cardN[0].split(/\s+/), cardN[1].split(/\s+/));

    const matchObj = {
      card: i + 1,
      wins: count,
      points: count > 0 ? 2 ** (count - 1) : 0,
    };
    return matchObj;
    // return matches.length > 0 ? matches.reduce((a, c) => a * c) : 0;
    // return matches.length > 0 ? 2 ** matches.length - 1 : 0;
  });
  // console.log(result);

  const part1 = result.reduce((a, c) => a + c.points, 0);

  return part1;
};

console.log(solution(inputs));
