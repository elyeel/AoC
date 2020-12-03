const fs = require("fs");
const input = fs.readFileSync("./2015/day07/data.txt", "utf8").split("\n");
console.log(input.length);

const result = {};

const bitwise = {
  AND: (a, b) => a & b,
  OR: (a, b) => a | b,
  NOT: (a) => ~a,
  LSHIFT: (a, b) => a << b,
  RSHIFT: (a, b) => a >> b,
};
const commRegex = /([A-Z])+/g;
const bitRegex = /[a-z0-9]+/g;

const parseInstruction = (instruction) => {
  const command = instruction.match(commRegex);
  const args = instruction.match(bitRegex);
  const destination = args.pop();
  // console.log(instruction, command, args, destination);

  return {
    command: command,
    args: args.map((arg) => (isNaN(Number(arg)) ? arg : Number(arg))),
    destination: destination,
  };
};

const filteredInput = input.filter((line) => {
  const instruct = parseInstruction(line);
  // console.log(instruct);

  if (!instruct.command) return line;
});

const filteredInput2 = input.filter((line) => {
  const instruct = parseInstruction(line);
  if (["a", "b", "c"].some((x) => x === instruct.args.map((y) => y))) return line;
});

const calculateOp = (instruct) => {
  // base case for recursive
  // if ()

  if (instruct.command) {
    if (instruct.command[0] === "LSHIFT" || instruct.command[0] === "RSHIFT") {
      result[instruct.destination] = bitwise[instruct.command[0]](
        result[instruct.args[0]],
        instruct.args[1]
      );
    }
    if (instruct.command[0] === "AND" || instruct.command[0] === "OR") {
      result[instruct.destination] = bitwise[instruct.command[0]](
        result[instruct.args[0]],
        result[instruct.args[1]] ? result[instruct.args[1]] : null
      );
    }
    if (instruct.command[0] === "NOT") {
      // console.log(result[instruct.args[0]]);
      result[instruct.destination] =
        bitwise[instruct.command[0]](result[instruct.args[0]]) + 65536;
    }
  } else {
    result[instruct.destination] = instruct.args[0];
  }
};

const test = (data) => {
  data.map((line, i) => {
    const instruct = parseInstruction(line);
    if (result[instruct.destination]) {
      // destination exist in result go here
    } else {
      // destination not exist in result here, create key: value
      //creating new key to result
      calculateOp(instruct);
    }
  });
};
// test();
console.log(filteredInput, filteredInput2);
// console.log(result);
