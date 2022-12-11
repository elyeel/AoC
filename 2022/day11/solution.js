import fs from "fs";

const regex = /\d+/g;
const data = fs
  .readFileSync("./2022/day11/data.txt", "utf-8")
  .trim()
  .split("\n\n")
  .map((x) => {
    const lines = x.split("\n");
    const num = +lines[0].match(regex);
    const items = lines[1].match(regex).map(Number);
    const op = (old) => eval(lines[2].split("= ")[1]);
    const divisibleBy = +lines[3].match(regex);
    const toMonkey = [lines[4], lines[5]].map((x) => +x.match(/\d/g)); //index 0 for true index 1 for false
    return { num, items, op, divisibleBy, toMonkey, inspects: 0 };
  });

// console.log(data);

const solution = (monkeys, round = 20, part = 1) => {
  // using LCM method to simplify big number in part 2, thanks redditor! https://www.reddit.com/r/adventofcode/comments/zih7gf/2022_day_11_part_2_what_does_it_mean_find_another/
  const mod = monkeys
    .map(({ divisibleBy }) => divisibleBy)
    .reduce((a, c) => a * c);

  while (round > 0) {
    monkeys.forEach((monkey) => {
      monkey.items.forEach((item) => {
        const worryLevel =
          part === 1 ? Math.floor(monkey.op(item) / 3) : monkey.op(item) % mod;
        worryLevel % monkey.divisibleBy === 0
          ? monkeys[monkey.toMonkey[0]].items.push(worryLevel)
          : monkeys[monkey.toMonkey[1]].items.push(worryLevel);
        ++monkey.inspects;
      });
      monkey.items = []; // zero the items, given to other monkey
    });
    --round;
  }
  monkeys.sort((a, b) => a.inspects - b.inspects);
  const mostActiveMultiplied = monkeys
    .slice(-2)
    .reduce((a, c) => a.inspects * c.inspects);
  console.log("Multiplication result = ", mostActiveMultiplied);
};

solution(data, 10000, 2);

console.log(data);
