const fs = require("fs");
const input = fs.readFileSync("./2015/day06/data.txt", "utf8").split("\n");
console.log(input.length);

const parseCommand = (comm) => {
  const regex = /(?<command>toggle|turn on|turn off) (?<x1>\d+),(?<y1>\d+) through (?<x2>\d+),(?<y2>\d+)/;
  const command = comm.match(regex);
  // console.log(command);
  return {
    command: command[1], //command[0] contains the whole string
    x1: +command[2],
    y1: +command[3],
    x2: +command[4],
    y2: +command[5],
  };
};

// for (let i = 0; i < input.length; ++i) {
//   console.log(parseCommand(input[i]));
// }
const lights = Array.from(Array(1000), () => new Array(1000));
const lights2 = Array.from(Array(1000), () => new Array(1000));

const initialize = (max = 1000) => {
  for (let i = 0; i < max; ++i) {
    for (let j = 0; j < max; ++j) {
      lights[i][j] = 0;
      lights2[i][j] = 0;
    }
  }
};
initialize();

// console.log(JSON.stringify(lights2[1][1], "-", 2));

input.forEach((comm) => {
  const command = parseCommand(comm);

  for (x = command.x1; x <= command.x2; ++x) {
    for (y = command.y1; y <= command.y2; ++y) {
      if (command.command === "turn on") {
        lights[x][y] = 1;
        lights2[x][y]++;
      }
      if (command.command === "turn off") {
        lights[x][y] = 0;
        lights2[x][y] <= 0 ? null : (lights2[x][y]--);
      }
      if (command.command === "toggle") {
        lights[x][y] === 1 ? (lights[x][y] = 0) : (lights[x][y] = 1);
        lights2[x][y] += 2;
      }
    }
  }
});

const result = lights
  .map((x) => {
    return x.reduce((total, light) => (light === 1 ? ++total : total), 0);
    // return total;
  })
  .reduce((total, light) => total + light, 0);
// const test = result;

const result2 = lights2
  .map((x) => {
    return x.reduce((total, light) => total + light, 0);
    // return total;
  })
  .reduce((total, light) => total + light, 0);
// console.log(lights2);
console.log(result, result2);
