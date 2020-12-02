const fs = require("fs");
const input = fs.readFileSync("./2015/day07/control.txt", "utf8").split("\n");
console.log(input.length);

const result = {};

const bitwise = {
  AND: (a, b) => a & b,
  OR: (a, b) => a | b,
  NOT: (a) => ~a,
  LSHIFT: (a, b) => a << b,
  RSHIFT: (a, b) => a >> b,
};
const bitRegex = /([A-Z])\w+/g;
const commRegex = /[a-z0-9]+/g;

const parseInstruction = (instruction) => {
  const command = instruction.match(commRegex);
  const args = instruction.match(bitRegex);
  const destination = args.pop();

  return {
    command: command,
    args: args.map((arg) => (isNaN(Number(arg)) ? arg : Number(arg))),
    destination: destination,
  };
};

input.map((line) => {});
