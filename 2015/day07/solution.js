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

const calculateOp = (instruct) => {
  // base case for recursive, this function is useless
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

const calculateWire = (wireName) => {
  const wireNameObj = result[wireName];
  // console.log(wireName, wireNameObj);

  if (typeof wireName === "number") {
    console.log("first ", wireName, typeof wireName);
    return wireName;
  }
  if (typeof wireNameObj === "number") {
    console.log("2nd ", wireNameObj, typeof wireNameObj);
    return wireNameObj;
  }
  if (typeof wireNameObj === "undefined") {
    console.log("3rd ", wireNameObj, typeof wireNameObj);
    return undefined;
  }

  if (!wireNameObj.command) {
    result[wireName] = calculateWire(wireNameObj.args[0]);
  } else {
    result[wireName] = bitwise[wireNameObj.command](
      calculateWire(wireNameObj.args[0]),
      calculateWire(wireNameObj.args[1])
    );
  }

  return result[wireName];
};

input.forEach((element) => {
  const parsedInstruction = parseInstruction(element);
  result[parsedInstruction.destination] = {
    command: parsedInstruction.command,
    args: parsedInstruction.args,
  };
});

// result["b"] = 46065; // remove/disable this line to get part1
// console.log(result);
console.log(calculateWire("lz"));
console.log(result["lz"]);
// console.log(calculateWire("lz"));
// console.log(result["lz"]);
