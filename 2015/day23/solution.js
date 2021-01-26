const input = require("fs")
  .readFileSync("./2015/day23/data.txt", "utf-8")
  .trim()
  .split(/\n/)
  .map((x) => x.split(" ").map((x) => (x == "a," ? "a" : x)));
const registers = {
  a: 0, // change this to a: 1 for part 2
  b: 0,
};
const regex = /(\+|\-)(\d+)/;
const instructions = {
  hlf: (reg) => (registers[reg] = 0.5 * registers[reg]),
  tpl: (reg) => (registers[reg] *= 3),
  inc: (reg) => registers[reg]++,
  jmp: (reg) => (i += +reg - 1),
  jie: (reg, curr) => (i += registers[reg] % 2 === 0 ? +curr - 1 : 0),
  jio: (reg, curr) => (i += registers[reg] === 1 ? +curr - 1 : 0),
};
console.log(input);
// program = input.map((s) => s.match(/([^, ]+)/g));

// for (let i = 0; i < input.length; i++) {}

let i = 0;
do {
  // let [o, x, y] = input[i];
  // instructions[o](x, y);

  const line = input[i];
  line ? instructions[line[0]](line[1], line[2]) : null;
  // if (line && line[0] === "jmp") {
  //   i += +line[1] - 1;
  // }
  // if (line && line[0] === "jie") {
  //   const value = line[2].match(regex);
  //   if (registers[line[1]] % 2 === 0)
  //     value[1] === "+" ? (i += parseInt(value[2]) - 1) : 0;
  // }
  // if (line && line[0] === "jio") {
  //   const value = line[2].match(regex);
  //   if (registers[line[1]] === 1)
  //     value[1] === "+" ? (i += parseInt(value[2]) - 1) : 0;
  // }
  // if (line && line[0] === "tpl") registers[line[1]] *= 3;
  // if (line && line[0] === "inc") registers[line[1]]++;
  // if (line && line[0] === "hlf") registers[line[1]] *= 0.5;
  // console.log(line, i, registers);
} while (i++ < input.length);
console.log(registers);
