const fs = require("fs");
const [range, yourTicket, nearbyTickets] = fs
  .readFileSync("./2020/day16/data.txt", "utf8")
  .split("\n\n");
// .map((x) => parseInt(x));

const tickets = nearbyTickets.split("\n");
// console.log(tickets.length);
// for (let i = 1; i < tickets.length; ++i) {
//   console.log(tickets[i].split(",").length);
// }

// console.log(range);
const rangeMap = new Map();
const regexRange = /(\d+)-(\d+) or (\d+)-(\d+)/;
const rangeSet = new Set();
range.split("\n").forEach((line) => {
  const [key, value] = line.split(": ");
  const vRange = value.match(regexRange);
  const typeRange = new Set();

  for (let i = +vRange[1]; i <= +vRange[2]; ++i) {
    rangeSet.add(i);
    typeRange.add(i);
  }
  for (let i = +vRange[3]; i <= +vRange[4]; ++i) {
    typeRange.add(i);
    rangeSet.add(i);
  }
  rangeMap.set(key, typeRange);
});

// console.log(rangeMap);

let errorRate = 0;
const validNearbyTickets = [];
for (let i = 1; i < tickets.length; ++i) {
  const validTickets = [];
  tickets[i].split(",").forEach((ticket) => {
    if (rangeSet.has(parseInt(ticket))) {
      //valid ticket
      validTickets.push(parseInt(ticket));
    } else {
      // invalid ticket
      errorRate += parseInt(ticket);
      validTickets.push(null);
    }
  });
  // console.log(validTickets.length); // verifying nearby tickets length
  validNearbyTickets.push(validTickets);
}

console.log(validNearbyTickets[142]);
console.log(errorRate);

// Part 2

// const checkColumn = ()
const correct = {};
// const iterator = rangeMap[Symbol.iterator]();
for (const [key, value] of rangeMap) {
  for (let i = 0; i < 20; ++i) {
    correct[i] ? null : (correct[i] = []);

    let countColumn = 0;
    let memberCounter = 0;
    for (let j = 1; j < validNearbyTickets.length; ++j) {
      if (validNearbyTickets[j][i]) {
        memberCounter++;
        countColumn += value.has(validNearbyTickets[j][i]);
      }
    }
    if (countColumn >= memberCounter) {
      correct[i].push(key);
    }
  }
}

// Object.entries(correct).sort(({keya: a}, {keyb: b}) => b.length - a.length)
console.log(correct);
console.log(131 * 67 * 103 * 109 * 71 * 89);
