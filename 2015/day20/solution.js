const input = 34000000;
const test = 130;

const totalPresents = (num) => {
  let total = 0;
  for (let i = 1; i <= num; i++) {
    num % i === 0 ? (total += i) : 0;
  }
  return total;
};

console.log(totalPresents(800000) >= input / 10);

const part1Runner = (maxCap) => {
  // brute force

  let i = 700000;
  while (totalPresents(i) <= maxCap / 10) {
    i++;
    i % 10000 === 0 ? console.log(i) : null;
  }
  return i;
};

console.log(part1Runner(input));
// Part 2

const presents = [];
const presents2 = [];

for (let e = 1; e < input / 10; e++) {
  let visits = 0;
  for (let i = e; i < input / 10; i = i + e) {
    if (!presents[i]) presents[i] = 10;
    presents[i] = presents[i] + e * 10;

    if (visits < 50) {
      if (!presents2[i]) presents2[i] = 11;
      presents2[i] = presents2[i] + e * 11;
      visits = visits + 1;
    }
  }
}

const partOne = presents.reduce(
  (min, current, index) =>
    min === 0 && current >= input ? (min = index) : min,
  0
);
const partTwo = presents2.reduce(
  (min, current, index) =>
    min === 0 && current >= input ? (min = index) : min,
  0
);

console.log(partOne);
console.log(presents2.filter((x, i) => (x > input ? i : null))[0]);
console.log(partTwo);
