import fs from "fs";
const input = fs.readFileSync("./2022/day06/data.txt", "utf-8").split("");
// .map((x) => +x);
console.log(input.length);

const solution = (chars, l = chars.length) => {
  let n = 3;
  while (n < l) {
    const charSet = new Set([
      chars[n],
      chars[n - 1],
      chars[n - 2],
      chars[n - 3],
    ]);
    if (charSet.size === 4) return n + 1;
    else ++n;
  }
};

console.log(solution(input));

const solution2 = (chars, l = chars.length) => {
  let n = 13;
  while (n < l) {
    const checkChars = chars.slice(n - 13, n + 1);
    // console.log(checkChars.length);
    const charSet = new Set(checkChars);
    if (charSet.size === 14) return n + 1;
    else ++n;
  }
};

console.log(solution2(input));
