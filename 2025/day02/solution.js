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
  part1,
  results.reduce((a, b) => +a + +b, 0)
);

console.log("\nElapsed:", Date.now() - startTime, "ms");
