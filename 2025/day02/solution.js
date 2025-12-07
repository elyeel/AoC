import fs from "fs";
const startTime = Date.now();

// Command-line argument parsing: choose input file
// Usage: node solution.js           (defaults to data.txt)
//        node solution.js test      (uses test.txt)
//        node solution.js data      (uses data.txt)
const arg = process.argv[2] ? process.argv[2].toLowerCase() : "data";
const fileName = arg === "test" ? "test.txt" : "data.txt";
const inputPath = `./2025/day02/${fileName}`;

if (!fs.existsSync(inputPath)) {
  console.error(`Error: File not found: ${inputPath}`);
  process.exit(1);
}

console.log(`Using input: ${inputPath}\n`);

const inputs = fs
  .readFileSync(inputPath, "utf8")
  .split(/,/)
  .filter(Boolean)
  .map((x) => [...x.split(/-/)]);

console.log("Data length:", inputs.length, "— sample:", inputs.slice(0, 5));

// function to check if an ID is invalid, returns true if invalid, returns an object with details {invalid: true, result: [...]}
const isInvalidID = (id) => {
  const result = { invalid: false, details: [] };
  const [min, max] = id;
  // console.log(min, max);
  // if (min.length % 2 === 0 && max.length % 2 === 0) {
  // even length IDs cannot have a middle letter
  for (let i = +min; i <= +max; i++) {
    // console.log(i);
    const strI = i.toString();
    const midIndex = strI.length / 2;
    const frontHalf = strI.slice(0, midIndex);
    const backHalf = strI.slice(midIndex);
    // console.log(strI, frontHalf, backHalf);
    if (frontHalf === backHalf) {
      result.invalid = true;
      result.details.push(strI);
    }
  }
  // return count < min || count > max;
  // } else {
  //   console.log("IDs with odd length are not supported yet.");
  //   // return false;
  // }
  // console.log(result);
  return result;
};

// isInvalidID(["11", "22"]);
let results = [];
const part1 = inputs
  .map((id) => isInvalidID(id))
  .map((res, idx) => {
    if (res.invalid) res.details.forEach((detail) => results.push(detail));
    return res;
  });
console.log(
  "Part 1 results:",
  results.reduce((a, b) => +a + +b, 0)
);

const isInvalidIDv3 = (id) => {
  const result = { invalid: false, details: [] };
  const [min, max] = id;

  for (let i = +min; i <= +max; i++) {
    const strI = i.toString();
    const len = strI.length;

    // Check for all possible substring lengths
    if (isInvalid(strI)) {
      result.invalid = true;
      result.details.push(strI);
    }
  }
  return result;
};

// isInvalidID concept -> works for part 2
const isInvalid = (id) => {
  let result = false;
  for (let len = 1; len <= id.length / 2; len++) {
    const pattern = id.slice(0, len);
    const repetitions = id.length / len;
    if (pattern.repeat(repetitions) === id) {
      result = true;
      break;
    }
  }

  return result;
};

// Testing isInvalid function
// console.log(isInvalid("1212")); // true
// console.log(isInvalid("123123")); // true
// console.log(isInvalid("1234")); // false
// console.log(isInvalid("1188511885")); //true
// console.log(isInvalid("12341234")); // true
// console.log(isInvalid("123123123")); // true
// console.log(isInvalid("123456")); // false

//Part 2: Process all ranges and sum invalid IDs
let resultsPart2 = [];
const part2 = inputs
  .map((id) => isInvalidIDv3(id))
  .map((res) => {
    if (res.invalid)
      res.details.forEach((detail) => resultsPart2.push(+detail));
    return res;
  });

const part2Sum = resultsPart2.reduce((a, b) => a + b, 0);
console.log("\nPart 2 results:");
console.log("Sum of invalid IDs:", part2Sum);

console.log("\nElapsed:", Date.now() - startTime, "ms");
