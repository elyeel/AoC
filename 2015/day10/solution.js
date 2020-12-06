const writeString = (str) => {
  let result = "";
  // const element = str.split("");

  for (let i = 0; i < str.length; ++i) {
    let count = 1;
    let j = i + 1;

    while (str[j] && str[j] === str[i]) {
      j++;
      count++;
    }
    result += `${count}${str[i]}`;
    i = j - 1;
  }

  return result;
};

const part1 = (input) => {
  let str = input;
  for (i = 0; i < 40; ++i) {
    str = writeString(str);
  }
  return str;
};
const part2 = (input) => {
  let str = input;
  for (i = 0; i < 50; ++i) {
    str = writeString(str);
  }
  return str;
};

console.log(
  ["1", "11", "21", "1211", "111221", "312211"].map((x) => writeString(x))
);

console.log(part1("3113322113").length);
console.log(part2("3113322113").length);