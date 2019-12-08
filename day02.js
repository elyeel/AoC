const input = [
  1,
  12,
  2,
  3,
  1,
  1,
  2,
  3,
  1,
  3,
  4,
  3,
  1,
  5,
  0,
  3,
  2,
  13,
  1,
  19,
  1,
  10,
  19,
  23,
  1,
  6,
  23,
  27,
  1,
  5,
  27,
  31,
  1,
  10,
  31,
  35,
  2,
  10,
  35,
  39,
  1,
  39,
  5,
  43,
  2,
  43,
  6,
  47,
  2,
  9,
  47,
  51,
  1,
  51,
  5,
  55,
  1,
  5,
  55,
  59,
  2,
  10,
  59,
  63,
  1,
  5,
  63,
  67,
  1,
  67,
  10,
  71,
  2,
  6,
  71,
  75,
  2,
  6,
  75,
  79,
  1,
  5,
  79,
  83,
  2,
  6,
  83,
  87,
  2,
  13,
  87,
  91,
  1,
  91,
  6,
  95,
  2,
  13,
  95,
  99,
  1,
  99,
  5,
  103,
  2,
  103,
  10,
  107,
  1,
  9,
  107,
  111,
  1,
  111,
  6,
  115,
  1,
  115,
  2,
  119,
  1,
  119,
  10,
  0,
  99,
  2,
  14,
  0,
  0
];
const input2 = [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50];
const input3 = [2, 3, 0, 3, 99];
const input4 = [2, 4, 4, 5, 99, 0];
const input5 = [1, 1, 1, 4, 99, 5, 6, 0, 99];
const input6 = [
  1,
  0,
  0,
  3,
  1,
  1,
  2,
  3,
  1,
  3,
  4,
  3,
  1,
  5,
  0,
  3,
  2,
  13,
  1,
  19,
  1,
  10,
  19,
  23,
  1,
  6,
  23,
  27,
  1,
  5,
  27,
  31,
  1,
  10,
  31,
  35,
  2,
  10,
  35,
  39,
  1,
  39,
  5,
  43,
  2,
  43,
  6,
  47,
  2,
  9,
  47,
  51,
  1,
  51,
  5,
  55,
  1,
  5,
  55,
  59,
  2,
  10,
  59,
  63,
  1,
  5,
  63,
  67,
  1,
  67,
  10,
  71,
  2,
  6,
  71,
  75,
  2,
  6,
  75,
  79,
  1,
  5,
  79,
  83,
  2,
  6,
  83,
  87,
  2,
  13,
  87,
  91,
  1,
  91,
  6,
  95,
  2,
  13,
  95,
  99,
  1,
  99,
  5,
  103,
  2,
  103,
  10,
  107,
  1,
  9,
  107,
  111,
  1,
  111,
  6,
  115,
  1,
  115,
  2,
  119,
  1,
  119,
  10,
  0,
  99,
  2,
  14,
  0,
  0
];

const intCode = data => {
  for (let i = 0; i < data.length; i += 4) {
    if (data[i] === 99) {
      return data;
    }
    if (data[i] === 1) {
      data[data[i + 3]] = data[data[i + 1]] + data[data[i + 2]];
    }
    if (data[i] === 2) {
      data[data[i + 3]] = data[data[i + 1]] * data[data[i + 2]];
    }
  }
};

const findCombo = data => {
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      const meta = [...data]; // to create new copy of array on every iteration, or else result will be the same everytime
      meta[1] = i;
      meta[2] = j;
      if (intCode(meta)[0] === 19690720) {
        return `${i}${j}`;
      }
    }
  }
};

console.log(intCode(input2));
console.log(intCode(input3));
console.log(intCode(input4));
console.log(intCode(input5));
console.log(intCode(input)[0]);
console.log(findCombo(input6));