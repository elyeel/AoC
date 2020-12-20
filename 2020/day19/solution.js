let [rules, messages] = require("fs")
  .readFileSync("./2020/day19/data.txt", "utf-8")
  .trim()
  .split("\n\n");

// console.log(rules);

const parseRules = (msgRules) => {
  const ruleLines = msgRules.split("\n");
  const ruleObj = {};
  ruleLines.forEach((line) => {
    const [key, value] = line.split(": ");
    let valueNum = "";
    if (value.includes("|")) {
      valueNum = value.split(" | ");
      ruleObj[key] = [valueNum[0].split(" "), valueNum[1].split(" ")];
    } else {
      valueNum = value.split(" ");
      ruleObj[key] = valueNum;
    }
  });
  return ruleObj;
};

parseRules(rules);

