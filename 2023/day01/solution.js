import fs from "fs";
const input = fs.readFileSync("./2023/day01/data.txt", "utf8").split("\n");
// .map((x) => x.split(""));

// const response = await fetch("https://adventofcode.com/2023/day/1/input");
// const txt = await response.text();
// const inputs = txt.trim().split("\n");
const regexP1 = /[1-9]/g;
const regex = /([1-9]|one|two|three|four|five|six|seven|eight|nine)/g;
const regexOverLap =
  /(oneight|threeight|fiveight|nineight|sevenine|eightwo|eighthree|twone)/g;

console.log("Lines of data = ", input.length);
console.log(input[201]);

const solutionPart1 = (data) => {
  const numbersPerLine = data
    .map((x) => x.split(""))
    .map((x) => x.map((y) => (Number.isInteger(+y) ? +y : null)))
    .map((line) => line.filter((num) => Number.isInteger(num)));
  // console.log(numbersPerLine);

  // getting number from front and back
  const result = numbersPerLine
    .map((line) => line.slice(0, 1) + line.slice(-1))
    .reduce((a, c) => +a + Number(c), 0);

  console.log(result);

  return result;
};
solutionPart1(input);

const solutionPart2 = (data) => {
  const numObject = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  };

  const replOverLapObj = {
    oneight: "oneeight",
    threeight: "threeeight",
    fiveight: "fiveeight",
    nineight: "nineeight",
    sevenine: "sevennine",
    eightwo: "eighttwo",
    eighthree: "eightthree",
    twone: "twoone",
  };

  const numbersInDecodedLines = data.map((line) => {
    const numPerLine = [];
    let mutateLine = line;

    // const found = line.match(regex);
    // const foundOverLap = line.match(regexOverLap);
    let found;

    if (mutateLine.match(regexOverLap)) {
      // found overlap
      const replacement = mutateLine.match(regexOverLap);
      mutateLine = mutateLine.replace(
        regexOverLap,
        replOverLapObj[replacement]
      );
      // console.log("This ", mutateLine);
    }
    found = mutateLine.match(regex);

    // console.log(found);
    found.forEach((element) => {
      numPerLine.push(
        Number.isInteger(+element) ? element : numObject[element]
      );
    });

    // while (line.length > 0) {
    //   const found = line.match(regex);
    //   const foundNumber = {
    //     num: Number.isInteger(+found[0]) ? +found[0] : numObject[found[0]],
    //     i: found.index,
    //     isNumber: Number.isInteger(+found[0]),
    //     word: found[0],
    //   };
    //   numPerLine.push(foundNumber.num);
    //   line = line.substring(
    //     foundNumber.isNumber ? 1 : foundNumber.word.length + 1
    //   );
    //   console.log(line);
    // }

    return numPerLine;
  });
  console.log(
    numbersInDecodedLines[716].slice(0, 1) +
      numbersInDecodedLines[716].slice(-1),
    numbersInDecodedLines[716]
  );

  const result = numbersInDecodedLines
    .map((line) => line.slice(0, 1) + line.slice(-1))
    .reduce((a, c) => +a + Number(c));

  console.log(result);
};

solutionPart2(input);
