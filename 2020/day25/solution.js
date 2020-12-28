const puzzleInput = [3469259, 13170438];
const control = [5764801, 17807724];
const divider = 20201227;
const subject = 7;

const loopSize = (key, subject) => {
  let num = 1;
  let i = 0;
  while (num !== key) {
    num = (num * subject) % divider;
    i++;
  }
  return i;
};

const encryptionKey = (subject, loop) => {
  let num = 1;
  for (let i = 0; i < loop; ++i) {
    num = (num * subject) % divider;
  }
  return num;
};

const loop = loopSize(puzzleInput[0], subject);
console.log(encryptionKey(puzzleInput[1], loop), loop);
