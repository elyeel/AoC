const input = require("fs")
  .readFileSync("./2015/day23/data.txt", "utf-8")
  .trim()
  .split(/\n/);

const test = (input, a = 0) => {
  let i = 0,
    reg = { a: a, b: 0 },
    program = input.map((s) => s.match(/([^, ]+)/g)),
    ops = {
      hlf: (x) => (reg[x] *= 0.5),
      tpl: (x) => (reg[x] *= 3),
      inc: (x) => reg[x]++,
      jmp: (x) => (i += +x - 1),
      jie: (x, y) => (i += reg[x] % 2 === 0 ? +y - 1 : 0),
      jio: (x, y) => (i += reg[x] === 1 ? +y - 1 : 0),
    };
  // console.log(program);
  do {
    let [o, x, y] = program[i];
    console.log(o, x, y, i, reg);
    ops[o](x, y);
  } while (++i < program.length);
  return reg;
};

console.log(test(input));
