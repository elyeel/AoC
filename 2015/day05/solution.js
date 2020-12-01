const fs = require("fs");
const input = fs.readFileSync("./2015/day05/control.txt", "utf8").split("\n");
console.log(input.length);

const regexWrong = /ab|cd|pq|xy\w/;
const regexDouble = /(.)\1/;
const regexVowels = /(\w*[aeuio]\w*){3,}/;
let count = 0, countTwo = 0;

const hasDouble = (strs) => /(.)\1/.test(strs);
const hasVowels = (strs) => /(\w*[aeuio]\w*){3,}/.test(strs);
const hasUndesired = (strs) => /ab|cd|pq|xy\w/.test(strs);

const checkWord = (word) => {
  if (
    word.search(regexWrong) < 0 &&
    word.search(regexDouble) >= 0 &&
    word.search(regexVowels) >= 0
  )
    return true;
  // if (word.search(regexDouble) < 0) return false;
  // if (word.search(regexVowels) < 0) return false;
  // if (word.search(regexWrong) >= 0) return false;
  // return true;
  return false;
};

const checkString = str => {
  if (hasDouble(str) && hasVowels(str) && !hasUndesired(str)) return true;
  return false
}

input.map((word) => {
  checkWord(word) ? count++ : null;
  checkString(word) ? countTwo++ : null;
});

console.log(count, countTwo);
// // Dictionary of letters that need to be checked against the rules
// const VOWELS = ["a", "e", "i", "o", "u"];
// const DOUBLE_LETTERS = "abcdefghijklmnopqrstuvwxyz"
//   .split("")
//   .map((item) => item + item);
// const RESTRICTED_LETTERS = ["ab", "cd", "pq", "xy"];

// // Methods to check the rules
// const isContainThreeVowels = (string) =>
//   string
//     .split("")
//     .reduce(
//       (vowels, char) => (VOWELS.indexOf(char) === -1 ? vowels : ++vowels),
//       0
//     ) >= 3;
// const isContainDoubleLetter = (string) =>
//   DOUBLE_LETTERS.some((item) => string.indexOf(item) !== -1);
// const isContainRestrictedLetters = (string) =>
//   RESTRICTED_LETTERS.some((item) => string.indexOf(item) !== -1);

// // Composition of all methods above
// const isNiceString = (string) =>
//   !!(
//     isContainThreeVowels(string) &&
//     isContainDoubleLetter(string) &&
//     !isContainRestrictedLetters(string)
//   );

// const result = input.reduce(
//   (total, string) => (isNiceString(string) ? ++total : total),
//   0
// );

// console.log(result);

const isContainPair = (string) => /([a-z][a-z]).*\1/.test(string);
const isContainRepeatLetter = (string) => /([a-z])[a-z]\1/.test(string);
let countP2 = 0;

input.map((str) => {
  isContainPair(str) && isContainRepeatLetter(str) ? countP2++ : null;
});

console.log(countP2);
