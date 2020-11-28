const char = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const morse = [
  ".-",
  "-...",
  "-.-.",
  "-..",
  ".",
  "..-.",
  "--.",
  "....",
  "..",
  ".---",
  "-.-",
  ".-..",
  "--",
  "-.",
  "---",
  ".--.",
  "--.-",
  ".-.",
  "...",
  "-",
  "..-",
  "...-",
  ".--",
  "-..-",
  "-.--",
  "--..",
];

const charMorseObj = {};
for (let i = 0; i < 26; ++i) {
  charMorseObj[char[i]] = morse[i];
}
// console.log(charMorseObj);

const temp = [];
const transform = (input) => {
  for (let word of input) {
    let morseWord = "";
    word.split("").map((char) => (morseWord += charMorseObj[char]));
    temp.push(morseWord);
  }
};

transform(["gin", "zen", "gig", "msg"]);
console.log(temp);

const result = {};
temp.map((morseWord) => {
  if (!result[morseWord]) result[morseWord] = 1
  else result[morseWord]++;
});
console.log(Object.entries(result).length);
