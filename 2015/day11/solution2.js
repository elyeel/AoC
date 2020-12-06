const input = "hepxxyzz";

const nextChar = (char) => {
  const charArr = "abcdefghijklmnopqrstuvwxyz".split("");
  const ind = charArr.indexOf(char);
  return charArr[ind + 1];
};

const checkIncreasingStraigt = (str) => {
  for (i = 0; i < str.length - 3; ++i) {
    const next = nextChar(str[i]);
    if (next === str[i + 1] && nextChar(next) === str[i + 2]) return true;
  }
};
const checkPairs = (str) => /(\w)\1.*(\w)\2/.test(str); //check for doubles, 1 or more
const checkHasRestrictedChar = (str) => /(i|l|o)/.test(str);

const incrementChar = (char) => (char === "z" ? "a" : nextChar(char));

const incrementString = (str) => {
  const nextChar = incrementChar(str.slice(-1));
  return nextChar === "a"
    ? incrementString(str.slice(0, -1)) + "a"
    : str.slice(0, -1) + nextChar;
};

const isValid = (str) =>
  checkIncreasingStraigt(str) &&
  checkPairs(str) &&
  !checkHasRestrictedChar(str);

// console.log(checkIncreasingStraigt("ghjaabcc"));
// console.log(checkPairs("ghjaabcc"));
// console.log(!checkHasRestrictedChar("ghjaabcc"));

let result = incrementString(input);
while (!isValid(result)) {
  result = incrementString(result);
}

console.log(result);
